module.exports={
    isLoggedIn: function (req,res,next)
    {
        if (req.isAuthenticated())  
        return next();
    res.redirect('/');
    },

    // ensureGuest:function (req,res,next)
    // {
    //     if(req.user.isAuthenticated())
    //     {
    //         res.redirect('/dashboard')
    //     }
    //     else{
    //         return next()
    //     }
    // },
 }