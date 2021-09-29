require('dotenv').config()

const { outConsole } = require('./helpers/consoleColor')
const { leerInput, inquirerMenu, inquirerPausa, listarLugares} = require('./helpers/inquirer')
const Search = require('./models/Search.class')


const main = async () => {

    const search = new Search()

    let opt = null    

    do{
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                const query = await leerInput('Lugar a buscar : ')
                const arrayPlaces = await search.place(query)
                
                const idSelecionado = await listarLugares(arrayPlaces)
                if (idSelecionado === 0 ){
                    continue
                }
                
                const {name, lon, lat} = arrayPlaces.find( lugar => lugar.id === idSelecionado)

                search.addHistory({name, lon, lat})
                
                const {desc, min, max, temp} = await search.climatePlace(lon,lat)

                //console.clear()
                console.log('\n')
                console.log('Informacion de la ciudad'.underline.red)
                console.log('\n')
                console.log('Ciudad      => '  + name.green)
                console.log('Lng         >> ' + lon)
                console.log('Lat         >> ' + lat)
                console.log('Temperatura >> ' + temp)
                console.log('Minima      >> ' + min)
                console.log('Maxima      >> ' + max)
                console.log('Descripcion >> ' + desc)
                console.log('\n')
                break;
            case 2:
                search.historial.forEach((historyPlace, index) => {
                    console.log((index+1) + '). ' + historyPlace.name + '('+ historyPlace.lon +','+ historyPlace.lat +')')                        
                })
                break;
        }
        await inquirerPausa()
    } while(opt !== 0 )
}

main()