import { z } from 'zod';
import Page from './Page';

const Document = z.object({
  id: z.string(),
  fileName: z.string(),
  pages: z.array(Page),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Document = z.infer<typeof Document>;

export default Document;
