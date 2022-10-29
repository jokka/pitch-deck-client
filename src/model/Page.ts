import { z } from 'zod';
import Rendering from './Rendering';

const Page = z.object({
  aspectRatio: z.number(),
  src: Rendering(z.string()),
  srcSet: z.record(z.string()),
  alt: z.string(),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Page = z.infer<typeof Page>;

export default Page;

export function srcSetToString(
  assetsUrl: string,
  srcSet: Page['srcSet']
): string {
  return Object.entries(srcSet)
    .map(([key, value]) => assetsUrl + value + ' ' + key)
    .join(',');
}
