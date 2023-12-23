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

    console.log("data");
    console.log(data);

    axios
      .request(config)
      .then((response) => {
        resolve(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("error => "); 
        console.error(error);
        console.error("error.response.data =>"); 
        console.error(error.response.data); 

        console.error("error.response =>"); 
        console.error(error.response); 
        console.error("error.response.data =>"); 
        console.error(error.response.data); 
        console.error("error.response.data.message =>"); 
        console.error(error.response.data.message); 




        if (error.response && error.response.data && error.response.data.message) {
          resolve({
            status: error.response.status,
            message: error.response.data.message,
          });
        } else {
          resolve({
            status: error.response ? error.response.status : 'Unknown',
            message: 'Ups parece que algo ha salido mal',
          });
        }
      });
  });
}

/*
async function strapiRequest(url, method, headers, data) {
  return new Promise((resolve, reject) => {

    let config = {
      method: method,
      maxBodyLength: Infinity,
      url: url,
      headers: headers,
    };

    if (data !== null) {
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

        const statusError = error.response.status;

        if (statusError >= 400 && statusError <= 499) {
          reject({ 
            status: error.response.status, 
            message: `Ups tuve problemas para conseguir la información que me pediste, indicale a mis programadores que tuve un error con este código: ${statusError}`
          });
        } else if ( statusError >= 500 && statusError <= 599) {
          reject({ 
            status: error.response.status, 
            message: `Ups tuve problemas para conseguir la información que me pediste, parece que el servidor tiene problemas, indicale a mis programadores que tuve un error con este código: ${statusError}`
          });
        } else {
          reject({
            status: error.response.status, 
            message: `Ups tuve problemas para conseguir la información que me pediste, indicale a mis programadores que tuve un error con este código: ${statusError}`,
            error: error
          });
        }
      });
  });
}
*/


module.exports = {
    getTimeOfDay,
    processObj,
    strapiRequest
}