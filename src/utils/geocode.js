const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibXVkaXQwNyIsImEiOiJja3k0dmRsOGYwYXdlMndzMWFzOGJiZ2VjIn0.X8xuL72GRQ9X1MUX3tYU8g&limit=1'
    request({url, json: true}, (error,{ body }) => {
        if(error){
             callback('Unable to connect to the services', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another Search', undefined)
        } else{
            callback( undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name

            })
        }
    })
}

module.exports = geocode