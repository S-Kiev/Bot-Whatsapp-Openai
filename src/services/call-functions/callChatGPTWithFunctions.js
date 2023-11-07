const { OpenAI } = require('openai');

const openai = new OpenAI({});

// Get the current time of day
function getTimeOfDay(){
	let date = new Date()
	let hours = date.getHours()
	let minutes = date.getMinutes()
	let seconds = date.getSeconds()
	let timeOfDay = "AM"
	if(hours > 12){
		hours = hours - 12
		timeOfDay = "PM"
	}
	return `La hora es: ${hours}:${minutes}:${seconds} ${timeOfDay}`;
}

// Define your ChatGPT Function
async function callChatGPTWithFunctions(textUser){
	let messages = [{
		role: "system",
		content: "Realizar solicitudes de funciones para el usuario",
	},{
		role: "user",
		content: textUser,
	}];
	// Step 1: Call ChatGPT with the function name
	let chat = await openai.chat.completions.create({
		model: "gpt-3.5-turbo-0613",
		messages,
		functions: [
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
        ],
		function_call: "auto",
	})
	
	let wantsToUseFunction = chat.data.choices[0].finish_reason == "function_call"

	let content = ""
	// Step 2: Check if ChatGPT wants to use a function
	if(wantsToUseFunction){

        let argumentObj = JSON.parse(chat.data.choices[0].message.function_call.arguments)
		// Step 3: Use ChatGPT arguments to call your function
        /*
		if(chat.data.choices[0].message.function_call.name == "scraper"){
			let argumentObj = JSON.parse(chat.data.choices[0].message.function_call.arguments)
			content = await scraper(argumentObj.keyword)
			messages.push(chat.data.choices[0].message)
			messages.push({
				role: "function",
				name: "scraper", 
				content,
			})
		}
        */
		if(chat.data.choices[0].message.function_call.name == "getTimeOfDay"){
			content = getTimeOfDay()
			messages.push(chat.data.choices[0].message)
			messages.push({
				role: "function",
				name: "getTimeOfDay", 
				content,
			})
		}
	}

	
	// Step 4: Call ChatGPT again with the function response
	let response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo-0613",
		messages,
	});

    if(response){
        console.log(response.choices[0].message.content);
        return response.choices[0].message.content;
    } else {
        return "No se ejecuto la funcion"
    }

}

module.exports = {
    callChatGPTWithFunctions
}