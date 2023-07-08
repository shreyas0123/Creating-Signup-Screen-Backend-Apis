const signUpUserDetails = require('../models/signup');

//for eg if we keep email column in form as blank and if i submit data will not be added to the database table (remove required text from signup.html page then only it works)
/*
function isstringvalid(string){
    if(string === undefined || string.length === 0){
        return true;
    }else{
        return false;
    }
} */

exports.adduserDB = async (req,res,next) =>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        console.log('from req.body>>>',name,email,password);

        /*
        if(isstringvalid(name) || isstringvalid(email) || isstringvalid(password)){
            return res.status(400).json({success:false,message:'please fill all the details of the form'});
        } */
        //for eg if we keep email column in form as blank and if i submit data will not be added to the database table (remove required text from signup.html page then only it works)
        if(name ==="" || email ==="" || password === ""){
            return res.status(400).json({success:false,message:"please fill all the details of the form"});
        }

        //if user trying to add existing mail id sending error from backend
        const uniqueEmail = await signUpUserDetails.findAll({where:{email:email}});
        if(uniqueEmail.length !== 0){
            return res.status(400).json({success:false,message:'user already exist,change the Email'})
        }

        const data = await signUpUserDetails.create({
            name:name,
            email:email,
            password:password
        });
        
        
        res.json({success:true,message:'Signup succesfull,login to enter a page'});
    }catch(error){
        console.log('error from adduserdb',error);
        res.json({success:false,message:'user already exist..please signup with new email'});
    }
}