import db from "../models/index"
import CRUDServive from "../services/CRUDServive";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', { data: JSON.stringify(data) });
    } catch (e) {
        console.log(e);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let messeage = await CRUDServive.createNewUser(req.body)
    return res.send('dsdssdssd')
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDServive.getAllUser()
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDServive.getUserInfoById(userId)
        return res.render('editCRUD.ejs', {
            user: userData
        })
    } else {
        return res.send("User not found!")
    }
}
let putCRUD = async (req, res) => {
    let data = req.body
    let allUsers = await CRUDServive.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDServive.deleteUserById(id)
        return res.send("delete succeed")
    } else {
        return res.send("delete not found")
    }
}
// object: {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    postCRUD: postCRUD,
    getCRUD: getCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}
