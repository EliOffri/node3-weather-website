const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express configuration
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Rainy',
        name: 'Eli'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'abouttt',
        name: 'Eli Offri'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 
    const dataGeo = geocode(req.query.address, (geoError, data) => {
        if (geoError) {
            return res.send({
                error: geoError
            })
        }
        forecast(data.latitude, data.longitude, (forecastError, forecastData) => {
            if (forecastError) {
                return res.send({
                    error: forecastError
                })
            }
            res.send({
                city: data.city,
                region: data.region,
                country: data.country,
                temperature: forecastData
            })
        })
    })
})


    app.get('/help', (req, res) => {
        res.render('help', {
            title: 'helppp',
            name: 'Shlomi'
        })
    })

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        name: 'go to /help'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        name: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})