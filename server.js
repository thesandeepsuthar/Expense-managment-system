const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectdb = require('./config/connectdb');

dotenv.config();

connectdb();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//router
//user routes 
app.use('/api/v1/users', require('./routes/userRoute'));
// transection routes 
app.use('/api/v1/transection',require('./routes/transectionRoute'))


// Correct way to assign PORT value
const PORT =  process.env.PORT|| 5001 ;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
