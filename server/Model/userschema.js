const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    city: {
        type: String,
        require: true,
    },
    pass:{
        type: String,
        require: true
    }

})

const mernprac= new mongoose.model("mernprac", userSchema);
module.exports =mernprac;