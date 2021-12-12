const inquirer = require('inquirer');
require('colors')

const preguntas = [
    {
        type:'list',
        name : 'opcion',
        message : '¿Que desea hacer?',
        choices : [
            {value : 1,name : `${'1.'.green} Buscar ciudad`},
            {value : 2,name : `${'2.'.green} Historial`},
            {value : 0,name : `${'0.'.green} Salir`},
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('========================'.green);
    console.log(' Seleccione una opcion');
    console.log('========================\n'.green);

   const {opcion} =  await inquirer.prompt(preguntas);
   return opcion
}

const pausa = async () => {
    const quiestion = [
        {
            type: 'input',
            name : 'enter',
            message : `\nPresione ${'ENTER'.blue} para continuar\n`
        }
    ]

    await inquirer.prompt(quiestion)
}

const leerInput = async ( message ) => {
    const question = [
        {
            type: 'input',
            name : 'desc',
            message,
            validate( value ){
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true
            }
        }
    ];

    const { desc } = await inquirer.prompt(question)
    return desc
}

const listarLugares = async (lugares = []) => {    
    const choices = lugares.map( (el,i) => {
        const idx = `${i +1}.`.green;
        return {
            value : el.id,
            name: `${idx} ${el.nombre}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    })

    const preguntas = [
        {
            type:'list',
            name:'id',
            message : 'Seleccione lugar : ',
            choices
        }
    ]
   const {id} =  await inquirer.prompt(preguntas);
   return id
}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

   const { ok } =  await inquirer.prompt(question);
   return ok;


}

const mostrarListadoCheckList = async (tareas) => {    
    const choices = tareas.map( (el,i) => {
        const idx = `${i +1}.`.green;
        return {
            value : el.id,
            name: `${idx} ${el.desc}`,
            checked : (el.completadoEn) ? true : false
        }
    })

    const pregunta = [
        {
            type:'checkbox',
            name:'ids',
            message : 'Selecciones',
            choices
        }
    ]
   const {ids} =  await inquirer.prompt(pregunta);
   return ids
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}

