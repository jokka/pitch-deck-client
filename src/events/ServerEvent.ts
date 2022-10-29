import { z } from 'zod';
import Document from '../model/Document';
import Rendering from '../model/Rendering';

const ServerEvent = z.discriminatedUnion('is', [
  z.object({ is: z.literal('Snapshot'), documents: z.array(Document) }),
  z.object({ is: z.literal('DocumentCreated'), document: Document }),
  z.object({
    is: z.literal('PageSrcUpdated'),
    documentId: z.string(),
    pageIndex: z.number(),
    src: Rendering(z.string()),
  }),
  z.object({
    is: z.literal('SrcSetEntryAdded'),
    documentId: z.string(),
    pageIndex: z.number(),
    entry: z.tuple([z.string(), z.string()]),
  }),
]);

export default ServerEvent;
