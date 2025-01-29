import { db } from "./db";
import { responses } from "./db/schema";

export async function logResponse(response: string, triggerWord: string) {
  await db.insert(responses).values({
    response,
    timestamp: new Date(),
    triggerWord,
  });
}
