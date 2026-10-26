/**
 * The opening sentence of a project summary.
 *
 * The full summary is the honest record and stays on the case-study page;
 * the index only ever shows its first sentence — plus the second when the
 * first is very short — so a card or a row never becomes a wall of text.
 * This trims what is displayed, never what is claimed.
 */
export function firstSentence(summary: string): string {
  const parts = summary.match(/[^.]+\.(?:\s|$)/g);
  if (!parts || parts.length === 0) return summary;
  const first = parts[0].trim();
  if (first.length < 72 && parts[1]) return `${first} ${parts[1].trim()}`;
  return first;
}
