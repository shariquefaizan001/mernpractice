const express = require("express");
const bodyparser = require('body-parser');
const router = express.Router();
const mernprac = require("../Model/userschema");
const { model } = require("mongoose");


//   register api

router.post("/register",  async (req, res) => {
    // extract data from request
    const { email, username,  pass, city} = req.body;
    //     // console.log(req.body)

    // validate request
    if (!email || !username || !pass || !city ) {
        //     // if (email || username || mobilenumber || age || adress)
        return res.status(404).json(" Please fill  all the data");
    }

    // if request is valid
    try {
        // check if the user already exists
        const preuser = await mernprac.findOne({ email: email });
        console.log(preuser);

        if (preuser) {
             res.status(404).json(" Already Registered user ");
        } else {
            // register new user
            const adduser = new mernprac({
                email, username,city,pass
            });
            await adduser.save();
            res.status(201).json(adduser);
            // res.status(201).json(adduser ,{status:true, msg :"  Data matcghed login...."} );
            console.log(adduser)
        }
    }
    catch (error) {
        res.status(404).send(error)
    }
})


// getdata routes

router.get("/getdata", async (req, res) => {
    try {
        const userdata = await mernprac.find();
       return  res.status(201).json(userdata);

    } catch (error) {
        res.status(422).send(error)
    }
})




module.exports=router;