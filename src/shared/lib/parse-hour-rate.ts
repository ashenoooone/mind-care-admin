export const parseHourRate = (rate: string) => {
  const match = rate.match(/(\d+) руб\/час/);
  if (match?.length) return Number(match[1]);
  return null;
};
