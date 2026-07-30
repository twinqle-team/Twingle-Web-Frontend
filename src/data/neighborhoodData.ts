export type NeighborhoodPoint = {
  label: string;
  distance: string;
  walkTime: string;
};

export const neighborhoodPoints: NeighborhoodPoint[] = [
  { label: "Bus Stop", distance: "250 meters", walkTime: "3-4 minutes walk" },
  { label: "Primary School", distance: "500 meters", walkTime: "6-7 minutes walk" },
  { label: "Grocery Store", distance: "700 meters", walkTime: "8-9 minutes walk" },
  { label: "Community Park", distance: "400 meters", walkTime: "4-5 minutes walk" },
];
