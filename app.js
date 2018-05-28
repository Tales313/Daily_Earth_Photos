let h1Day = document.querySelector('h1#day')
let section = document.querySelector('section')

/*******************************************************************************/

let apiKey = '7BkyIyS2p0ChLQBSiTGSlbz7b1n4EzDBzFoQH8Xb'
let yesterdayEarth = `https://api.nasa.gov/EPIC/api/natural?api_key=${apiKey}`
let apod = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
// apod =  Astronomy Picture of the Day

/*******************************************************************************/

function preparePage() {
    fetch(yesterdayEarth).then(r => r.json()).then(array => {
        let d = getDateInfos(array)
        h1Day.insertAdjacentText('beforeend', "Fotos do dia "+d.day+"/"+d.month+"/"+d.year)
        let str = ""
        let i = 0
        let link = 'https://epic.gsfc.nasa.gov/archive/natural/'
        for(let item of array)
            str += `
                <div class="bloco">
                    <a href="${link}${d.year}/${d.month}/${d.day}/png/${item.image}.png" target="blank" rel="noopener">
                    <img src="${link}${d.year}/${d.month}/${d.day}/png/${item.image}.png">
                    </a>
                    <span>${d.hour[i++]}</span>
                </div>`
        section.insertAdjacentHTML('beforeend', str)
    })
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

Window.onload = preparePage()