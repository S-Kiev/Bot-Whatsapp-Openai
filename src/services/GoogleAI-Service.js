const { GoogleGenerativeAI } = require('@google/generative-ai');
const { promises } = require('fs');
const os = require('os');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

async function googleImageService (binaryImage) {

    try {
        const tempFilePath = path.join(os.tmpdir(), 'temp_image.png');
    
        // Guardar el binario de audio en un archivo temporal
        await promises.writeFile(tempFilePath, binaryImage);
    
        // 1. Configuracion del modelo
        const geminiAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const geminiConfig = { temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 4096 };
    
        // 2. Inicializar el modelo
        const model = geminiAI.getGenerativeModel({ model: "gemini-pro-vision", geminiConfig });
    
        const response = await generateContent(model, tempFilePath);

        // Borra el archivo temporal después de usarlo
        await promises?.unlink(tempFilePath);

        return response;

    } catch (error) {
        // Borrar de todas formas si la llamada a Gemini sale mal
        await promises?.unlink(tempFilePath);
        console.log(error);
        throw error;
    }


}

async function generateContent(model, tempFilePath) {
    try {
        // Cargar la imagen a base 64
        const imageData = await promises.readFile(tempFilePath);
        const imageBase64 = imageData.toString('base64');

        // Definir las partes
        const parts = [
            { text: "Describe lo que hacen las personas en esta imagen:\n" },
            {
              inlineData: {
                mimeType: "image/png",
                data: imageBase64
              }
            },
          ];

        // Generar el contenido a partir de los inputs de texto e imágenes
        const result = await model.generateContent({ contents: [{ role: "user", parts }] });
        const response = await result.response;
        return response.text();
    } catch (error) {
      console.error('Error generating content:', error);
      return "Ocurrio un error y no se pudo procesar la imagen"
    }
  }

module.exports ={
    googleImageService
}