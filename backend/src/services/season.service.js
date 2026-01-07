export const getSeasonFromDate = (date) => {
  const month = new Date(date).getMonth() + 1;

  if ([12, 1, 2].includes(month)) return "Winter";
  if ([3, 4, 5].includes(month)) return "Summer";
  if ([6, 7, 8, 9].includes(month)) return "Monsoon";
  return "Autumn";
};
export const getNextSeason = (currentSeason) => {
    const seasons = ["Winter", "Summer", "Monsoon", "Autumn"];
    const currentIndex = seasons.indexOf(currentSeason);
    return seasons[(currentIndex + 1) % seasons.length];
    };      