const { Firestore } = require('@google-cloud/firestore')
const path = require("path");

// Path to the service account key file
const serviceAccount = path.resolve("./submissionmlgc-wigunasukmana-7c10662fe9cd.json");
async function storeData(id, data){
    try {
        const db = new Firestore({
            projectId: "submissionmlgc-wigunasukmana",
            keyFilename: serviceAccount,
        });

        const predictCollection = db.collection("predictions");

        // Store data
        await predictCollection.doc(id).set(data);
        console.log(`Data successfully stored with ID: ${id}`);
        return { success: true, id };
  } catch (error) {
    console.error("Error storing data:", error);
    throw new Error("Failed to store data in Firestore.");
  }
}

module.exports = storeData;