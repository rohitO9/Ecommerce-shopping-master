const express = require("express")
const app = express()
const cors = require("cors");
const mongoose  = require("mongoose");
const authRoutes = require("../server/middlewares/auth")
require('dotenv').config();
const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"));

mongoose
.connect('mongodb://127.0.0.1:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("connected yo mongodb")
})
.catch((err)=>{
    console.log(`Error connecting to MongoDB `,err)
})       

app.use("/account", cors(), authRoutes);
app.use('/api/items', require("./routes/items"))
app.use('/api/payment', cors(), require("./routes/payment"))
app.use("/account",cors(),authRoutes );

app.listen(PORT, console.log("Server is running on port ", PORT))