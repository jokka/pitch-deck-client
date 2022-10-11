import { z } from 'zod';
import Image from './Image';

const Page = z.object({
  aspectRatio: z.number(),
  image: Image,
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Page = z.infer<typeof Page>;

export default Page;
