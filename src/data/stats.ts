export interface Stat {
  id: string;
  value: string;
  label: string;
  description: string;
}

export const stats: Stat[] = [
  {
    id: "years",
    value: "15+",
    label: "Years of experience",
    description: "Crafting digital excellence since 2010",
  },
  {
    id: "projects",
    value: "100+",
    label: "Projects completed",
    description: "Successful deliveries across industries",
  },
  {
    id: "satisfaction",
    value: "97%",
    label: "Client satisfaction rate",
    description: "Measured through post-project surveys",
  },
  {
    id: "conversion",
    value: "75%",
    label: "Avg. conversion improvement",
    description: "For clients' digital platforms",
  },
];