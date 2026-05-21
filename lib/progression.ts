export type Rank = {
  name: string;
  minXp: number;
};

export const RANKS: Rank[] = [
  { name: "Initiate", minXp: 0 },
  { name: "Explorer", minXp: 250 },
  { name: "Navigator", minXp: 750 },
  { name: "Scholar", minXp: 1500 },
  { name: "Physicist", minXp: 3000 },
  { name: "Master", minXp: 6000 },
];

export function calculateXp({
  completedLessonProblemCount,
  completedModuleCount,
}: {
  completedLessonProblemCount: number;
  completedModuleCount: number;
}) {
  return completedLessonProblemCount * 10 + completedModuleCount * 50;
}

export function getRank(xp: number) {
  return RANKS.reduce((currentRank, rank) => {
    return xp >= rank.minXp ? rank : currentRank;
  }, RANKS[0]);
}

export function getNextRank(xp: number) {
  return RANKS.find((rank) => rank.minXp > xp) ?? null;
}

export function getRankProgress(xp: number) {
  const currentRank = getRank(xp);
  const nextRank = getNextRank(xp);

  if (!nextRank) {
    return {
      currentRank,
      nextRank: null,
      progressPercent: 100,
      xpIntoRank: xp - currentRank.minXp,
      xpNeededForNextRank: 0,
    };
  }

  const xpIntoRank = xp - currentRank.minXp;
  const xpNeededForNextRank = nextRank.minXp - currentRank.minXp;

  return {
    currentRank,
    nextRank,
    progressPercent: Math.round((xpIntoRank / xpNeededForNextRank) * 100),
    xpIntoRank,
    xpNeededForNextRank,
  };
}