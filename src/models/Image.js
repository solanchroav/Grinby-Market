const { Schema, model } = require('mongoose');


const imageSchema = new Schema({
    title: {type: String},
    description: {type: String},
    price: {type: String},
    filename: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: { type: Number},
    member: {type: String, required: true},
    brand: {type: String, required: true},
    created_at: {type: Date, default: Date.now()}
});

module.exports = model('Image', imageSchema);

//Reference for the future

/*const ObjectId = Schema.ObjectId;
const path = require('path');
Schema
comerce_id: {type: ObjectId}*/