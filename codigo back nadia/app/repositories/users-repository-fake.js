"use strict";

const users = [{
    id: 1,
    name: 'Pepe Gonzales',
    city: 'Lugo',
    price: 320,
    description: 'Horseback riding Camino de Santiago.'
},
{
    id: 2,
    name: 'Roberto Mendez',
    city: 'Pontevedra',
    price: 19,
    description: 'Visit an Historic Palace and Winery in the hearth of Galicia.'
},
{
    id: 3,
    name: 'Maria Castro',
    city: 'A Coruña',
    price: 19,
    description: 'Our Surf School is located in Corrubedo, a beautiful region of Ribeira that enjoys a spectacular natural environment, ideal for any sport.'
}]

function findAllUsers() {
    //const sql='SELECT'
    return users;
}

module.exports = {
    findAllUsers,
}