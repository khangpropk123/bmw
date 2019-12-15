const mongoose = require('mongoose')

let CTFTeamSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'CTFUser'  
        },
        name: String,
        description:String,
        point: Number,
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'CTFUser'
            }
        ],
        contest: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'CTFTime'
        },
        secretkey: String,
        token:String,
    }
)
CTFTeamSchema.methods.addMember = function (id){
    if (this.members.indexOf(id) === -1) {
        this.members.push(id)        
    }
    return this.save()
}
CTFTeamSchema.methods.addContest = function (id){
  this.contest = id
    return this.save()
}
CTFTeamSchema.methods.addPoint = function (point){
    this.point = this.point + point
    return this.save()
}
CTFTeamSchema.methods.subPoint = function (point){
    this.point = this.point - point
    return this.save()
}
module.exports = mongoose.model('CTFTeam', CTFTeamSchema)