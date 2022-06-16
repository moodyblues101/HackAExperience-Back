"use strict";

const axios = require("axios");

async function getRandomUser() {
    const user = await axios({
        method: "get",
        url: "https://randomuser.me/api"
    });

    return user;
}

// async function getHtmlContent(url) {
//     const htmlContent = await axios({
//         method: "get",
//         url
//     });

//     return htmlContent;
// }

module.exports = {
    getRandomUser,
    // getHtmlContent,
};