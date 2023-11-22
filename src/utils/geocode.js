const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=d60dbee62693ca057254cd04e36e7772&query=' + encodeURIComponent(address) + '&limit=1'

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to Geographic Service', undefined)
        } else if (response.body.error) {
            callback('Unable to find location')
        } else if ((JSON.parse(JSON.stringify(response))).body.data[0] === undefined){
            callback('Location not found')
        } else {
            const obj = (JSON.parse(JSON.stringify(response))).body.data
            callback(undefined, {
                latitude: obj[0].latitude,
                longitude: obj[0].longitude,
                city: obj[0].name,
                region: obj[0].region,
                country: obj[0].country
            })
        }
    })
}

module.exports = geocode
