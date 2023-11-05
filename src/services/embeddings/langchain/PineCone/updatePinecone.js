const { OpenAIEmbeddings } = require('langchain/embeddings/openai')
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { pineconeClient } = require('./PineconeClient');
const { DirectoryLoader } = require('langchain/document_loaders/fs/directory');
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const dotenv = require('dotenv');
dotenv.config();


async function updatePinecone () {
  
  const client = pineconeClient();

  const loader = new DirectoryLoader("../../PDFs", {
   ".pdf": (path) => new PDFLoader(path),
  });
  
  const docs = await loader.load();

  console.log("Recuperando datos del inidice de Pinecone...");
// 3. Retrieve Pinecone index
  const index = client.Index(process.env.PINECONE_INDEX_NAME);
// 4. Log the retrieved index name
  console.log(`indice recuperado: ${process.env.PINECONE_INDEX_NAME}`);
// 5. Process each document in the docs array
  for (const doc of docs) {
    console.log(`Procesando documentos: ${doc.metadata.source}`);
    const txtPath = doc.metadata.source;
    const text = doc.pageContent;
// 6. Create RecursiveCharacterTextSplitter instance
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    console.log("Cortando texto en fragmentos...");
// 7. Split text into chunks (documents)
    const chunks = await textSplitter.createDocuments([text]);
    console.log(`Textos divididos en ${chunks.length} fragmentos`);
    console.log(
      `Llamado al endpoint de Embeddings de OpenAI para vectorizar los ${chunks.length} fragmentos...`
    );
// 8. Create OpenAI embeddings for documents
    const embeddingsArrays = await new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
    }).embedDocuments(
      chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
    );
    console.log("Finilizando la incrustación de los embeddings...");
    console.log(
      `Se han creado ${chunks.length} vectores con id, valores, y metadata...`
    );
// 9. Create and upsert vectors in batches of 100
    const batchSize = 100;
    let batch = [];
    for (let idx = 0; idx < chunks.length; idx++) {
      const chunk = chunks[idx];
      const vector = {
        id: `${txtPath}_${idx}`,
        values: embeddingsArrays[idx],
        metadata: {
          ...chunk.metadata,
          loc: JSON.stringify(chunk.metadata.loc),
          pageContent: chunk.pageContent,
          txtPath: txtPath,
        },
      };
      batch.push(vector);
      // When batch is full or it's the last item, upsert the vectors
      if (batch.length === batchSize || idx === chunks.length - 1) {
        await index.upsert({
          upsertRequest: {
            vectors: batch,
          },
        });
        // Empty the batch
        batch = [];
      }
    }
// 10. Log the number of vectors updated
    console.log(`indice de Pinecone creado con ${chunks.length} vectores`);
  }
};

module.exports = {
    updatePinecone
}