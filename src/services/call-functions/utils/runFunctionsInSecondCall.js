const { OpenAI } = require('openai');
const openai = new OpenAI({});
const { functionDictionary } = require('./functionDictionary');

async function runFunctionsInSecondCall (userText, argumentsFunction, nameFunction, Obj) {

    console.log("Llego a la segunda llamada");

    
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
    
    
        console.log(response);
    
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

/*
async function runCallFunctionsSecond (userText, argumentsFunction, nameFunction, Obj) {
    
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0613',
            "messages": [
                {"role": "user", "content": userText},
                {
                    "role": "assistant",
                    "content": null,
                    "function_call": {
                      "name": "get_current_weather",
                      "arguments": argumentsFunction
                    }
                },
                {
                "role": "function",
                "name" : nameFunction,
                "content": JSON.stringify(Obj),
                }
              ],
              "functions": [
                {
                  "name": "get_current_weather",
                  "description": "Get the current weather in a given location",
                  "parameters": {
                    "type": "object",
                    "properties": {
                      "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA"
                      },
                      "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"]
                      }
                    },
                    "required": ["location"]
                  }
                },
                {
                    name: "getTimeOfDay",
                    description: "Get the time of day.",
                    parameters: {
                        type: "object",
                        properties: {
                        },
                        require: [],
                    }
                }
              ]
        });
    
    
    
    
        if(response.choices[0].finish_reason === "stop") {
            console.log(response.choices[0].message.content)
            return response.choices[0].message.content;
        } else {
          return `Ups parace que algo ha salido mal al llamar a la funcion: ${nameFunction}`;
        }
    
    }
 */   