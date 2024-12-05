const { Firestore } = require('@google-cloud/firestore')
const path = require("path");


const collectionNmae = 'predictions'
const serviceAccount = path.resolve("./submissionmlgc-wigunasukmana-7c10662fe9cd.json");
async function getHistories(){
    try {
        const db = new Firestore({
            projectId: "submissionmlgc-wigunasukmana",
            keyFilename: serviceAccount,
        });

        const snapshot = await db.collection(collectionNmae).get();
        const history = [];
        
        snapshot.forEach((doc) => {
            history.push({
                id: doc.id,
                result: doc.data().result,
                suggestion: doc.data().suggestion,
                createdAt: doc.data().createdAt,
            });
        });
        return history;
        
    } catch (error) {
        console.error('Error fetching predictions:', error);
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam mengambil history'
        }).code(400);
    }
}

module.exports = getHistories;