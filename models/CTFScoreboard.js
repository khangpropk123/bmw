// const mongoose = require('mongoose')

// let CTFScoreboardSchema = new mongoose.Schema(
//     {
//         name: String,
//         teams: [
            
//         ]
//     }
// )
// CTFScoreboardSchema.methods.follow = function (user_id) {
//     if (this.following.indexOf(user_id) === -1) {
//         this.following.push(user_id)        
//     }
//     return this.save()
// }
// CTFScoreboardSchema.methods.addMember = function (id){
//     if (this.members.indexOf(id) === -1) {
//         this.members.push(id)        
//     }
//     return this.save()
// }
// CTFScoreboardSchema.methods.subPoint = function (point){
//     this.point = this.point - point
//     return this.save()
// }
// CTFScoreboardSchema.methods.setPermission = function (){
//     let permit = false
//     if(!this.post_permission){
//         permit=true
//     }
//     this.post_permission=permit
//     return this.save()

// }
// CTFScoreboardSchema.methods.addFollower = function (fs) {
//     this.followers.push(fs)        
// }
// module.exports = mongoose.model('CTFScoreboard', CTFScoreboardSchema)