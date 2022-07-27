const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1} = require('uuid');
require('dotenv').config()

function getSecret() {
    const connection_string = process.env.STORAGE_CONNECTION_STRING;
    return connection_string;
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    const AZURE_STORAGE_CONNECTION_STRING = getSecret();

    if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error("Azure Storage Connection string not found");
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerName = "evusheld-ratings-blob";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobName = "incoming/providerName" + uuidv1() + ".txt";
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    console.log("\nUploading to Azure storage as blob:\n\t", blobName);
    // Upload data to the blob
    const data = "Hello, World!";
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    console.log(
        "Blob was uploaded successfully. requestId: ",
        uploadBlobResponse.requestId
        );

    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}