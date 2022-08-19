const express = require("express");
const bodyparser = require('body-parser');
const router = express.Router();
const mernprac = require("../Model/userschema");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken")


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



//   Login  api

router.post("/login",  async (req, res) => {
    // extract data from request
    const {  email,  pass} = req.body;
    //     // console.log(req.body)

    // validate request
    if (!email  || !pass) {
        //     // if (email || username || mobilenumber || age || adress)
        return res.status(404).json(" Please fill  all the data");
    }

    // if request is valid
    // try {
        // check if the user already exists
        const preuser = await mernprac.findOne({ email: email });
        const preuserpass = await mernprac.findOne({ pass: pass });
        console.log(preuser);


        if (preuser  && preuserpass) {
            //  res.status(200).json();
            const accessToken = jwt.sign({ data: preuser},"jwt_secret_password" )
            jwt.verify(accessToken, 'jwt_secret_password', (err, authData) => {
                // const result={accessToken,authData}
                console.log("jwt.verify");
                console.log(accessToken);

                if (err) {
                  console.log(err)
                  res.sendStatus('403')
                } else {
                  res.json({
                    // message: "post created",
                    // result
                    accessToken
                  });
                }
              });
            

            }else {
                     res.status(404).json( " login unsuccessful")
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



// get indivisual user data routes

router.get("/singleuserdata/:id", async (req, res) => {
    try {
        console.log(req.params)
        const { id } = (req.params);
        const singleuser = await mernprac.findById({_id: id});
        console.log(singleuser);
       return  res.status(201).json(singleuser);
    } catch (error) {
        res.status(422).send(error)
    }
})



// update user data
router.patch("/userupdate/:id", async (req, res) => {
    try {
        console.log(req.params)
        const { id } = (req.params);
        console.log(req.body,"bbbbbbbbbbbbbbbbbbbbb")
        let email = req.body.email
        const userupdate = await mernprac.findByIdAndUpdate({_id : id},{ email: email})
        console.log(userupdate,"cccccccccccccccccccccc")
        res.status(201).json(userupdate)
    } catch (error) {
        res.status(422).json(error)
    }
})




module.exports=router;