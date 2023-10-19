export function getDate(_date) {
  let d = new Date();
  if (_date) d = new Date(_date);
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();

  return { year, month, day };
}
