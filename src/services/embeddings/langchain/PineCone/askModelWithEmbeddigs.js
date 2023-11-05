const { PineconeClient } = require('@pinecone-database/pinecone');
const { DirectoryLoader } = require('langchain/document_loaders/fs/directory');
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const { createPineconeIndex } = require('./1-createPineconeIndex');
const { updatePinecone } = require('./2-updatePinecone');
const { queryPineconeVectorStoreAndQueryLLM } = require('./3-queryPineconeAndQueryGPT');

require('dotenv').config();


// 7. Set up DirectoryLoader to load documents from the ./documents directory

async function askModelWithEmbeddigs(question){
    const loader = new DirectoryLoader("../../PDFs", {
        ".pdf": (path) => new PDFLoader(path),
    });
    const docs = await loader.load();
    // 8. Set up variables for the filename, question, and index settings
    //const question = "que tratamientos brinda la clinica?";
    
    const indexName = "clinica";
    const vectorDimension = 1536;
    // 9. Initialize Pinecone client with API key and environment
    const client = new PineconeClient();
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIROMENT,
    });
    // 10. Run the main async function

    // 11. Check if Pinecone index exists and create if necessary
      //await createPineconeIndex(client, indexName, vectorDimension);
    // 12. Update Pinecone vector store with document embeddings
      //await updatePinecone(client, indexName, docs);
    // 13. Query Pinecone vector store and GPT model for an answer
      await queryPineconeVectorStoreAndQueryLLM(client, indexName, question);
}

module.exports={
  askModelWithEmbeddigs
}