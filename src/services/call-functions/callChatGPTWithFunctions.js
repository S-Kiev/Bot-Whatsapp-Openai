const { OpenAI } = require('openai');


const { functionDictionary } = require('./utils/functionDictionary');
const utilityFunctions = require('./utils/utilityFunctions');
const { runFunctionsInSecondCall } = require('./utils/runFunctionsInSecondCall')

const openai = new OpenAI({});


async function runCallFunctions (userText) {
  console.log(userText)
 
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0613',
        "messages": [
            {
               "role": "user",
               "content": userText
            }
          ],
        "functions": functionDictionary
    });




    console.log(response);
    if(response.choices[0].finish_reason != "function_call") {
        console.log(response.choices[0].message.content);
        return response.choices[0].message.content;
    }


    console.log(response.choices[0].finish_reason);


    const {name: nameFunction, arguments: argumentsFunction} = response.choices[0].message.function_call;
    const parsedArguments = JSON.stringify(argumentsFunction);
    const objectArguments = JSON.parse(argumentsFunction);




    if (nameFunction === 'findCustomerByNameAndLastname') {
        utilityFunctions.findCustomerByNameAndLastname(objectArguments.name, objectArguments.lastname)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name} ${objectArguments.lastname}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'findConsultationByCustomerNameAndLastname') {


        const name  = objectArguments.name.replace(/\s/g, "%20");
        const lastname = objectArguments.lastname.replace(/\s/g, "%20");


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/user-informations?filters[name][$eqi]=${name}&filters[lastname][$eqi]=${lastname}`);
        const method = 'get';
        const headers = {};


        utilityFunctions.strapiRequestGet(url, method, headers)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name} ${objectArguments.lastname}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'findStatusOfPaymentsOfCustomerByNameAndLastname') {


        const name  = objectArguments.name.replace(/\s/g, "%20");
        const lastname = objectArguments.lastname.replace(/\s/g, "%20");


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/customer-payments?populate=*&filters[customer][name][$eqi]=${name}&filters[customer][lastname][$eqi]=${lastname}&sort[0]=createdAt:desc&pagination[limit]=1`);
        const method = 'get';
        const headers = {};


        utilityFunctions.strapiRequestGet(url, method, headers)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name} ${objectArguments.lastname}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'findConsultationByResponsibleUserName') {


        const name  = objectArguments.name.replace(/\s/g, "%20");


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/consultations?populate=*&filters[responsibleUser][name][$eqi]=${name}&sort[0]=createdAt:desc&pagination[limit]=1`);
        const method = 'get';
        const headers = {};


        utilityFunctions.strapiRequestGet(url, method, headers)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'findEquitmentByName') {


        const name  = objectArguments.name.replace(/\s/g, "%20");


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/equipments?populate=*&filters[name][$eqi]=${name}`);
        const method = 'get';
        const headers = {};


        utilityFunctions.strapiRequestGet(url, method, headers)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'findByStatusEquitmentByName') {


        const name  = objectArguments.name.replace(/\s/g, "%20");


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/equipment-histories?populate=*&filters[equipment][name][$eqi]=${name}`);
        const method = 'get';
        const headers = {};


        utilityFunctions.strapiRequestGet(url, method, headers)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'findTreatmentsByName') {


        const name  = objectArguments.name.replace(/\s/g, "%20");


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/treatments?populate=*&filters[name][$eqi]=${name}`);
        const method = 'get';
        const headers = {};


        utilityFunctions.strapiRequestGet(url, method, headers)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'findConsultingRoomsByName') {


        const name  = objectArguments.name.replace(/\s/g, "%20");


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/consulting-rooms?populate=*&filters[name][$eqi]=${name}`);
        const method = 'get';
        const headers = {};


        utilityFunctions.strapiRequestGet(url, method, headers)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'findStatusOfConsultingRoomsByName') {


        const name  = objectArguments.name.replace(/\s/g, "%20");


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/consulting-room-histories?populate=*&filters[consulting_room][name][$eqi]=${name}`);
        const method = 'get';
        const headers = {};


        utilityFunctions.strapiRequestGet(url, method, headers)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'findMedicalInformationOfCustomerByNameAndLastname') {


        const name  = objectArguments.name.replace(/\s/g, "%20");
        const lastname = objectArguments.lastname.replace(/\s/g, "%20");


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/customer-medical-informations?populate=*&filters[customer][name][$eqi]=${name}&filters[customer][lastname][$eqi]=${lastname}`);
        const method = 'get';
        const headers = {};


        utilityFunctions.strapiRequestGet(url, method, headers)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'findMeasurementsOfCustomerByNameAndLastname') {


        const name  = objectArguments.name.replace(/\s/g, "%20");
        const lastname = objectArguments.lastname.replace(/\s/g, "%20");


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/measurements-customers?populate=*&filters[customer][name][$eqi]=${name}&filters[customer][lastname][$eqi]=${lastname}`);
        const method = 'get';
        const headers = {};


        utilityFunctions.strapiRequestGet(url, method, headers)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'updateCustomerPersonalInformation') {


        const name  = objectArguments.name.replace(/\s/g, "%20");
        const lastname = objectArguments.lastname.replace(/\s/g, "%20");


        const customer = utilityFunctions.findCustomerByNameAndLastname( name, lastname )


        let data = JSON.stringify({
          "data": {
            objectArguments
          }
        });


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/customer-personal-informations/${customer.id}`);
        const method = 'put';
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BOT_STRAPI_KEY}`
        };


        utilityFunctions.strapiRequestUpdate(url, method, headers, data)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'updatePaymentInformationCustomer') {


        const name  = objectArguments.name.replace(/\s/g, "%20");
        const lastname = objectArguments.lastname.replace(/\s/g, "%20");


        const customer = utilityFunctions.findCustomerByNameAndLastname( name, lastname )


        let data = JSON.stringify({
          "data": {
            objectArguments
          }
        });


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/customer-payments/${customer.id}`);
        const method = 'put';
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BOT_STRAPI_KEY}`
        };


        utilityFunctions.strapiRequestUpdate(url, method, headers, data)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'updateMedicalInformationCustomer') {


        const name  = objectArguments.name.replace(/\s/g, "%20");
        const lastname = objectArguments.lastname.replace(/\s/g, "%20");


        const customer = utilityFunctions.findCustomerByNameAndLastname( name, lastname )


        let data = JSON.stringify({
          "data": {
            objectArguments
          }
        });


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/customer-medical-informations/${customer.id}`);
        const method = 'put';
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BOT_STRAPI_KEY}`
        };


        utilityFunctions.strapiRequestUpdate(url, method, headers, data)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }


      if (nameFunction === 'updateMeasurementsCustomer') {


        const name  = objectArguments.name.replace(/\s/g, "%20");
        const lastname = objectArguments.lastname.replace(/\s/g, "%20");


        const customer = utilityFunctions.findCustomerByNameAndLastname( name, lastname )


        let data = JSON.stringify({
          "data": {
            objectArguments
          }
        });


        const url = process.env.STRAPI_BACKEND_HOST + (`/api/measurements-customers/${customer.id}`);
        const method = 'put';
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BOT_STRAPI_KEY}`
        };


        utilityFunctions.strapiRequestUpdate(url, method, headers, data)
          .then((Obj) => {
            console.log("El objeto está: " + Obj);
            if (Obj == undefined) {
              Obj = {
                message: `No se pudo recuperar los datos de ${objectArguments.name}`
              };
            }
     
            //Aqui el Obj podria procesarse para dar una respuesta mas fluida


            const response = runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
            return response;
          })
          .catch((error) => {
            console.error("Error al obtener el objeto:", error);
          });
      }
     
     


    if(nameFunction === 'getTimeOfDay'){
        const Obj = utilityFunctions.getTimeOfDay(parsedArguments);
        const response = await runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
        return response;
    }
}


module.exports = {
    runCallFunctions
}
