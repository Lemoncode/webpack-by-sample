export default function rightPad(original: string, quantity: number, word: string): string {
  const remainingSpace = quantity - original.length;
  const howManyWords = Math.floor(remainingSpace / word.length);
  
  return `${original}${word.repeat(howManyWords)}`;
}
