const mongoose = require('mongoose')

let CTFAdminSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        username: String,
        password: String,
        
    }
)