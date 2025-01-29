import { desc } from "drizzle-orm";
import { db } from "./db";
import { responses } from "./db/schema";

export async function isRateLimited(msTimeout: number) {
  const lastMessage = await db
    .select()
    .from(responses)
    .orderBy(desc(responses.timestamp))
    .limit(1)
    .then((result) => result[0]);

  if (lastMessage) {
    const now = new Date();
    const timeDifference = now.getTime() - lastMessage.timestamp.getTime();
    if (timeDifference < msTimeout) {
      console.log("Rate limit exceeded");
      return true;
    }
  } else {
    return false;
  }
}
