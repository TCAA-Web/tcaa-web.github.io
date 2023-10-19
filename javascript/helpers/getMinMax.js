export function getMinMax(_arr){
    let max = Math.max(..._arr)
    let minMax = _arr.map(num => (num / max).toFixed(2))
    return minMax
}