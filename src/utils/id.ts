/** Generates a compact, collision-safe id without external deps. */
export function generateId(prefix = 'id'): string {
  const random = Math.random().toString(36).slice(2, 9);
  const time = Date.now().toString(36).slice(-5);
  return `${prefix}_${time}${random}`;
}
