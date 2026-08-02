// Shared palette so every chart across the analytics dashboard reads consistently.
export const CHART_COLORS = [
  "#2563eb", // blue
  "#0d9488", // teal
  "#d97706", // amber
  "#7c3aed", // violet
  "#dc2626", // red
  "#059669", // emerald
  "#db2777", // pink
  "#4b5563", // slate
];

export const colorForIndex = (i: number) => CHART_COLORS[i % CHART_COLORS.length];

export const formatNumber = (n: number | undefined | null) =>
  typeof n === "number" ? n.toLocaleString("en-US") : "0";

export const formatCurrency = (n: number | undefined | null) =>
  typeof n === "number"
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : "$0";

export const formatCompact = (n: number | undefined | null) =>
  typeof n === "number"
    ? Intl.NumberFormat("en-US", { notation: "compact" }).format(n)
    : "0";

// Turns a mongo _id-keyed group-by-status aggregate result like
// [{ _id: "PENDING", count: 4 }] into chart-friendly { name, value } pairs.
export const toChartData = (
  rows: { _id: string; count: number }[] | undefined
) =>
  (rows ?? []).map((r) => ({
    name: r._id ?? "Unknown",
    value: r.count,
  }));

export const titleCase = (s: string) =>
  s
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");