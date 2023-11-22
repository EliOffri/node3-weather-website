const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=45e0af12ff3f649fba14ba7ca4833ae0&query=' + lat + ',' + long

    request({url, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to weather service", undefined)
        } else if (response.body.error){
            callback('Unable to find location', undefined)
        } else {
            const curWeather = JSON.parse(JSON.stringify(response))
            callback(undefined, curWeather.body.current.temperature)
        }
    })
}

module.exports = forecast