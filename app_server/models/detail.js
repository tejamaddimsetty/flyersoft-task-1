const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    gender: {
        type: String,
        required: true
    }
  });

  mongoose.model('Details', detailSchema);