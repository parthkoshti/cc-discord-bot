export async function longText(text: string) {
  if (text.length > 1000) {
    return true;
  }
}
