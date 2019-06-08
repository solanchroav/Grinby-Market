//New scheme that configures how data is saved to the server
const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
   nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  }, 
  descripcion: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Data', DataSchema);
