export function getArea(){
    let area = ""
    if (localStorage.getItem('area')){
        area = localStorage.getItem('area')
    }
    let areaText = ""
    if (area == "DK1"){
        areaText = 'Vest'
    }
    if (area == "DK2"){
        areaText = 'Øst'
    }
    return {areaText, area}
}