const process = require('../shared/processMessage');
const modelMessageWhatsapp = require('../shared/whatsappModels');
const whatsappService = require('../services/whatsappService');
const MetaAPIMedia = require('../services/Meta-API-Media');
const whisper = require('../services/whisper-Service');

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

    if (typeMessage == 'text') {
        text = (messages['text'])['body'];
    }
    else if(typeMessage == 'audio'){

        let idAudio = (messages['audio'])['id'];

        let url = await MetaAPIMedia.getUrlMedia(idAudio);

        let binaryAudio = await MetaAPIMedia.getBinaryAudio(url);

        let transcription = await whisper.getTranscription(binaryAudio);

        console.log(transcription);

        text = transcription
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
