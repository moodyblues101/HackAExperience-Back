"use strict";

const experiences = [{
    id: 1,
    name: 'Horseback Riding',
    description: 'Horseback riding Camino de Santiago.',
    city: 'Lugo',
    price: 320,
    totalPlaces: 6,
    availablePlaces: 6,
    visits: null,
    eventStartDate: '2022-02-01',
    eventEndDate: '2022-02-15',
    createdAt: '2022-01-24 17:30:00',
    updatedAt: null,
    idCategory: 1
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

function findAllExperiences() {
    //const sql='SELECT * FROM experiences';
    return experiences;
}

function findExperienceById(id) {
    //const sql='SELECT * FROM experiences WHERE id = id';
    return experiences.find(experience => experience.id === +id);
}

module.exports = {
    findAllExperiences,
    findExperienceById,
}