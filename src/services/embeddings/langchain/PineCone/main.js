const { PineconeClient } = require('@pinecone-database/pinecone');
const { DirectoryLoader } = require('langchain/document_loaders/fs/directory');
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const { createPineconeIndex } = require('./createPineconeIndex');
const { updatePinecone } = require('./updatePinecone');
const { queryPineconeVectorStoreAndQueryLLM } = require('./queryPineconeAndQueryGPT');

const dotenv = require('dotenv');
dotenv.config();


// 7. Set up DirectoryLoader to load documents from the ./documents directory

async function main(question){

    console.log('llego a ask: ' + question);

    const loader = new DirectoryLoader("../../PDFs", {
        ".pdf": (path) => new PDFLoader(path),
    });
    const docs = await loader.load();
    // 8. Set up variables for the filename, question, and index settings
    //const question = "que tratamientos brinda la clinica?";
    
    const indexName = "clinica";
    const vectorDimension = 1536;
    // 9. Initialize Pinecone client with API key and environment

    console.log(process.env.PINECONE_API_KEY);
    console.log(process.env.PINECONE_ENVIROMENT);

    const client = new PineconeClient();
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIROMENT,
    });

    console.log(client);
    // 10. Run the main async function

    // 11. Check if Pinecone index exists and create if necessary
      await createPineconeIndex(client, indexName, vectorDimension);
    // 12. Update Pinecone vector store with document embeddings
      await updatePinecone(client, indexName, docs);
    // 13. Query Pinecone vector store and GPT model for an answer
      await queryPineconeVectorStoreAndQueryLLM(client, indexName, question);
}

module.exports={
  main
}

//(async () => {
//  await askModelWithEmbeddigs('Quien es la dueña de la clinica?');
//})();