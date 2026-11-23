#!/usr/bin/env python3
"""Oxford 5000 - Automated Release Publisher & Version Transition Engine.

This utility automates the complete lifecycle:
1. Validates and compiles the current version build (via build.py and verify_selftest.py).
2. Commits and tags the release on Git, then pushes to origin/master and origin/main.
3. Automatically transitions the project to the next version:
   - Archives current version snapshot into '0- update/'.
   - Renames project folder from 'oxford5000-app {current} coding' to 'oxford5000-app {next} coding'.
   - Updates all internal files: sw.js, data/i18n.json, src/index.html, src/app.js,
     README.md, docs/CHANGELOG.md, docs/HANDOFF.md, ALL_UPDATES_CHANGELOG.md,
     RELEASE_NOTES_v{next}.md, and GEMINI.md.
   - Compiles the new version and syncs root index.html.
   - Commits the version bump to Git and pushes to master and main.

Usage:
    # Full release of current version and bump to next (e.g., 1.5 -> 1.6):
    python tools/publish_and_bump.py --publish

    # Transition to a specific next version without pushing a release:
    python tools/publish_and_bump.py --next 1.6

    # Dry run preview of all changes:
    python tools/publish_and_bump.py --dry-run
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path


def run_cmd(cmd, cwd=None, check=True):
    """Run a shell command and return stdout string."""
    print(f"  [EXEC] {cmd} (in {cwd or '.'})")
    res = subprocess.run(cmd, cwd=cwd, shell=True, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if check and res.returncode != 0:
        print(f"  [ERROR] Command failed ({res.returncode}): {res.stderr.strip()}", file=sys.stderr)
        raise RuntimeError(f"Command failed: {cmd}\n{res.stderr}")
    return res.stdout.strip()


def detect_root_and_project():
    """Detect root workspace and active coding directory."""
    cwd = Path.cwd().resolve()
    
    # Check if we are inside 'oxford5000-app ... coding'
    if re.search(r"oxford5000-app\s+[\d\.]+\s+coding", cwd.name, re.I):
        project_dir = cwd
        root_dir = cwd.parent
    else:
        root_dir = cwd
        # Look for oxford5000-app * coding inside root
        candidates = [d for d in root_dir.glob("oxford5000-app * coding") if d.is_dir()]
        if not candidates:
            raise FileNotFoundError("Could not locate active 'oxford5000-app <version> coding' folder.")
        project_dir = sorted(candidates)[-1]
        
    return root_dir, project_dir


def detect_current_version(project_dir):
    """Extract current version string (e.g., '1.5') from sw.js or directory name."""
    sw_file = project_dir / "sw.js"
    if sw_file.is_file():
        text = sw_file.read_text(encoding="utf-8")
        m = re.search(r"oxford5000-v(\d+\.\d+)", text)
        if m:
            return m.group(1)
            
    m_dir = re.search(r"oxford5000-app\s+(\d+\.\d+)\s+coding", project_dir.name, re.I)
    if m_dir:
        return m_dir.group(1)
        
    return "1.5"


def calculate_next_version(curr):
    """Calculate next minor version, e.g. '1.4' -> '1.5', '1.5' -> '1.6'."""
    parts = curr.split(".")
    if len(parts) >= 2 and parts[1].isdigit():
        return f"{parts[0]}.{int(parts[1]) + 1}"
    return f"{curr}.1"


def update_file(path, old_pattern, replacement, is_regex=False):
    """Update content of a text file safely."""
    if not path.is_file():
        return False
    content = path.read_text(encoding="utf-8")
    if is_regex:
        new_content, count = re.subn(old_pattern, replacement, content)
    else:
        new_content = content.replace(old_pattern, replacement)
        count = content.count(old_pattern)
        
    if count > 0:
        path.write_text(new_content, encoding="utf-8")
        print(f"    [UPDATED] {path.name} ({count} occurrence(s))")
        return True
    return False


def main():
    parser = argparse.ArgumentParser(description="Oxford 5000 Release & Auto-Bump Engine")
    parser.add_argument("--publish", action="store_true", help="Publish git release & tag current version before bumping")
    parser.add_argument("--current", type=str, default=None, help="Explicit current version (e.g. 1.4)")
    parser.add_argument("--next", type=str, default=None, help="Explicit next version (e.g. 1.5)")
    parser.add_argument("--skip-selftest", action="store_true", help="Skip browser self-test verification")
    parser.add_argument("--skip-git", action="store_true", help="Do not commit or push to Git")
    parser.add_argument("--dry-run", action="store_true", help="Show planned actions without executing file changes")
    args = parser.parse_args()

    root_dir, project_dir = detect_root_and_project()
    curr_v = args.current or detect_current_version(project_dir)
    next_v = args.next or calculate_next_version(curr_v)

    print("=======================================================")
    print(" 🚀 Oxford 5000 Release & Version Transition Engine")
    print("=======================================================")
    print(f"  Root workspace: {root_dir}")
    print(f"  Active folder : {project_dir.name}")
    print(f"  Current version: v{curr_v}")
    print(f"  Next version   : v{next_v}")
    print("=======================================================")

    if args.dry_run:
        print("[DRY-RUN] Completed analysis without modifying files.")
        return

    # PHASE 1: Publish current version if --publish is enabled
    if args.publish and not args.skip_git:
        print("\n--- PHASE 1: Compiling & Publishing v" + curr_v + " ---")
        # Build current project
        run_cmd(f"{sys.executable} build/build.py", cwd=project_dir)
        
        # Verify self-test
        if not args.skip_selftest and (project_dir / "tools" / "verify_selftest.py").is_file():
            print("  Running browser self-test verification...")
            run_cmd(f"{sys.executable} tools/verify_selftest.py", cwd=project_dir)

        # Stage and commit current release
        run_cmd("git add .", cwd=project_dir)
        try:
            run_cmd(f'git commit -m "release: Oxford 5000 Words Update v{curr_v}.0"', cwd=project_dir)
        except Exception:
            print("  (Working tree clean, no release commit needed)")

        # Create Git tag
        tag_name = f"v{curr_v}.0"
        run_cmd(f'git tag -f -a {tag_name} -m "Release Oxford 5000 Update {curr_v}"', cwd=project_dir)
        run_cmd(f"git push origin {tag_name}", cwd=project_dir)
        run_cmd("git push origin master", cwd=project_dir)
        run_cmd("git push origin master:main", cwd=project_dir)
        print(f"  [SUCCESS] Published and pushed tag {tag_name}!")

    # PHASE 2: Archive snapshot to 0- update/
    print(f"\n--- PHASE 2: Archiving v{curr_v} Snapshot ---")
    archive_dir = root_dir / "0- update"
    archive_dir.mkdir(exist_ok=True)
    snapshot_dest = archive_dir / f"oxford5000-app {curr_v} coding"
    snapshot_short = archive_dir / f"oxford5000-app {curr_v}"
    
    for snap in [snapshot_dest, snapshot_short]:
        if not snap.exists():
            print(f"  Archiving snapshot to: {snap.name}")
            shutil.copytree(
                project_dir,
                snap,
                ignore=shutil.ignore_patterns(".git", "audio", "__pycache__", "*.tmp", ".tmp_*"),
                dirs_exist_ok=True
            )
            print(f"  [ARCHIVED] Snapshot saved to {snap}")
        else:
            print(f"  [NOTE] Archive snapshot {snap.name} already exists.")

    # PHASE 3: Rename project directory to next version
    print(f"\n--- PHASE 3: Renaming Directory to v{next_v} ---")
    target_project_name = f"oxford5000-app {next_v} coding"
    target_project_dir = root_dir / target_project_name

    # Switch CWD to root workspace before renaming to release any Windows directory lock
    os.chdir(root_dir)

    if project_dir != target_project_dir:
        if target_project_dir.exists():
            print(f"  [WARNING] Target directory {target_project_name} already exists.")
        else:
            print(f"  Renaming {project_dir.name} -> {target_project_name}")
            project_dir.rename(target_project_dir)
            project_dir = target_project_dir
            print(f"  [RENAMED] Directory is now {project_dir.name}")

    os.chdir(project_dir)

    # PHASE 4: Update All Internal Project Files for Next Version
    print(f"\n--- PHASE 4: Updating Project Files for v{next_v} ---")
    curr_clean = curr_v.replace(".", "")
    next_clean = next_v.replace(".", "")

    # 1. Service Worker cache
    update_file(project_dir / "sw.js", rf"oxford5000-v{curr_v}\.0", f"oxford5000-v{next_v}.0", is_regex=True)
    update_file(root_dir / "sw.js", rf"oxford5000-v{curr_v}\.0", f"oxford5000-v{next_v}.0", is_regex=True)

    # 2. i18n Localization (whatsnew.tabNew across 12 languages)
    i18n_file = project_dir / "data" / "i18n.json"
    if i18n_file.is_file():
        update_file(i18n_file, rf'("whatsnew\.tabNew":\s*"[^"]*?){re.escape(curr_v)}([^"]*")', rf'\g<1>{next_v}\g<2>', is_regex=True)

    # 3. src/index.html (tab-update button)
    update_file(project_dir / "src" / "index.html", f"tab-update{curr_clean}", f"tab-update{next_clean}")
    update_file(project_dir / "src" / "index.html", f"What's New in {curr_v}", f"What's New in {next_v}")

    # 4. src/app.js (currentWhatsNewTab & What's New template)
    app_js = project_dir / "src" / "app.js"
    if app_js.is_file():
        update_file(app_js, f"tab-update{curr_clean}", f"tab-update{next_clean}")
        update_file(app_js, f"Oxford 5000 - Update {curr_v}", f"Oxford 5000 - Update {next_v}")
        update_file(app_js, f"تحديث Oxford 5000 - الإصدار {curr_v}", f"تحديث Oxford 5000 - الإصدار {next_v}")
        update_file(app_js, f"1.0 - {curr_v}", f"1.0 - {next_v}")
        update_file(app_js, f"1.0 إلى {curr_v}", f"1.0 إلى {next_v}")

    # 5. docs/CHANGELOG.md
    changelog_file = project_dir / "docs" / "CHANGELOG.md"
    if changelog_file.is_file():
        cl_text = changelog_file.read_text(encoding="utf-8")
        if f"## Update {next_v}.0" not in cl_text:
            header = f"# Changelog\n\n## Update {next_v}.0 (In Development)\n- Started Update {next_v} development cycle.\n- Preserved complete feature foundation of Update {curr_v}.\n- Service worker cache updated to `oxford5000-v{next_v}.0`.\n\n"
            cl_text = re.sub(r"^# Changelog\s*", header, cl_text)
            changelog_file.write_text(cl_text, encoding="utf-8")
            print(f"    [UPDATED] docs/CHANGELOG.md with v{next_v} entry")

    # 6. ALL_UPDATES_CHANGELOG.md
    master_cl = project_dir / "ALL_UPDATES_CHANGELOG.md"
    if master_cl.is_file():
        update_file(master_cl, f"Updates 1.0 - {curr_v}", f"Updates 1.0 - {next_v}")
        update_file(master_cl, f"Update {curr_v} (In Development)", f"Update {curr_v} (Released)")
        cl_content = master_cl.read_text(encoding="utf-8")
        if f"## Update {next_v}" not in cl_content:
            new_section = (
                f"\n## Update {next_v} (In Development)\n\n"
                f"Update {next_v} continues advancing Oxford 5000 with refined user experience, performance enhancements, and extended learning tools:\n\n"
                f"- **Active Milestone Transition**:\n"
                f"  - Initiated development cycle for Update {next_v}.\n"
                f"  - Preserved full v{curr_v} feature set.\n\n---\n"
            )
            cl_content = re.sub(r"(## Update \d+\.\d+)", new_section + r"\1", cl_content, count=1)
            master_cl.write_text(cl_content, encoding="utf-8")
            print(f"    [UPDATED] ALL_UPDATES_CHANGELOG.md with v{next_v} section")

    # 7. Create RELEASE_NOTES_v{next}.md
    rel_notes = project_dir / f"RELEASE_NOTES_v{next_v}.md"
    if not rel_notes.is_file():
        rel_notes.write_text(
            f"# Oxford 5000 Words - Release Notes v{next_v}.0 (In Development)\n\n"
            f"## Overview\n"
            f"Update {next_v} continues the evolution of Oxford 5000 Words, building directly upon the comprehensive v{curr_v} release foundation.\n\n"
            f"## Focus Areas\n"
            f"- Next-generation learning enhancements.\n"
            f"- Code quality and offline resilience.\n"
            f"- Continuous improvements based on community feedback.\n",
            encoding="utf-8"
        )
        print(f"    [CREATED] {rel_notes.name}")

    # 8. README.md & GEMINI.md
    update_file(project_dir / "README.md", f"Update {curr_v}", f"Update {next_v}")
    update_file(project_dir / "README.md", f"v{curr_v}", f"v{next_v}")
    update_file(project_dir / "GEMINI.md", f"v{curr_v}", f"v{next_v}")
    update_file(project_dir / "docs" / "HANDOFF.md", f"v{curr_v}", f"v{next_v}")

    # PHASE 5: Compile Build & Synchronize Root Files
    print(f"\n--- PHASE 5: Compiling v{next_v} Standalone Build ---")
    run_cmd(f"{sys.executable} build/build.py", cwd=project_dir)
    
    # Sync publish files to root
    publish_index = project_dir / "publish" / "index.html"
    if publish_index.is_file():
        shutil.copy2(publish_index, root_dir / "index.html")
        print("  [SYNCED] Root index.html updated from publish/index.html")

    for f_name in ["GEMINI.md", "AGENTS.md", "ALL_UPDATES_CHANGELOG.md"]:
        f_path = project_dir / f_name
        if f_path.is_file():
            shutil.copy2(f_path, root_dir / f_name)
            print(f"  [SYNCED] Root {f_name} updated from project")

    # PHASE 6: Commit and Push Version Bump to Git
    if not args.skip_git:
        print(f"\n--- PHASE 6: Committing v{next_v} Preparation to Git ---")
        run_cmd("git add .", cwd=project_dir)
        try:
            run_cmd(f'git commit -m "chore: prepare repository and project environment for Update {next_v}"', cwd=project_dir)
            run_cmd("git push origin master", cwd=project_dir)
            run_cmd("git push origin master:main", cwd=project_dir)
            print(f"  [SUCCESS] Pushed Update {next_v} preparation to master and main!")
        except Exception as e:
            print(f"  [NOTE] Git commit/push note: {e}")

    print("\n=======================================================")
    print(f" 🎉 SUCCESS: Transitioned to Update {next_v} successfully!")
    print(f"  Folder: {project_dir.name}")
    print("=======================================================")


if __name__ == "__main__":
    main()
