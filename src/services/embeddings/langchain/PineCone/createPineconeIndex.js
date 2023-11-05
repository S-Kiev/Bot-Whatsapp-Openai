const { pineconeClient } = require('./PineconeClient');
const dotenv = require('dotenv');
dotenv.config();

async function createPineconeIndex () {
  // 1. Initiate index existence check
  const client = pineconeClient();
  
    console.log(`Chequeando si existe el indice: "${process.env.PINECONE_INDEX_NAME}"...`);
  // 2. Get list of existing indexes
    const existingIndexes = await client.listIndexes();
  // 3. If index doesn't exist, create it
    if (!existingIndexes.includes(process.env.PINECONE_INDEX_NAME)) {
  // 4. Log index creation initiation
      console.log(`Creando indice: "${process.env.PINECONE_INDEX_NAME}"...`);
  // 5. Create index
      const createClient = await client.createIndex({
        createRequest: {
          name: process.env.PINECONE_INDEX_NAME,
          dimension: process.env.VECTOR_DIMENSION,
          metric: "cosine",
        },
      });
  // 6. Log successful creation
      console.log(`Indice creado con el cliente:`, createClient);
  // 7. Wait 60 seconds for index initialization
      await new Promise((resolve) => setTimeout(resolve, 60000));
    } else {
  // 8. Log if index already exists
      console.log(`"Indice ${process.env.PINECONE_INDEX_NAME}" ya existe`);
    }
  };

  module.exports = {
    createPineconeIndex
  }