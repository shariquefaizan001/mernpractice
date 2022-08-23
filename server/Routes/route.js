const express = require("express");
const bodyparser = require('body-parser');
const router = express.Router();
const mernprac = require("../Model/userschema");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt =require('bcrypt')


//   register api

router.post("/register", async (req, res) => {
    // extract data from request
    const { email, username, pass, city } = req.body;
    //     // console.log(req.body)

    // validate request
    if (!email || !username || !pass || !city) {
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
                email, username, city, pass
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

router.post("/login", async (req, res) => {
    // extract data from request
    const { email, pass } = req.body;
    //     // console.log(req.body)
try{


    // validate request
    if (!email || !pass) {
        //     // if (email || username || mobilenumber || age || adress)
        return res.status(404).json(" Please fill  all the data");
    }

    // if request is valid
    // try {
    // check if the user already exists
    else{
        const preuser = await mernprac.findOne({ email: email });
    const preuserpass=await bcrypt.compare(pass,preuser.pass);
    // const preuserpass = await mernprac.findOne({ pass: pass });
    // console.log(preuserpass);


    if (preuser && preuserpass) {
        
        
        const accessToken = jwt.sign({ data: preuser }, "jwt_secret_password")
        //  res.status(200).json("");
        jwt.verify(accessToken, 'jwt_secret_password', (err, authData) => {
            // const result={accessToken,authData}
            console.log("jwt.verify");
            console.log(accessToken);
            res.json({
                // message: "post created",
                // result
                accessToken
            });
        });
   

    } else {
        res.status(404).json( " login unsuccessful")
                     console.log("Invalid user")
    }
}
}catch(error){
console.log("error")
res.status(404).json("")
}
})



// getdata routes

router.get("/getdata", async (req, res) => {
    try {
        const userdata = await mernprac.find();
        return res.status(201).json(userdata);

    } catch (error) {
        res.status(422).send(error)
    }
})



// get indivisual user data routes

router.get("/singleuserdata/:id", async (req, res) => {
    try {
        console.log(req.params)
        const { id } = (req.params);
        const singleuser = await mernprac.findById({ _id: id });
        console.log(singleuser);
        return res.status(201).json(singleuser);
    } catch (error) {
        res.status(422).send(error)
    }
})



// update user data
router.patch("/userupdate/:id", async (req, res) => {
    try {
        console.log(req.params)
        const { id } = (req.params);
        let email = req.body.email;
        let city = req.body.city;
        let username = req.body.username;
        let pass = req.body.pass;
        const userupdate = await mernprac.findByIdAndUpdate({ _id: id }, { email: email, city: city, username: username, pass: pass })
        res.status(201).json(userupdate)
    } catch (error) {
        res.status(422).json(error)
    }
})


// use delete 
router.delete("/userdatadelete/:id", async (req, res) => {

    try {
        const { id } = (req.params);
        const userdatadelete = await mernprac.findByIdAndDelete({ _id: id });
        res.status(201).json(userdatadelete)

    }
    catch (error) {
        res.status(422).json(error)
    }

})

// search data

router.get("/searchuser/:key", async (req, res) => {
    try {
        const userdetails= await mernprac.find(

            {
                "$or":[
                    {"username":{$in:req.params.key}}
                ]
            }
        );

        console.log(userdetails)
        res.send(userdetails)
     
    } catch (error) {
        res.status(422).send(error)
    }
})



module.exports = router;








































// const express = require("express");
// const bodyparser = require('body-parser');
// const router = express.Router();
// const mernprac = require("../Model/userschema");
// const { model } = require("mongoose");
// const jwt = require("jsonwebtoken")


// //   register api

// router.post("/register", async (req, res) => {
//     // extract data from request
//     const { email, username, pass, city } = req.body;
//     //     // console.log(req.body)

//     // validate request
//     if (!email || !username || !pass || !city) {
//         //     // if (email || username || mobilenumber || age || adress)
//         return res.status(404).json(" Please fill  all the data");
//     }

//     // if request is valid
//     try {
//         // check if the user already exists
//         const preuser = await mernprac.findOne({ email: email });
//         console.log(preuser);

//         if (preuser) {
//             res.status(404).json(" Already Registered user ");
//         } else {
//             // register new user
//             const adduser = new mernprac({
//                 email, username, city, pass
//             });
//             await adduser.save();
//             res.status(201).json(adduser);
//             // res.status(201).json(adduser ,{status:true, msg :"  Data matcghed login...."} );
//             console.log(adduser)
//         }
//     }
//     catch (error) {
//         res.status(404).send(error)
//     }
// })



// //   Login  api

// router.post("/login", async (req, res) => {
//     // extract data from request
//     const { email, pass } = req.body;
//     //     // console.log(req.body)

//     // validate request
//     if (!email || !pass) {
//         //     // if (email || username || mobilenumber || age || adress)
//         return res.status(404).json(" Please fill  all the data");
//     }

//     // if request is valid
//     // try {
//     // check if the user already exists
//     const preuser = await mernprac.findOne({ email: email });
//     const preuserpass = await mernprac.findOne({ pass: pass });
//     console.log(preuser);


//     if (preuser && preuserpass) {
//         //  res.status(200).json();
//         const accessToken = jwt.sign({ data: preuser }, "jwt_secret_password")
//         jwt.verify(accessToken, 'jwt_secret_password', (err, authData) => {
//             // const result={accessToken,authData}
//             console.log("jwt.verify");
//             console.log(accessToken);

//             if (err) {
//                 console.log(err)
//                 res.sendStatus('403')
//             } else {
//                 res.json({
//                     // message: "post created",
//                     // result
//                     accessToken
//                 });
//             }
//         });


//     } else {
//         res.status(404).json(" login unsuccessful")
//     }

// })



// // getdata routes

// router.get("/getdata", async (req, res) => {
//     try {
//         const userdata = await mernprac.find();
//         return res.status(201).json(userdata);

//     } catch (error) {
//         res.status(422).send(error)
//     }
// })



// // get indivisual user data routes

// router.get("/singleuserdata/:id", async (req, res) => {
//     try {
//         console.log(req.params)
//         const { id } = (req.params);
//         const singleuser = await mernprac.findById({ _id: id });
//         console.log(singleuser);
//         return res.status(201).json(singleuser);
//     } catch (error) {
//         res.status(422).send(error)
//     }
// })



// // update user data
// router.patch("/userupdate/:id", async (req, res) => {
//     try {
//         console.log(req.params)
//         const { id } = (req.params);
//         let email = req.body.email;
//         let city = req.body.city;
//         let username = req.body.username;
//         let pass = req.body.pass;
//         const userupdate = await mernprac.findByIdAndUpdate({ _id: id }, { email: email, city: city, username: username, pass: pass })
//         res.status(201).json(userupdate)
//     } catch (error) {
//         res.status(422).json(error)
//     }
// })


// // use delete 
// router.delete("/userdatadelete/:id", async (req, res) => {

//     try {
//         const { id } = (req.params);
//         const userdatadelete = await mernprac.findByIdAndDelete({ _id: id });
//         res.status(201).json(userdatadelete)

//     }
//     catch (error) {
//         res.status(422).json(error)
//     }

// })

// // search data

// router.get("/searchuser/:key", async (req, res) => {
//     try {
//         const userdetails= await mernprac.find(

//             {
//                 "$or":[
//                     {"username":{$in:req.params.key}}
//                 ]
//             }
//         );

//         console.log(userdetails)
//         res.send(userdetails)
     
//     } catch (error) {
//         res.status(422).send(error)
//     }
// })



// module.exports = router;