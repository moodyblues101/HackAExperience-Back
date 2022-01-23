"use strict";

const bookings = [{
    id: 1,
    name: 'Horseback Riding',
    city: 'Lugo',
    price: 320,
    description: 'Horseback riding Camino de Santiago.'
},
{
    id: 2,
    name: 'Guided tour and wine tasting',
    city: 'Pontevedra',
    price: 19,
    description: 'Visit an Historic Palace and Winery in the hearth of Galicia.'
},
{
    id: 3,
    name: 'Surfing in Corrubedo Galicia',
    city: 'A Coruña',
    price: 19,
    description: 'Our Surf School is located in Corrubedo, a beautiful region of Ribeira that enjoys a spectacular natural environment, ideal for any sport.'
}]

function findAllBookings() {
    //const sql='SELECT'
    return bookings;
}

module.exports = {
    findAllBookings,
    // createBooking
    // deleteBooking
}