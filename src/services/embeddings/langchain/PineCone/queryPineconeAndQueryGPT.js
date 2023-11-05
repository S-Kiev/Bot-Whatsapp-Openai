// 1. Import required modules
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { OpenAI } = require('langchain/llms/openai');
const { loadQAStuffChain } = require('langchain/chains');
const { Document } = require('langchain/document');
const { pineconeClient } = require('./PineconeClient');
const dotenv = require('dotenv');
dotenv.config();


// 2. Export the queryPineconeVectorStoreAndQueryLLM function
async function queryPineconeVectorStoreAndQueryLLM ( textUser ) {

  const client = pineconeClient();

  console.log(client);

// 3. Start query process
  console.log("Consultando la base de datos vectorial de Pinecone...");
// 4. Retrieve the Pinecone index
  const index = client.Index(process.env.PINECONE_INDEX_NAME);
  console.log(process.env.PINECONE_INDEX_NAME);
// 5. Create query embedding
  const queryEmbedding = await new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  }).embedQuery( textUser );

  console.log(queryEmbedding);
// 6. Query Pinecone index and return top 10 matches
  let queryResponse = await index.query({
    queryRequest: {
      topK: 10,
      vector: queryEmbedding,
      includeMetadata: true,
      includeValues: true,
    },
  });

  console.log(queryResponse);
// 7. Log the number of matches 
  console.log(`Fueron encontrados ${queryResponse.matches.length} matches...`);
// 8. Log the textUser  being asked
  console.log(`Realizando consulta: ${textUser }...`);
  if (queryResponse.matches.length) {
// 9. Create an OpenAI instance and load the QAStuffChain
    const llm = new OpenAI({ 
        openAIApiKey: process.env.OPENAI_API_KEY,
    });
    const chain = loadQAStuffChain(llm);
// 10. Extract and concatenate page content from matched documents
    const concatenatedPageContent = queryResponse.matches
      .map((match) => match.metadata.pageContent)
      .join(" ");
// 11. Execute the chain with input documents and textUser 
    const result = await chain.call({
      input_documents: [new Document({ pageContent: concatenatedPageContent })],
      textUser : textUser ,
    });
// 12. Log the answer
    return result.text;
  } else {
// 13. Log that there are no matches, so GPT-3 will not be queried
    return "Lo siento pero no hay coincidencias con mi base de conocimientos, no tengo una respuesta";
  }
};

module.exports = {
    queryPineconeVectorStoreAndQueryLLM
}