let h1Day = document.querySelector('h1#day')
let section = document.querySelector('section')

/*******************************************************************************/

let i=0 //usado para percorrer o array de fotos da Terra
let array //array (de json) das fotas da Terra
let d //objeto que vai guardar algumas informações sobre data e hora de cada foto
let apiKey = '7BkyIyS2p0ChLQBSiTGSlbz7b1n4EzDBzFoQH8Xb'
let imgLink = 'https://epic.gsfc.nasa.gov/archive/natural/'
let yesterdayEarth = `https://api.nasa.gov/EPIC/api/natural?api_key=${apiKey}`

/*******************************************************************************/

async function preparePage() {

    let response = await fetch(yesterdayEarth)
    array = await response.json()

    d = getDateInfos(array)
    h1Day.insertAdjacentText('beforeend', "Fotos do dia "+d.day+"/"+d.month+"/"+d.year)
    addBlocos(9)
}

function getDateInfos(array) {
    //formato de array[i].date: "2018-05-26 00:50:27"
    let obj = {}
    obj.year = array[0].date.substr(0, 4)
    obj.month = array[0].date.substr(5, 2)
    obj.day = array[0].date.substr(8, 2)
    obj.hour = array.map(i => {return i.date.substr(11, 8)})
    return obj
}

window.addEventListener('scroll', function() {
    let at = document.body.offsetHeight // at = alturaTotal do documento
    let y = window.scrollY // y = pixels scrollados desde o inicio do documento
    let altura = window.innerHeight // 648 no monitor de casa
    sobra = at-altura
    if(y == sobra)
        addBlocos(3)
})

function addBlocos(qtd) {
    let str = ""
    let max = i+qtd
    for(; i<max; i++) {
        if(array[i] == undefined)
            break
        str += getProxBloco()
    }
    section.insertAdjacentHTML('beforeend', str)
}

function getProxBloco() {
    return `
    <div class="bloco">
        <img src="${imgLink}${d.year}/${d.month}/${d.day}/png/${array[i].image}.png">
        <span>${d.hour[i]}</span>
    </div>`
}

Window.onload = preparePage()