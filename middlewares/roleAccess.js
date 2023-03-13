

const checkRoleAccess=(permittedRole)=>{
    return (req,res,next)=>{
        const role=req.user.role

        if(permittedRole.includes(role)){
            next()
        }else{
            res.send({msg:"Access Denied"})
        }
    }
}

module.exports={
    checkRoleAccess
}