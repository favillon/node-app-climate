require('colors');
const inquirer = require('inquirer')

const {menuSelecion} = require('./mensajes')
const menuOpts = require('./menuOpts')

const configQuestion = [{
    type: 'list',
    name: 'idSeleccion',
    message : '¿Que desea hacer?',
    choices : menuOpts
}]

const configQuestionPausa = [{
    type: 'input',
    name: 'opcion',
    message : `Precione ${'Enter'.green} para continuar`
    
}]

const  inquirerMenu = async() => {

    //console.clear()
    menuSelecion()
    const {idSeleccion} = await inquirer.prompt(configQuestion)

    return idSeleccion

}


const  inquirerPausa = async() => {
   await inquirer.prompt(configQuestionPausa)
   console.log('\n');
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if (value .length === 0){
                    return 'Por favor ingrese un valor'.grey
                }
                return true
            }
        }
    ]

    const {desc} = await inquirer.prompt(question)
    return desc
}

const listarLugares = async (lugares = []) => {

    const choices = lugares.map((lugar, id) => {
        const idx = `${id+1}).`.green
        return {
            value : lugar.id,
            name : `${idx} ${lugar.name}`
        }
    })
    choices.unshift({
        value : 0,
        name : `0).`.green + ' Cancelar'
    })
    const configOptionQuestion = [{
        type: 'list',
        name: 'idPlace',
        message : '¿Seleccione lugar?',
        choices
    }]
    const {idPlace} = await inquirer.prompt(configOptionQuestion)
    return idPlace
}

const checkList = async (tareas = []) => {

    const choices = tareas.map((tarea, id) => {
        const idx = `${id+1}).`.green
        return {
            value : tarea.id,
            name : `${idx} ${tarea.desc}`,
            checked : (tarea.completed) ? true : false
        }
    })
    
    const questionCheck = [{
        type: 'checkbox',
        name: 'ids',
        message : 'Seleccione',
        choices
    }]
    const {ids} = await inquirer.prompt(questionCheck)
    return ids
}

const confirmar = async (message) => {
    const questionConfirm = [{
        type: 'confirm',
        name: 'ok',
        message
    }]
    const {ok} = await inquirer.prompt(questionConfirm)
    return ok
}

module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listarLugares,
    confirmar,
    checkList
}