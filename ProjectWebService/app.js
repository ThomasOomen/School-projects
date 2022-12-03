const express = require('express');
const mongoose = require("mongoose");
const router = require("./router");
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const app = express();
        app.use(cors())
        app.use(express.json());
        app.use("/", router);
            app.listen(process.env.PORT || 8000, () => {
                console.log("server has started on port " + process.env.PORT);
            })  
    })
