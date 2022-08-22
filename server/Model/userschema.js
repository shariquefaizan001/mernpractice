const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
// const bcrypt = require('bcryptjs');



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





// hashing password 



userSchema.pre('save', async function(next){
    console.log('flkdsjfl')
    if(this.isModified('pass')){

        this.pass = await bcrypt.hash(this.pass,12);
        console.log("hello ")
    }
    next();
})







const mernprac= new mongoose.model("mernprac", userSchema);
module.exports =mernprac;











// const mongoose = require("mongoose")

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         require: true,
//         unique: true
//     },
//     username: {
//         type: String,
//         require: true,
//         unique: true
//     },
//     city: {
//         type: String,
//         require: true,
//     },
//     pass:{
//         type: String,
//         require: true
//     }

// })

// const mernprac= new mongoose.model("mernprac", userSchema);
// module.exports =mernprac;