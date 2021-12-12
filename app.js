require('dotenv').config()

const { inquirerMenu, pausa, leerInput, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas')

const main = async () => {

    const busquedas = new Busquedas();

    let opt;
    do {
        opt = await inquirerMenu();

        switch ( opt ) {
            case 1:

                const lugar = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(lugar);

                const id = await listarLugares(lugares);
                if( id === '0') continue; 

                const lugarSel = lugares.find(el => el.id === id)
                busquedas.agregarHistorial( lugarSel.nombre )

                const respClima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng)

                console.log('\n Informacion de la ciudad \n'.green);
                console.log('Ciudad: ', lugarSel.nombre);
                console.log('Lat: ', lugarSel.lat);
                console.log('Lng: ', lugarSel.lng);
                console.log('Tempreatura: ', respClima.temp+'º');
                console.log('Minima: ', respClima.minTemp+'º');
                console.log('Maxima: ', respClima.minTemp+'º');
                console.log('Estado: ', respClima.desc);
                break;
            case 2:
                busquedas.historial.forEach((el,i) => {
                    const idx = `${i + 1}`.green;
                    console.log( `${idx} ${el}`)
                })                
            break;
        }

        if ( opt !== 0 ) await pausa();

    } while (opt != 0);
    
}


main();