const { OpenAI } = require('openai');
const dotenv = require('dotenv');
dotenv.config();


async function getMessageChatGPT (text) {

    const openai = new OpenAI({});

      try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                "role": "system",
                "content": "Tu nombre es Lulu, eres un bot asistente de una clinica estetica-medica que brinda varios tratamientos. Eres muy util y profesional ayudando a los miebros de la clinica a buscar información, actualizarla y agendar consultas"
              },
              { "role": "user", 
                 "content": text 
              }
            ],
        });

        
        if (chatCompletion && chatCompletion.choices && chatCompletion.choices.length > 0) {
            console.log(chatCompletion.choices[0].message.content);
            console.log(chatCompletion.choices.length);
            
            return chatCompletion.choices[0].message.content;

        } else {
            console.log("Respuesta de OpenAI inválida o vacía.");
            return null;
        }
      } catch (error) {
        console.error("Error al comunicarse con la API de OpenAI:", error);
        return null;
      }
}

module.exports = {
    getMessageChatGPT
}