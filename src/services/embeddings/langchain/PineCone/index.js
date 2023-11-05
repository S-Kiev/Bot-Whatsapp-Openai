const { PineconeClient } = require('@pinecone-database/pinecone');
const { DirectoryLoader } = require('langchain/document_loaders/fs/directory');
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const { createPineconeIndex } = require('./createPineconeIndex');
const { updatePinecone } = require('./updatePinecone');
const { queryPineconeVectorStoreAndQueryLLM } = require('./queryPineconeAndQueryGPT');

require('dotenv').config();


// 7. Set up DirectoryLoader to load documents from the ./documents directory

async function main(){
      await queryPineconeVectorStoreAndQueryLLM(client, indexName, question);
}

(async () => {
    await main();
})();