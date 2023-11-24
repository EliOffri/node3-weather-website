
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgWeather = document.querySelector('#message-w')
const msgError = document.querySelector('#message-e')
const msg3 = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msgWeather.textContent = 'Loading...'
    msgError.textContent = ''
    msg3.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgError.textContent = data.error
                msgWeather.textContent = ''
            } else {
                msgWeather.textContent = data.city + ', ' + data.region + ', ' + data.country
                msgError.textContent = data.temperature + ' C'
                msg3.textContent = 'It is currently ' + data.desc + ' in ' + data.city + ' where the local time is ' + (String(data.time)).substring(10)
            }
        })
    })
})