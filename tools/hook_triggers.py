import os

path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src", "app.js")
if not os.path.exists(path):
    path = os.path.join("oxford5000-app 1.5 coding", "src", "app.js")

with open(path, "r", encoding="utf-8") as f:
    s = f.read()

# 1. In markWord
target1 = "incrementDailyProgress(1);"
replace1 = "incrementDailyProgress(1);\n  if(!known && word) recordLeechWord(word);\n  checkAchievements();"
if target1 in s:
    s = s.replace(target1, replace1, 1)
    print("Hooked markWord!")

# 2. In finishQuiz
target2 = "state.ui.lastQuiz = { date: today, correct: correct, total: words.length };"
replace2 = """state.ui.lastQuiz = { date: today, correct: correct, total: words.length };
  if(correct === words.length && words.length >= 5) unlockAchievement('quiz_ace');
  words.forEach(w => { if(!quizSession.final[w]) recordLeechWord(w); });
  checkAchievements();"""
if target2 in s:
    s = s.replace(target2, replace2, 1)
    print("Hooked finishQuiz!")

# 3. In finishTimeAttack
target3 = "state.ui.records.timeAttackBest = Math.max(state.ui.records.timeAttackBest || 0, score);"
replace3 = """state.ui.records.timeAttackBest = Math.max(state.ui.records.timeAttackBest || 0, score);
  if(score >= 15) unlockAchievement('speed_demon');
  checkAchievements();"""
if target3 in s:
    s = s.replace(target3, replace3, 1)
    print("Hooked finishTimeAttack!")

# 4. In checkMatchWin
target4 = "win.innerHTML = `"
replace4 = """if(elapsedSecs <= 45) unlockAchievement('match_master');
    checkAchievements();
    win.innerHTML = `"""
if target4 in s:
    s = s.replace(target4, replace4, 1)
    print("Hooked checkMatchWin!")

with open(path, "w", encoding="utf-8") as f:
    f.write(s)

print("All hooks complete!")
