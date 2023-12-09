const { pineconeClient } = require('./PineconeClient');
const dotenv = require('dotenv');
dotenv.config();

async function createPineconeIndex () {
  const client = pineconeClient();
  
    console.log(`Chequeando si existe el indice: "${process.env.PINECONE_INDEX_NAME}"...`);
    const existingIndexes = await client.listIndexes();
    if (!existingIndexes.includes(process.env.PINECONE_INDEX_NAME)) {
      console.log(`Creando indice: "${process.env.PINECONE_INDEX_NAME}"...`);
      const createClient = await client.createIndex({
        createRequest: {
          name: process.env.PINECONE_INDEX_NAME,
          dimension: process.env.VECTOR_DIMENSION,
          metric: "cosine",
        },
      });
      console.log(`Indice creado con el cliente:`, createClient);
      await new Promise((resolve) => setTimeout(resolve, 60000));
    } else {
      console.log(`"Indice ${process.env.PINECONE_INDEX_NAME}" ya existe`);
    }
  };

  module.exports = {
    createPineconeIndex
  }