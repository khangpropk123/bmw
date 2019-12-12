const middleware = require('../middlewares/middlewares')
const CTFUser = require('../models/CTFUser')
const CTFTeam = require('../models/CTFTeam')
module.exports = {
    getAllTeam:(req,res)=>{
        CTFTeam.find({}).sort({point:-1}).then(result=>{
            if(result){
                res.send(result)
            }
            else {
                res.status(404).send("Error")
            }
        })
    },
    addPointTeam:(req,res)=>{
        let form = req.body
        if(form.point&&form.team_id&&form.token){
            let id = middleware.withAuth(form.token)._id
            try {
                CTFUser.findById(id).then(admin=>{
                    console.log(admin)
                    if(admin && admin.username==='admin'){
                        CTFTeam.findById(form.team_id).then(team=>{
                            return team.addPoint(Number(form.point)).then(result=>{
                                if(result) res.send(result)
                                else res.status(404).send("Error")
                            })
                        })
                    }
                    else {
                        res.status(401).send("Error")
                    }
                })
            } catch (error) {
                res.status(401).send("Error")
            }
        }
        else {
            res.status(404).send("Error")
        }
    },
    getTeam:(req,res)=>{
        let token = req.body
        console.log(token)
        if(token){
            let id = middleware.withAuth(token.token)._id
            if(id){
                CTFTeam.findOne({members:id})
                .populate("members",{password:0})
                .exec((err,result)=>{
                    if(result){
                        res.send(result)
                    }
                    else {
                        res.status(404).send("Error")
                    }
                })
            }
            else {
                res.status(401).send("Error")
            }
        } else {
            res.status(401).send("Error")
        }
    },
    addTeam: (req,res)=>{
        let form = req.body
        if(form.name && form.secretkey){
            let auth = middleware.withAuth(form.token)
      console.log(form)
      if(auth._id === form.creator){
          let team = {
              creator: form.creator,
              name: form.name,
              description: form.description,
              point:0,
              members: [form.creator],
              //contest:'5dcbaadc6864972b925505a1',
              secretkey: form.secretkey,
              token: form.token
          }
          console.log(team)
        CTFTeam(team).save((err,result)=>{
            if(result){
                CTFTeam.findById(result._id)
                .populate('members')
                .exec((err,teamData)=>{
                    res.send(teamData)
                })
            }
            else{
                res.status(404).send('Error')
            }
        })
      }
      else {
          res.status(401).send("Error")
      }
        }
        else {
            res.status(404).send("Error")
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
               
            }}},
    joinTeam:  (req,res)=>{
        let form = req.body
        console.log(form)
        if(form.token&&form.name&&form.secretkey) {
            let id = middleware.withAuth(form.token)._id
            if(id === form.id){
                CTFTeam.findOne({name:form.name}).then(result=>{
                    console.log(result)
                    if(!result) return res.status(404).send("Error")
                    if(result.secretkey===form.secretkey){
                        return result.addMember(id).then(team=>{
                            res.send(team)
                        })
                    }
                    else res.status(400).send("Error")
                })
            }
            else {
                res.status(401).send("Error")
            }
        }
        else res.status(404).send("Error")
    }  
}