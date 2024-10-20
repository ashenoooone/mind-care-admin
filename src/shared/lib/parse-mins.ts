export const parseMins = (minutes: string) => {
  const match = minutes.match(/(\d+) мин/);
  if (match?.length) return Number(match[1]);
  return null;
};
