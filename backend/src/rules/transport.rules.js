export const decideTransportMode = (distanceKm) => {
  if (distanceKm <= 300) {
    return { mode: "Bus", costPerKm: 2 };
  }

  if (distanceKm <= 800) {
    return { mode: "Train", costPerKm: 1.5 };
  }

  return { mode: "Flight", costPerKm: 4 };
};

export const estimateTravelCost = (distanceKm) => {
  const transport = decideTransportMode(distanceKm);
  return {
    mode: transport.mode,
    estimatedCost: Math.round(distanceKm * transport.costPerKm),
  };
};
