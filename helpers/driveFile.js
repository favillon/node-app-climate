const fs =require('fs')

const archivo = `./bd/data.json`

const saveData = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data))
}

const readDB = () => {
    if (!fs.existsSync(archivo)){
        return []
    } 
    const info = fs.readFileSync(archivo, {encoding:'utf-8'})
    const data = JSON.parse(info)
    return data.historial
}

module.exports = {
    saveData,
    readDB
}