const middleware = require('../middlewares/middlewares')
const CTFUser = require('../models/CTFUser')
module.exports = {
    login: (req,res)=>{
        let user = req.body
        if(user){
            CTFUser.findOne({username:user.userId}).then(userdata=>{
                if(userdata){
                    let hash = middleware.getHash(user.password)
                    if(hash===userdata.password){
                       let respone = {
                           _id:userdata._id,
                           token: middleware.genToken(userdata._id),
                           name: userdata.name,
                           email: userdata.email 
                       }
                       res.status(200).send(respone)
                    }
                    else res.status(401).send({error:true})
                }
                else{
                    res.status(401).send({error: true})
                }
            })
        }
       
    },
    register: (req,res)=>{
        let user = req.body
        if(user){
            if(user.name&&user.email&&user.username&&user.password){
                CTFUser.find({username : user.username}).then(userdata=>{
                    console.log(userdata);

                   
                   if(userdata.length==0) {
                    user.password = middleware.getHash(user.password);
                    CTFUser(user).save((err,data)=>{
                        if(data){
                            let respone = {
                                _id:data._id,
                               token: middleware.genToken(data._id),
                               name: data.name,
                               email: data.email 
                           }
                           res.status(200).send(respone)
                        }
                        else{
                            res.status(401).send("Something wrong")
                        }
                    })
                   }
                   else {
                    res.status(401).send("Username has been taken!")
                   } 
                })
               
            }}}    
}