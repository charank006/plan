export const calculateDailyBudget = (totalBudget, days, people) => {
  if (days <= 0 || people <= 0) return 0;
  return Math.floor(totalBudget / (days * people));
};

export const categorizeBudget = (dailyBudget) => {
  if (dailyBudget < 1500) return "Low";
  if (dailyBudget < 4000) return "Medium";
  return "High";
};
