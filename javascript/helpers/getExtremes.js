export function getExtremes(_arr){
    let sortedArray = _arr.sort((a, b) => {
        if (a.DKK_per_kWh < b.DKK_per_kWh) return -1})
    let max = sortedArray[_arr.length-1]
    let min = sortedArray[0]
    return {min, max}
}