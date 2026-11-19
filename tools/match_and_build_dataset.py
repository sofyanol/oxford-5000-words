import os
import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

ROOT = r"e:\File Home\07-Ai Files\Coding folder\oxford 5000\oxford5000-app"
AUDIO_DIR = r"e:\File Home\07-Ai Files\Coding folder\oxford 5000\audio"
FULL_JSON = r"e:\File Home\05-Downloads\ABDM\oxford_5000_full.json"

with open(FULL_JSON, "r", encoding="utf-8") as f:
    full_data = json.load(f)

words_list = full_data["words"]
print(f"Loaded {len(words_list)} entries from {FULL_JSON}")

# List all mp3 files directly in AUDIO_DIR
audio_files = {f.lower(): f for f in os.listdir(AUDIO_DIR) if f.endswith(".mp3")}
print(f"Found {len(audio_files)} mp3 files in AUDIO_DIR")

def get_candidates(word, suffix):
    w = word.strip()
    # Case of "a, an" -> take first word "a"
    if "," in w:
        w = w.split(",")[0].strip()
        
    w = w.lower()
    w_norm_quotes = w.replace("’", "'").replace("‘", "'").replace("`", "'")
    w_norm_hyphens = re.sub(r"[–—−]", "-", w_norm_quotes)
    
    base_variants = [w, w_norm_quotes, w_norm_hyphens]
    no_sym = re.sub(r"[™®©/()!?:;.]", "", w_norm_hyphens).strip()
    base_variants.append(no_sym)
    
    no_apostrophe = no_sym.replace("'", "")
    base_variants.append(no_apostrophe)
    
    candidates = []
    for bv in base_variants:
        bv_trim = bv.strip()
        if not bv_trim:
            continue
        under = re.sub(r"\s+", "_", bv_trim)
        hyphen = re.sub(r"\s+", "-", bv_trim)
        nospace = re.sub(r"\s+", "", bv_trim)
        for cand in [bv_trim, under, hyphen, nospace]:
            fn = f"{cand}_{suffix}.mp3"
            if fn not in candidates:
                candidates.append(fn)
                
    return candidates

def find_audio_file(word, suffix):
    candidates = get_candidates(word, suffix)
    for c in candidates:
        c_low = c.lower()
        if c_low in audio_files:
            actual_filename = audio_files[c_low]
            # Verify file physically exists on disk
            full_path = os.path.join(AUDIO_DIR, actual_filename)
            if os.path.isfile(full_path):
                return f"audio/{actual_filename}"
    return None

updated_words = []
missing_audio = []

count_has_uk = 0
count_has_us = 0
count_has_both = 0
count_no_audio = 0
broken_paths = 0

for entry in words_list:
    new_entry = dict(entry) # copy entry
    word = entry["word"]
    
    path_uk = find_audio_file(word, "uk")
    path_us = find_audio_file(word, "us")
    
    # Verify broken paths
    if path_uk is not None:
        disk_path = os.path.join(AUDIO_DIR, os.path.basename(path_uk))
        if not os.path.isfile(disk_path):
            print(f"BROKEN UK PATH: {path_uk}")
            broken_paths += 1
            path_uk = None
            
    if path_us is not None:
        disk_path = os.path.join(AUDIO_DIR, os.path.basename(path_us))
        if not os.path.isfile(disk_path):
            print(f"BROKEN US PATH: {path_us}")
            broken_paths += 1
            path_us = None
            
    new_entry["audio_uk"] = path_uk
    new_entry["audio_us"] = path_us
    
    if path_uk: count_has_uk += 1
    if path_us: count_has_us += 1
    if path_uk and path_us: count_has_both += 1
    if not path_uk and not path_us: count_no_audio += 1
    
    if not path_uk or not path_us:
        missing_type = "both" if (not path_uk and not path_us) else ("uk" if not path_uk else "us")
        missing_audio.append({
            "id": entry["id"],
            "word": entry["word"],
            "pos": entry.get("pos", ""),
            "missing": missing_type,
            "has_uk": bool(path_uk),
            "has_us": bool(path_us)
        })
        
    updated_words.append(new_entry)

print("="*50)
print(f"Total entries: {len(updated_words)}")
print(f"Entries with audio_uk: {count_has_uk}")
print(f"Entries with audio_us: {count_has_us}")
print(f"Entries with both UK and US: {count_has_both}")
print(f"Entries with NO audio: {count_no_audio}")
print(f"Broken paths count: {broken_paths}")
print(f"Missing audio entries: {len(missing_audio)}")

# Save updated dataset to oxford5000-app/data/words.json
out_dataset = os.path.join(ROOT, "data", "words.json")
with open(out_dataset, "w", encoding="utf-8") as f:
    json.dump({"meta": full_data.get("meta", {}), "guide": full_data.get("guide", {}), "words": updated_words}, f, ensure_ascii=False, indent=2)
print(f"Saved dataset with audio paths to: {out_dataset}")

# Save missing_audio.json
out_missing = os.path.join(ROOT, "missing_audio.json")
with open(out_missing, "w", encoding="utf-8") as f:
    json.dump(missing_audio, f, ensure_ascii=False, indent=2)
print(f"Saved missing audio list to: {out_missing}")
