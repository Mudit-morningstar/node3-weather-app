const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=fdf40e24a70b598364afc4c3dee6a2ac&query=' + latitude + ',' + longitude + '&units=m'
    request({url, json: true}, (error, { body }) => {
            if(error){
                callback('Unable to connect to the services')
            } else if(body.error){
                console.log('Unable to find location. Please enter another location')
            } else{
                const data = body.current
            callback(undefined, data.weather_descriptions[0] + '. It is ' + data.temperature + ' degrees out there but it feels like ' + data.feelslike + ' degrees'
             )
        
            }
            
        })
}

module.exports = forecast