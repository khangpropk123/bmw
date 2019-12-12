const mongoose = require('mongoose')

let CTFUserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        username: String,
        password: String,
        
    }
)
// CTFUserSchema.methods.follow = function (user_id) {
//     if (this.following.indexOf(user_id) === -1) {
//         this.following.push(user_id)        
//     }
//     return this.save()
// }
// CTFUserSchema.methods.addPoint = function (point){
//     this.point = this.point + point
//     return this.save()
// }
// CTFUserSchema.methods.subPoint = function (point){
//     this.point = this.point - point
//     return this.save()
// }
// CTFUserSchema.methods.setPermission = function (){
//     let permit = false
//     if(!this.post_permission){
//         permit=true
//     }
//     this.post_permission=permit
//     return this.save()

// }
// CTFUserSchema.methods.addFollower = function (fs) {
//     this.followers.push(fs)        
// }
module.exports = mongoose.model('CTFUser', CTFUserSchema)