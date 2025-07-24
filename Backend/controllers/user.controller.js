const userModel =require('../model/user.model');
const userService =require('../services/user.service');
const {validationResult} =require('express-validator')


module.exports.registerUser =async(req,res,next)=>{
   const errors =validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});

   }
   console.log(req.body);
   
try{


   const{ fullname, email, password}=req.body;
   
    if (!fullname || !fullname.firstname || !fullname.lastname) {
      return res.status(400).json({ message: "fullname with firstname and lastname is required" });
    }
   const hashPassword =await userModel.hashPassword(password);
   
   const user =await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password:hashPassword
   });
    const token =user.generateAuthToken();
    res.status(201).json({token,user});


}catch(err){
    next(err)
}
}

module.exports.loginUser =async(req,res,next)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} =req.body;
    const user =await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:"invalid email or password"});
    }
    const isMatch =await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:"invalid email or password"});

    }
    const token =user.generateAuthToken();
    res.status(200).json({token,user});
}