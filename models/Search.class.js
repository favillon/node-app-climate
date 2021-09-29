const { default: axios } = require("axios");
const {saveData,readDB} = require('../helpers/driveFile')

class Search {
    historial = []

    constructor(){
        this.historial = readDB()
    }

    get parametersMapbox(){
        return {
            'access_token' : process.env.MAPBOX_TOKEN,
            'language' : 'es',
            'limit' : 5
        }
    }

    get parametersClimate(){
        return {            
            appid : process.env.OPENWEATHER_TOKEN,
            units : 'metric',
            lang : 'es'
        }        
    }

    async place(stringPlace=''){
        try {
            const instance = axios.create({
                baseURL : `https://api.mapbox.com/geocoding/v5/mapbox.places/${stringPlace}.json`,
                params  : this.parametersMapbox
            })

            const resp = await instance.get()
            return resp.data.features.map(lugar => ({
                id   : lugar.id,
                name : lugar.place_name,
                lon  : lugar.center[0],
                lat  : lugar.center[1]
            }))
        } catch (error) {
            console.log('error try catch: place')
            return []
        }
    }

    async climatePlace(lon, lat){
        try {
            const instance = axios.create({
                baseURL : `https://api.openweathermap.org/data/2.5/weather`,
                params  : {lon, lat, ...this.parametersClimate}
            })

            const resp = await instance.get()
            const {weather, main} = resp.data
            
            return {
                desc  : weather[0].description,
                min   : main.temp_min,
                max   : main.temp_max,
                temp  : main.temp
            }
        } catch (error) {
            console.log('error try catch : climatePlace =>' + error)
            return []
        }
    }

    addHistory(place){
        this.historial.unshift(place)
        const payLoad = {
            historial : this.historial
        }
        saveData(payLoad)
    }
}


module.exports = Search