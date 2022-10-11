import { z } from 'zod';

const Image = z.object({
  src: z.string(),
  srcSet: z.record(z.string()),
  alt: z.string(),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Image = z.infer<typeof Image>;

export default Image;

export function srcSetToString(srcSet: Image['srcSet']): string {
  return Object.entries(srcSet)
    .map(([key, value]) => value + ' ' + key)
    .join(',');
}
