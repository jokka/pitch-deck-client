import { z } from 'zod';

const Rendering = <T>(t: z.ZodType<T>) =>
  z.discriminatedUnion('is', [
    z.object({ is: z.literal('Pending') }),
    z.object({
      is: z.literal('InProgress'),
      progress: z.nullable(z.number()),
    }),
    z.object({ is: z.literal('Completed'), value: t }),
    z.object({ is: z.literal('Failed') }),
  ]);

export default Rendering;
