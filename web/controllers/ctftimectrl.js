var request = require('request');
const middleware = require('../middlewares/middlewares')
const CTFTime = require('../models/CTFTime')
const CTFTeam = require('../models/CTFTeam')

module.exports = {
    getContest: (async (req,res)=>{
        CTFTime.find({}).then(result=>{
            if(result){
                res.send(result)
            }
            else {
                res.status(404).send("Error")
            }
        })
    }),
    registerContest: async (req,res) =>{
       let {token,id} = req.body
       console.log(token + id)
       if(token&&id){
           let author_id = middleware.withAuth(token)._id
            if(author_id){
                await CTFTeam.findOne({members:author_id}).then(team=>{
                    return team.addContest(id).then(result=>{
                        res.send(result)
                    })
                })
            }
            else {

                res.status(401).send("Error")
            }
       } 
       else res.status(404).send("Error")
    },
    getAll:  (async (req, res) => {
       

        let startTime = Math.floor(Date.now() / 1000)
        console.log(startTime)
        let finishTime = startTime + 90 * 24 * 3600
        let limit = 50
        let url ='https://ctftime.org/api/v1/events/?limit=' + limit.toString() + '&start=' + startTime.toString() + '&finish=' + finishTime;
        request.get(url, async (err, response, body) => {

            // let arrRes = []
            // if (!err && body) {
            //     let data = JSON.parse(body);
            //     await data.map((event) => {
            //         let resp = {
            //             id: event.id,
            //             name: event.title,
            //             url: event.url,
            //             onsite: event.onsite,
            //             format: event.format,
            //             weight: event.weight,
            //             time: event.start,
            //         }
            //         arrRes.push(resp)
            //         console.log(event)
            //     })

            // 
            res.send(body);
        })
    }),
    addContest: (req,res,)=>{
        let contest = req.body
        console.log(contest)
        if(contest){
           if(contest.name&&contest.point&&contest.duration){
            CTFTime(contest).save((err,response)=>{
                if(response){
                    res.send(response)
                }
                else {
                    res.status(401).send("Error")
                }
            })
           }else {
            res.status(404).send("Error")
        }
        } else {
            res.status(404).send("Error")
        }
    }
}