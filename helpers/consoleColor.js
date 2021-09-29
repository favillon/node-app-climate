const colors = require('colors')

const arrayTheme = {
    custom: ['white', 'bgMagenta']
}

colors.setTheme(
    arrayTheme
);

const outConsole = ({text, style = 'green', visible = true}) => {

    const arrayTypes = Object.keys(colors.styles)
    const arrayTypes2 = Object.keys(arrayTheme)

    if (!arrayTypes.includes(style) && !arrayTypes2.includes(style) ) {
        style ='green'
    }

    if (visible) {
        console.log(colors[style](text));
    }    
}

module.exports = {
    outConsole
}