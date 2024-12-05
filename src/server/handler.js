const predictClassification = require('../services/inferenceService');
const getHistories = require('../services/getHistories');
const storeData = require('../services/storeData')
const crypto = require('crypto');
const path = require('path');
 
async function postPredictHandler(request, h) {

  const { image } = request.payload;
  const { model } = request.server.app;

  if(checkFileType(image)){
    const response = h.response({
        status: 'fail',
        message: 'Terjadi kesalahan dalam melakukan prediksi',
      })
      response.code(400);
      return response;
  }
 
  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
 
  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt
  }

  console.log("storing data")
  await storeData(id, data);
 
  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data
  })
  response.code(201);
  return response;
}

function checkFileType(file) {
    const filetypes = /jpeg|jpg|gif/;
    const extname = file && file.hapi ? file.hapi.filename.split('.').pop() : '';
    const mimetype = file && file.hapi ? file.hapi.headers['content-type'] : '';
    
    const extnameMatch = filetypes.test(extname.toLowerCase());
    const mimetypeMatch = filetypes.test(mimetype);
    
    return extnameMatch && mimetypeMatch;
}

async function getHistoryHandler(request, h) {
    const history = await getHistories();
    
    const data = history.map(item => ({
        id: item.id,
        history: {
            result: item.result,
            suggestion: item.suggestion,
            createdAt: item.createdAt,
            id: item.id,  
        }
    }));
        
        const response = h.response({
            status: 'success',
            data
        })
    response.code(200);
    return response;
}
module.exports = { postPredictHandler, getHistoryHandler };