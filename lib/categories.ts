export type IconName =
  | "saw"
  | "demolition"
  | "generator"
  | "compressor"
  | "planer"
  | "sander"
  | "wrench"
  | "chainsaw"
  | "nailer"
  | "sprayer"
  | "drill"
  | "ladder"
  | "pressurewasher";

export interface Category {
  id: string;
  label: string;
  icon: IconName;
}

// The fixed list of equipment categories. Editing a tool in the admin page
// picks one of these from a dropdown, so category names stay consistent
// across the site. Add a new one here (and give it an icon in lib/icons.tsx)
// if you start renting a genuinely new kind of equipment.
export const CATEGORIES: Category[] = [
  { id: "cement-saws", label: "Cement Saws", icon: "saw" },
  { id: "demo-hammers", label: "Demo Hammers", icon: "demolition" },
  { id: "generators", label: "Generators", icon: "generator" },
  { id: "air-compressors", label: "Air Compressors", icon: "compressor" },
  { id: "metal-saws", label: "Metal Saws", icon: "saw" },
  { id: "miter-saws", label: "Miter Saws", icon: "saw" },
  { id: "planers", label: "Planers", icon: "planer" },
  { id: "grinders", label: "Grinders", icon: "sander" },
  { id: "plumbing", label: "Plumbing", icon: "wrench" },
  { id: "chain-saws", label: "Chain Saws", icon: "chainsaw" },
  { id: "nail-guns", label: "Nail Guns", icon: "nailer" },
  { id: "paint-sprayers", label: "Paint Sprayers", icon: "sprayer" },
];

const byId = new Map(CATEGORIES.map((c) => [c.id, c]));

export function categoryLabel(id: string): string {
  return byId.get(id)?.label ?? id;
}

export function categoryIcon(id: string): IconName {
  return byId.get(id)?.icon ?? "wrench";
}
