const axios = require('axios');
const { parseISO } = require('date-fns');
const { config } = require('dotenv');

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

function processObj(nameFunction, Obj, objectArguments, number) {

   if (nameFunction === 'findTotalDebtByCustomerNameAndLastname') {

console.log("Obj.data =>" + Obj.data);
    if (Array.isArray(Obj.data)) {
        console.log("Obj.data[0] =>" + Obj.data[0]);
        console.log("Obj.data[0].attributes =>" + Obj.data[0].attributes);
        console.log("Obj.data[0].attributes.paid =>" + Obj.data[0].attributes.paid);
    } else {
        console.log("Obj.data no es un array");
    }

    const totalDebt = (Obj.data || []).map(item => {
      console.log(item.attributes);
      console.log(item.attributes.totalCost);
      console.log(item.attributes.paid);

      const totalCost = item.attributes.totalCost || 0;
      const paid = item.attributes.paid || 0;
      return totalCost - paid;
  }).reduce((accumulator, current) => accumulator + current, 0);

      const response = `${objectArguments.name} ${objectArguments.lastname} adeuda un total de ${totalDebt}$ en ${Obj.data.length} deudas.`;

      console.log(response);

      Obj = { response };
  }

  // Otros casos o retorno predeterminado
  return Obj;
}

/*
async function strapiRequestGet(url, method, headers) {
  return new Promise((resolve, reject) => {

    let config = {
      method: method,
      maxBodyLength: Infinity,
      url: url,
      headers: headers,
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

async function strapiRequestUpdateAndCreate(url, method, headers, data) {
  return new Promise((resolve, reject) => {

    let config = {
      method: method,
      maxBodyLength: Infinity,
      url: url,
      headers: headers,
      data: data
    };

    axios
      .request(config)
      .then((response) => {
        //console.log("Respuesta de Axios =>");
        //console.log(JSON.stringify(response.data));
        resolve(JSON.stringify(response.data));
      })
      .catch((error) => {
        //console.log(error);
        reject(error);
      });
  });
}
*/

async function strapiRequest(url, method, headers, data) {
  return new Promise((resolve, reject) => {

    let config = {
      method: method,
      maxBodyLength: Infinity,
      url: url,
      headers: headers,
    };

    if ( data !== null ){
      config = {
        ...config,
        data: data
      }
    }

    axios
      .request(config)
      .then((response) => {
        resolve(JSON.stringify(response.data));
      })
      .catch((error) => {
        //console.log(error);
        reject(error);
      });
  });
}


module.exports = {
    getTimeOfDay,
    processObj,
    strapiRequest
}