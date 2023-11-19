const axios = require('axios');

function getTimeOfDay(){
    let date = new Date()
    let hours = date.getHours()
    let timeOfDay = "AM"
    if(hours > 12){
      hours = hours - 12
      timeOfDay = "PM"
    }

	return {
        date: date,
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        timeOfDay: timeOfDay,
    };
}

async function findCustomerByNameAndLastname(name, lastname) {
  return new Promise((resolve, reject) => {
    
    name  = name.replace(/\s/g, "%20");
    lastname = lastname.replace(/\s/g, "%20");

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://strapi-supabase-dkk9.onrender.com/api/user-informations?filters[name][$eqi]=${name}&filters[lastname][$eqi]=${lastname}`,
      headers: {},
    };

    console.log(config.url);

    axios
      .request(config)
      .then((response) => {
        console.log("Respuesta de Axios =>");
        console.log(JSON.stringify(response.data));
        resolve(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

async function strapiPublicRequest(url) {
  return new Promise((resolve, reject) => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: url,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Respuesta de Axios =>");
        console.log(JSON.stringify(response.data));
        resolve(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}


module.exports = {
    getTimeOfDay,
    findCustomerByNameAndLastname,
    strapiPublicRequest
}