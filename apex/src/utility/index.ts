export class Utility {
    /**
     * Return a number rounded to 2 decimal places
     * @param num
     * @returns
     */
    roundTo2Dp(num: number): number {
      return Math.round((num + Number.EPSILON) * 100) / 100;
    }
  }