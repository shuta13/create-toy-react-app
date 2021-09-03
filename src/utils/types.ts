export const argumentTypes = [
  'template',
  'render-dom',
  'reconciliation',
  'counter-app',
  'completed',
] as const;

export type Type = typeof argumentTypes[number];
