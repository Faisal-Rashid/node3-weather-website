
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const port = process.env.PORT || 3000

const app = express()

//Setting up Directory Path
const publicDirectory = path.join(__dirname, '../public')
const partialsDirectory = path.join(__dirname, '../public/partials')

//Setting up Handelbars Engine and Setting view location
app.set('view engine','hbs')
app.set('views', publicDirectory)
hbs.registerPartials(partialsDirectory)

//Setting up Static Serving path
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title:'Home'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About'
    })

})


// app.get('/weather', (req, res) => {
    
//     res.render('weather', {
//         title:"Weather"
//     })
// })

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Weather'
    })

})


app.get('/getweather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error:'Please select Address'
        })
    }
    geocode.get_geocode(req.query.address, (error, geocode_cooridinates)=> {
        if(error){
            return res.send({
                error: error
            })
        }
        
        weather.get_weather(geocode_cooridinates, (error, forcast_data)=> {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send(forcast_data[0])
        })

        
    })

})


app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404 - Page not Found'
    })
})

//app.com
//app.com/contact
//app.com/about

app.listen(port, () => {
    console.log('Server is running on port '+ port)
})