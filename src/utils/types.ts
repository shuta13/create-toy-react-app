export const argumentTypes = [
  'template',
  'render-dom',
  'reconciliation',
  'counter-app',
  'completed',
  'ssr-template',
  'ssr-completed',
  'ssg-template',
  'ssg-completed'
] as const;

export type Type = typeof argumentTypes[number];
