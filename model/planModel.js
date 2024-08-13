const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    owner_name:{
        type: String, 
    }, plan: { 
        type: String,
    },
    price: { 
        type: Number,
    },
    feature: {
        type: [String], 
        required: true
    },   
    number_of_rooms: { 
        type: String, 
    },
    location: { 
        type: String, 
    },
    minmum_num_days: { 
        type: String, 
    },
    maximum_num_days: { 
        type: String, 
    },number_of_beds:{
        type: String, 
    }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
