const { application } = require('express')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { hasSubscribers } = require('diagnostics_channel')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Path names
const directoryPath = path.join(__dirname ,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//for views and view engines
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(directoryPath))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Mudit Khandelwal'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Mudit Khandelwal'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        msg: 'This is a help page. It is created to tell you about this app.',
        title: 'Help',
        name: 'Mudit Khandelwal'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please enter an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error,data) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                location: location,
                Forecast: data,
                address: req.query.address
            })

        })
    })

    
})

app.get('/help/*', (req,res) => {
    res.render('error',{
        error: 'Help article not found.',
        title: '404',
        name: 'Mudit Khandelwal'
    })
})

app.get('*', (req,res) =>{
    res.render('error',{
        error: 'Error 404: Page Not Found',
        title: '404',
        name: 'Mudit Khandelwal'
    })
})


app.listen(3000, () =>{
    console.log('Server is up and running')
})