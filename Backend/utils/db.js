const mongoose = require('mongoose');

// URI ="mongodb://127.0.0.1:27017/skill_swap";
URI ="mongodb+srv://user:mongodbuser@cluster0.hwpnv2w.mongodb.net/skill_swap?retryWrites=true&w=majority&appName=Cluster0";


const connectDB = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("Connect is succesfully");
    } catch (error) {
        console.error("error is occur "+error); 
    }
};  

module.exports = connectDB ;