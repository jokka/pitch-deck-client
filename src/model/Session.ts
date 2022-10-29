import { z } from 'zod';

const Session = z.object({
  sessionToken: z.string(),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Session = z.infer<typeof Session>;

export default Session;
