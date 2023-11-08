const { OpenAI } = require('openai');
const axios = require('axios');

const openai = new OpenAI({});

async function runCallFunctions (userText) {
	userText = "Que hora es?"
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0613',
        "messages": [
            {"role": "user", content: userText}
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
                "name": "getTimeOfDay",
                "description": "Brindar al usuario la hora",
                "parameters": {
                    "type": "object",
                    "properties": {
                    },
                    "require": [],
                }
            }
          ]
    });


    if(response.choices[0].finish_reason != "function_call") {
        console.log(response.choices[0].message.content);
        return response.choices[0].message.content;
    }

    const {name: nameFunction, arguments: argumentsFunction} = response.choices[0].message.function_call;
    const parsedArguments = JSON.stringify(argumentsFunction);

    if(nameFunction === 'get_current_weather') {
        const Obj = await getWeather(parsedArguments);

        const response = await runCallFunctionsSecond(userText, argumentsFunction, nameFunction, Obj);
        return response.choices[0].message.content;
    }

    if(nameFunction === 'getTimeOfDay'){
        const Obj = getTimeOfDay(parsedArguments);

        const response = await runCallFunctionsSecond(userText, argumentsFunction, nameFunction, Obj);
        console.log(response);
        return response;
    }
}

async function runCallFunctionsSecond (userText, argumentsFunction, nameFunction, Obj) {

console.log(userText);
console.log(argumentsFunction);
console.log(nameFunction);
console.log(Obj);


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


async function getWeather(parsedArguments){
    try {
        const response = axios.get(
            'http://weatherapi.com/v1/current.json',
            { params: { q: parsedArguments.location , key: 'c2a6dd3012ad48e1adc120348230811'}}
        );

        const weather = response.data;
        console.log(response);
        const {condition, temp_c, temp_f} = weather.current;
        const unit = parsedArguments.unit !== 'fahrenheit' ? 'celicus' : 'fahrenheit';
        const temperature = unit === 'celicus' ? temp_c : temp_f;
        return {temperature, unit, description : condition.text}
    } catch (error) {
        console.log(error);
    }
}

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

module.exports = {
    runCallFunctions
}