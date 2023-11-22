

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const msgWeather = document.querySelector('#message-w')
const msgError = document.querySelector('#message-e')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msgWeather.textContent = 'Loading...'
    msgError.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgError.textContent = data.error
                msgWeather.textContent = ''
            } else {
                msgWeather.textContent = data.city + ', ' + data.region + ', ' + data.country
                msgError.textContent = data.temperature
            }
        })
    })
})