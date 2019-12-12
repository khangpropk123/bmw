const multipart = require('connect-multiparty')
const multipartWare = multipart()
const ctftimectrl = require('../controllers/ctftimectrl')
const ctfuser = require('../controllers/ctfuser.ctrl')
const ctfteam = require('../controllers/ctfteam.ctrl')


module.exports = (router) => {

    /**
     * get all articles
     */
    router
        .route('/ctf/events/')
        .get(ctftimectrl.getAll)
    router
        .route('/ctf/login/')
        .post(multipartWare,ctfuser.login)
    router
        .route('/ctf/register/')
        .post(multipartWare,ctfuser.register)
    router
        .route('/ctf/add-contest/')
        .post(multipartWare,ctftimectrl.addContest)
    router
        .route('/ctf/add-team/')
        .post(multipartWare,ctfteam.addTeam)
    router
        .route('/ctf/get-team/')
        .post(multipartWare,ctfteam.getTeam)
    router
        .route('/ctf/get-contest/')
        .get(ctftimectrl.getContest)
    router
        .route('/ctf/register-contest/')
        .post(multipartWare,ctftimectrl.registerContest)
    router
        .route('/ctf/join-team/')
        .post(multipartWare,ctfteam.joinTeam)
    router
        .route('/ctf/get-all-team/')
        .get(ctfteam.getAllTeam)
    router
        .route('/ctf/add-point-team/')
        .post(multipartWare,ctfteam.addPointTeam)
}