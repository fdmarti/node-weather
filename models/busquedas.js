const axios = require('axios')
require('colors')
const fs = require('fs')

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor(){
        this.leerDB()
    }

    get historialCapitalizado(){
        return this.historial.map(el => {
            let palabras = el.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1))

            return palabras.join(' ')
        })
    }

    get paramsMapBox(){
        return {
            'access_token' : process.env.MAPBOX_KEY,
             'language' : 'es',
             'limit' : 5
        }
    }

    get paramsWeather(){
        return {
            appid : process.env.OPENWEATHER_KEY,
            lang: 'es',
            units : 'metric'
        }
    }

    async ciudad ( lugar = '' ){
        try {
            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre : lugar.place_name,
                lng : lugar.center[0],
                lat : lugar.center[1],
            }));

        } catch (error) {
            return [];
        }
     
    }

    async climaLugar ( lat,lon){
        try {
            
            const instance = axios.create({
                baseURL : 'https://api.openweathermap.org/data/2.5/weather',
                params: { ...this.paramsWeather, lat,lon}
            })

            const resp = await instance.get();
            const { weather, main } = resp.data
            

            return {
                desc: weather[0].description,
                minTemp: main.temp_min,
                maxTemp: main.temp_max,
                temp: main.temp
            }
            return []

        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial( lugar = '' ){
        if ( this.historial.includes(lugar.toLowerCase) ){
            return ;
        }else{
            this.historial.unshift(lugar.toLowerCase());
        }

        this.guardarDB()
    }

    guardarDB(){
        const payload = {
            historial : this.historial
        }
        fs.writeFileSync( this.dbPath, JSON.stringify(payload) )
    }

    leerDB(){
        if ( this.dbPath ){
            const historial = fs.readFileSync(this.dbPath, {encoding:'utf-8'})
            const data = JSON.parse(historial);

            this.historial = data.historial
        }else{
            return ;
        }
    }


}

module.exports = Busquedas