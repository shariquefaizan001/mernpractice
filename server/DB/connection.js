
const mongoose = require('mongoose');

db= "mongodb+srv://mernprac:mernprac@cluster0.bivivlo.mongodb.net/mernprac?retryWrites=true&w=majority";


mongoose.connect(db, {
  useNewUrlParser: true
})
.then(() => console.log('MongoDB connected '))
.catch(err => console.log(err));