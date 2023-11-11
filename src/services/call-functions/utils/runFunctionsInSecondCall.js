const { functionDictionary } = require('./functionDictionary');

async function runFunctionsInSecondCall (userText, argumentsFunction, nameFunction, Obj) {

    console.log(userText);
    console.log(argumentsFunction);
    console.log(nameFunction);
    console.log(Obj);
    
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0613',
            "messages": [
                {
                    "role": "user", 
                    "content": userText
                },
                {
                    "role": "assistant",
                    "content": null,
                    "function_call": {
                        "name": nameFunction,
                        "arguments": argumentsFunction
                    }
                },
                {
                  "role": "function",
                  "name" : nameFunction,
                  "content": JSON.stringify(Obj),
                }
              ],
              "functions": functionDictionary
        });
    
    
        console.log("Razon de fin de la segunda llamada: " + response.choices[0].finish_reason)
    
        if(response.choices[0].finish_reason === "stop") {
            console.log(response.choices[0].message.content)
            return response.choices[0].message.content;
        } else {
          return `Ups parace que algo ha salido mal al llamar a la funcion: ${nameFunction}`;
        }
    
    }

module.exports = {
    runFunctionsInSecondCall
}