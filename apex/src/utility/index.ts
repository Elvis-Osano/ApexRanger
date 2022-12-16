import React from "react";

const Utility = {
  detextKey: (e, searchRef: React.MutableRefObject<HTMLInputElement>) => {
    if (e.key === " ") {
      searchRef.current.focus();
    }
  },
  /**
   * Return a number rounded to 2 decimal places
   * @param num
   * @returns
   */
  roundTo2Dp: (num: number): number => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  },
};

export default Utility;
