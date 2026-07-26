/** Simple leveling curve: each level requires level * 500 XP. */
export function xpForLevel(level: number): number {
  return level * 500;
}

export function applyXp(currentXp: number, currentLevel: number, gained: number) {
  let xp = currentXp + gained;
  let level = currentLevel;
  let leveledUp = false;
  let threshold = xpForLevel(level);
  while (xp >= threshold) {
    xp -= threshold;
    level += 1;
    leveledUp = true;
    threshold = xpForLevel(level);
  }
  return { xp, level, leveledUp, xpToNextLevel: threshold };
}
