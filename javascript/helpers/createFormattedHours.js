export function createFormattedHours(_hour) {
    let res;
    _hour < 10 ? (res = "0" + _hour + ".00") : (res = _hour + ".00");
    return res;
  }