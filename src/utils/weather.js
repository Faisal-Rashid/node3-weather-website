const request = require('request')

const get_weather = (coordinates, callback)=>{
    const api_key = "appid=efc4cf983fa276b93c8d504cf6a8c14e"
    
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+coordinates.latitude+'&lon='+coordinates.longitude+'&'+api_key

    console.log(url)
    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to weather sercer', undefined)
        }
        else{
            callback(undefined, response.body.weather)
        }


    })

}

module.exports = {
    get_weather:get_weather
}