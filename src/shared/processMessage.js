const whatsappModel = require('../shared/whatsappModels');
const whatsappService = require('../services/whatsappService');
const chatGPT_Service = require('../services/chatGPT-Service');
const { askModelWithEmbeddigs } = require('../services/embeddings/langchain/PineCone/askModelWithEmbeddigs');

async function processMessage(textUser, number) {

    textUser = textUser.toLowerCase();
    var models = [];

    //#region MODELO BASICO DE BOT SIN IA
    /*
    if (textUser.includes('hola')) {
        var model = whatsappModel.messageText('hola, como estas?', number);
        models.push(model);
    }
    else if (textUser.includes('gracias')){
        var model = whatsappModel.messageText('gracias a ti!', number);
        models.push(model);
    }
    else if (textUser.includes('adios') || textUser.includes('chau') || textUser.includes('bye')){
        var model = whatsappModel.messageText('Adios que tengas un gran dia!', number);
        models.push(model);
    }
    else if (textUser.includes('llamar')){
        var model = whatsappModel.messageText('contactalas en: https://santumar.com/', number);
        models.push(model);
    }
    else if (textUser.includes('local')){
        var model = whatsappModel.messageLocation(number);
        models.push(model);
    }
    else if (textUser.includes('telefono')){
        var model = whatsappModel.messageText('*Llamanos al:*\n45266258',number);
        models.push(model);
    }
    else {
        var model = whatsappModel.messageText('Disculpa pero no entiendo lo que dices', number);
        models.push(model);
    }
    //#endregion
    */
    //#region CON 

    if (textUser.includes('consulta')){

        const resultChatGPTWithEmbeddings = await askModelWithEmbeddigs(textUser);

        if(resultChatGPTWithEmbeddings != null){
            var model = whatsappModel.messageText(resultChatGPT, number);
            models.push(model);
        }
        else {
            var model = whatsappModel.messageText("Lo siento pero parece que algo ha salido mal, intentalo mas tarde", number);
            models.push(model);
        }
    } else {
        
        const resultChatGPT = await chatGPT_Service.getMessageChatGPT(textUser);

        if(resultChatGPT != null){
            var model = whatsappModel.messageText(resultChatGPT, number);
            models.push(model);
        }
        else {
            var model = whatsappModel.messageText("Lo siento pero parece que algo ha salido mal, intentalo mas tarde", number);
            models.push(model);
        }
    }
    

    
    //#endregion
    models.forEach(model => {
        whatsappService.sendMessageWhatsapp(model);        
    });
};

module.exports = {
    processMessage
};