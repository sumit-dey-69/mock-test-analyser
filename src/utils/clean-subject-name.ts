export function cleanSubjectName(input: string): string {
  const regex = /^[^\s]+\s+|(\s*\(Section-\d+\))/g;
  const cleaned = input
    .replace(regex, "")
    .toLowerCase()
    .split(/[\s&]+/)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");

  return cleaned;
}
