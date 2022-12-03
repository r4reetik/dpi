export const toFixed = (n: number, precision = 4) => {
    if (n === undefined || n === null || isNaN(n)) return n;
    let p = 10 ** precision;
    let preciseNumber: number | string = Math.trunc(n * p) / p;
    if (preciseNumber === 0) {
      p = 10 ** (precision + 2);
      preciseNumber = Math.trunc(n * p) / p;
    }
    let preciseNumberAsString = preciseNumber.toString();
    if (!preciseNumberAsString.includes(".")) {
      preciseNumber = preciseNumber + ".00";
    }
    if (preciseNumberAsString.includes(".") && preciseNumberAsString.split(".")[1].length === 1) {
      preciseNumber = preciseNumber + "0";
    }
    return preciseNumber;
  };

  export const inputToFixed = (s: string, precision = 6) => {
    //Check for decimal portion
    const inputPortions = s.split(".") ?? [];
    //If decimal portion is there and it has more than 6 digits ,then limit 6 digits
    if (inputPortions.length > 1 && inputPortions[1].length > precision) {
      return toFixed(Number(s), precision);
    }
    return s;
  };

  