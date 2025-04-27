export function roundOff(num: number) {
  return Number(num.toFixed(2));
}

export function formatTime(ms: number): number {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return Number(`${minutes}.${String(seconds).padStart(2, "0")}`);
}

export function extractNumber(input: string) {
  const match = input.match(/\d+/);
  return match ? `${+match[0]}` : `0`;
}

export function formatCamelCase(input: string): string {
  return input
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}
