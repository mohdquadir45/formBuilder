const mongoose = require('mongoose');
module.exports = mongoose.model('FormInput', {
    id:{type:String},
    name: { type: String, },
    title: {type:Number,  },
    placeholder: { type: String },
    value:{type:String}
})