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

    console.log(response.choices[0].finish_reason);

    if(response.choices[0].finish_reason != "function_call") {
        console.log(response.choices[0].message.content);
        return response.choices[0].message.content;
    }

    const {name: nameFunction, arguments: argumentsFunction} = response.choices[0].message.function_call;
    const parsedArguments = JSON.stringify(argumentsFunction);

    console.log(nameFunction);
    console.log(parsedArguments);


    if(nameFunction === 'findCustomerByNameAndLastname') {
        const Obj = await utilityFunctions.findCustomerByNameAndLastname(parsedArguments.name, parsedArguments.lastname);
        const response = await runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
        return response;
    }

    if(nameFunction === 'getTimeOfDay'){
        const Obj = utilityFunctions.getTimeOfDay(parsedArguments);

        const response = await runFunctionsInSecondCall(userText, argumentsFunction, nameFunction, Obj);
        console.log(response);
        return response;
    }
}

module.exports = {
    runCallFunctions
}