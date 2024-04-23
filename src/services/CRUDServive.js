import bcrypt from 'bcryptjs'
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
                phonenumber: data.phonenumber,
            })
            resolve("create new user success")
        } catch (error) {
            reject(error)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findAll({
                raw: true,
            })
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (error) {
            reject(error)
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstname;
                user.lastName = data.lastname;
                user.email = data.email;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.gender = data.gender === "1" ? true : false;
                user.roleId = data.roleId;
                await user.save();
                let allUsers = await db.User.findAll()
                resolve(allUsers)
            } else {
                resolve()
            }
        } catch (error) {
            reject(error)
        }
    })
}
let deleteUserById = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User;
            if (user) {
                await user.destroy({
                    where: { id: userid },
                });
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}