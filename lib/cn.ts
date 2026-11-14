export type ClassValue = string | false | null | undefined;

/** Join class names, skipping falsy values. Keep variants disjoint (no tailwind-merge). */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
