const process = require('../shared/processMessage');
const modelMessageWhatsapp = require('../shared/whatsappModels');
const whatsappService = require('../services/whatsappService');
const MetaAPIMedia = require('../services/Meta-API-Media');
const whisper = require('../services/whisper-Service');
const google = require('../services/GoogleAI-Service');

const dotenv = require('dotenv');
dotenv.config();
//const whatsappService = require('../services/whatsappService');

const verifyToken = (req, res) =>{
    try {
        var accessToken = process.env.WHATSAPP_WEBHOOK_KEY;
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];


        if (challenge != null && token != null && token == accessToken) {
            res.send(challenge);
        } else {
            res.status(400).send();
        }

    } catch (error) {
        res.status(400).send();
    }
}

async function recivedMessage (req, res) {
    //console.log(req.body);
    try {
    var entry = (req.body['entry'])[0];
    var changes = (entry['changes'])[0];
    var value = changes['value'];
    var messageObject = value['messages'];


    if (typeof messageObject != 'undefined'){
        var messages = messageObject[0];
        var number = messages['from']; 
        var text = await getTextUser(messages);

        if (text != '') {

            await process.processMessage(text, number);
        } 

        //Seguir desde aqui
    }

    res.send('EVENT_RECEIVED');
    } catch (e) {

    res.send('EVENT_RECEIVED');
    }
}

async function getTextUser (messages) {

    var text = '';
    var typeMessage = messages['type'];

    console.log("-------------------------------------------------------");
    console.log("MENSAJE 1 =>");
    console.log(messages);
    console.log("-------------------------------------------------------");

    if (typeMessage == 'text') {
        text = (messages['text'])['body'];
    }
    else if(typeMessage == 'audio'){

        // 1. obtener el id del mensaje de audio
        let idAudio = (messages['audio'])['id'];
        // 2. Pedir la url del audio en los servidores de Meta
        let url = await MetaAPIMedia.getUrlMedia(idAudio);
        // 3. Obtener el binario del audio
        let binaryAudio = await MetaAPIMedia.getBinaryMedia(url);
        // 4. procesar el audio a formato ogg y enviarlo a whisper
        let transcription = await whisper.getTranscription(binaryAudio);

        // 5. obtener y asignar la transcripción del audio
        console.log(transcription);
        text = transcription

    } else if(typeMessage == 'image' || typeMessage == 'video'){

        let textUser;
        let mediaType;

        if (typeMessage == 'image') {
            textUser = messages.image.caption ? messages.image.caption : null;
            mediaType = 'jpeg';
        }

        if (typeMessage == 'video') {
            textUser = messages.video.caption ? messages.video.caption : null;
            mediaType = 'mp4';
        }


        console.log("Texto del usuario =>");
        console.log(textUser);
       
        console.log("-------------------------------------------------------");
        console.log("MENSAJE 2 =>");
        console.log(messages);
        console.log("-------------------------------------------------------");

        
        // 1. obtener el id del mensaje de imagen
        let idImage = (messages['image'])['id'];
        console.log("idImage =>");
        console.log(idImage);
        // 2. Pedir la url del audio en los servidores de Meta
        let url = await MetaAPIMedia.getUrlMedia(idImage);
        console.log("url =>");
        console.log(url);
        // 3. Obtener el binario de la imagen o video
        let binaryMedia = await MetaAPIMedia.getBinaryMedia(url);
        console.log("binaryMedia =>");
        console.log(binaryMedia);
    
        // 4. procesar la imagen a formato png y enviarlo a google
        let mediaDescription = await google.geminiImageService(binaryMedia, mediaType, textUser, typeMessage);
        console.log("mediaDescription =>");
        console.log(mediaDescription);

        textUser ? text = `El usuario envio una imagen o video con esta consulta ${textUser} y otra IA que analiza imagenes te brinda esta respuesta ${mediaDescription}. Respondele al usuario basado en esa descripcion` : `El usuario envio una imagen o video para saber que hay en ella y otra IA que analiza imagenes te brinda esta descrición: ${mediaDescription}. Respondele al usuario basado en esa descrición`
        
    }
    else {
        text = 'tipo de mensaje no valido';
    }
    //console.log(text);
    return text;
}


module.exports = {
    verifyToken,
    recivedMessage,
}
