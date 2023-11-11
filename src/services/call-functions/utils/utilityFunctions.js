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
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:1337/api/customer-personal-informations?filters[name][$eqi]=${name}&filters[lastname][$eqi]=${lastname}`,
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        return JSON.stringify(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
}

module.exports = {
    getTimeOfDay,
    findCustomerByNameAndLastname
}