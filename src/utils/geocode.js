const request = require('request')

const get_geocode = (address, callback) => {
    const url_geoCoding = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiZmFpc2FsMTI1IiwiYSI6ImNraW4zeTdqMjBmcHkzMW84NmV5eTMwdmwifQ.tNhlcEvB70FvwNinIRI0jA&limit=1"
    request({url:url_geoCoding, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to server', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        
        else{
            const coordinates = {
                latitude:response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            }
            callback(undefined, coordinates)
        }
    })
}

module.exports = {
    get_geocode:get_geocode
}