const { OpenAI } = require('openai');

const { functionDictionary } = require('./utils/functionDictionary');
const utilityFunctions = require('./utils/utilityFunctions');
const { runFunctionsInSecondCall } = require('./utils/runFunctionsInSecondCall')

const openai = new OpenAI({});

async function runCallFunctions (userText) {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0613',
        "messages": [
            {"role": "user", content: userText}
          ],
          "functions": functionDictionary
    });


    if(response.choices[0].finish_reason != "function_call") {
        console.log(response.choices[0].message.content);
        return response.choices[0].message.content;
    }

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