const tf = require('@tensorflow/tfjs-node');

async function predictClassification(model, image) {
    try{
        console.log("loading image")
    
    imageBuffer = image._data
    const tensor = tf.node
    .decodeImage(imageBuffer, 3) // Decode PNG and ensure 3 color channels (RGB)
    .resizeNearestNeighbor([224, 224]) // Resize image to 224x224
    .expandDims(0) // Add a batch dimension
    .toFloat() // Convert to float

        console.log("tensor created")

    const prediction = model.predict(tensor).dataSync()[0];
    const score = prediction;
        
        console.log("score:", score)

    const classes = ['Cancer', 'Non-cancer'];
    const label = score > 0.5 ? classes[0] : classes[1];
    
    let suggestion;
    
    if (label === 'Cancer') {
        suggestion = "Segera periksa ke dokter!"
    }
    
    if (label === 'Non-cancer') {
        suggestion = "Penyakit kanker tidak terdeteksi."
    }

    return { label, suggestion };
    }
    catch (error) {
        console.error(error);
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi'
        }).code(400);
    }
}

module.exports = predictClassification;