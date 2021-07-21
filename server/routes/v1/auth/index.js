import express from 'express'
import passport from 'passport'
import '../../../config/passport/index.js'
const router = express.Router()



router.get("/", (req, res)=>{
    if(req.user){
        res.json({
            isLoggedSuccess : true,
            isUser : true,
            ...req.user,
        })
    }else{
        res.json({
            isLoggedSuccess : false,
            isUser : false,
        })
    }
})



router.get("/login", passport.authenticate('google', { scope: ['profile', 'email'] }))



router.get("/oauth-redirect/",passport.authenticate('google', { failureRedirect: '/accessdenied' }),(req,res)=>{
    res.redirect("https://tic-tac-toe-frontend-riyazurrazak.vercel.app/lobby")
})


router.get("/accessdenied", (req,res)=>{
    res.json({
        isLoginSuccess : false,
        isLogin : false,
        user : null,
        isError : true,
    })
})

router.get('logout', (req,res)=>{
    req.session = null
    req.logout()
    res.json({
        isLogout : true,
    })
})

export default router