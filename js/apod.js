let intro_text = document.querySelector('p#intro')
let button = document.querySelector('input#date-submit')
let error_msg = document.querySelector('p#error-msg')
let apod_title = document.querySelector('h2#apod-title')
let media_date = document.querySelector('p#media-date')
let media = document.querySelector('div#media')
let explanation = document.querySelector('p#explanation')

/*******************************************************************************/

let json //will receive the apod json
let apiKey = '7BkyIyS2p0ChLQBSiTGSlbz7b1n4EzDBzFoQH8Xb'
let apodLink = 'https://api.nasa.gov/planetary/apod'
let todayApod = `${apodLink}?api_key=${apiKey}`

async function main() {

    await loadAPOD(todayApod) //loading the today's apod

    intro_text.textContent = `Today is ${json.date}, but you can choose a different date
        right below!`

    button.addEventListener('click', async function(e) {
        e.preventDefault()
        let queryDate = document.querySelector('input#date-input').value
        let link = `${apodLink}?date=${queryDate}&api_key=${apiKey}`
        loadAPOD(link)
    })

}

async function loadAPOD(link) {

    let response = await fetch(link)
    json = await response.json()

    if(json.code == 400) { //invalid date
        error_msg.textContent = "Invalid date!"
        return
    }else
        error_msg.textContent = ""

    apod_title.textContent = json.title
    media_date.textContent = json.date

    media.innerHTML = ''
    media.insertAdjacentHTML('beforeend', `<p id="media-date">${json.date}</p>`)
    if(json.media_type == 'image')
        media.insertAdjacentHTML('beforeend', `
            <a href="${json.hdurl}" target="_blank"><img src="${json.url}"></a>`)
    else if(json.media_type == 'video')
        media.insertAdjacentHTML('beforeend', `
            <iframe src="${json.url}" allowfullscreen>`)

    explanation.textContent = json.explanation

}

main()