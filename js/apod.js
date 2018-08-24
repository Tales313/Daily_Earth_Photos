let title = document.querySelector('h1#title')
let media = document.querySelector('div#media')
let explanation = document.querySelector('p#explanation')

/*******************************************************************************/

let json
let apiKey = '7BkyIyS2p0ChLQBSiTGSlbz7b1n4EzDBzFoQH8Xb'
let apod = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`

// let demo = 'https://api.nasa.gov/planetary/apod?date=2018-06-18&api_key=DEMO_KEY'

async function preparePage() {

    let response = await fetch(apod)
    // let response = await fetch(demo)
    json = await response.json()
    console.log(json)

    title.textContent = json.title

    if(json.media_type == 'image')
        media.insertAdjacentHTML('afterbegin', `
            <a href="${json.hdurl}" target="_blank"><img src="${json.url}"></a>`)
    else if(json.media_type == 'video')
        media.insertAdjacentHTML('afterbegin', `
            <iframe src="${json.url}" allowfullscreen>`)

    explanation.textContent = json.explanation

}

preparePage()