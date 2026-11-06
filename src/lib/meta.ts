export function clipMeta(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  const trimmed = (space > 40 ? cut.slice(0, space) : cut).replace(/[.,;:]+$/, "");
  return `${trimmed}…`;
}
