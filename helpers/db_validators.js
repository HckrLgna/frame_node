const Role = require('../models/role');
const User = require('../models/user');


const isValidRole = async( rol = '') =>{
    const existRole = await Role.findOne({rol});
    if(!existRole){
        throw new Error(`Role ${rol} is not registered in the database`);
    }
 }

const isEmailValid = async ( email = '') =>{
    const isEmailExist = await User.findOne({email});
    if(isEmailExist){
        throw new Error(`Email ${email} is already registered`);
    }
}
const isUserExistById = async (id)=>{
    if (mongoose.Types.ObjectId.isValid(id)){
        const existUser = await User.findById(id);
        if(!existUser){
            throw new Error(`This id ${id} does not exist in the database`);
        }
    }else{
        throw new Error(`This id ${id} is not valid`);
    }
}

 module.exports = {
    isValidRole,
    isEmailValid,
    isUserExistById
 }