const compactNumberFormatter = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export function formatCompactNumber(num: number) {
  return compactNumberFormatter.format(num);
}
