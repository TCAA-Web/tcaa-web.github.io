export function applyTax(_price){
    let isWithTax = JSON.parse(localStorage.getItem('tax'))
    let actualPrice = 0
    if (isWithTax == true){
      actualPrice = _price * 1.25
    }
    else {
      actualPrice = _price
    }
    return actualPrice
  }