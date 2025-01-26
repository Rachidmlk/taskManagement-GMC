import express from 'express'
import connectDB from '../utils/db.mjs'
import session from 'express-session'
import passport from 'passport'
import bcrypt from 'bcrypt'
import User from '../schemas/user.mjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000
app.use(express.static('../client/public'))
app.use(express.json())
connectDB()



// --------Login-------

app.post('/api/signup', async (req, res)=>{
    const {username, email, password} = req.body
    try{
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({username, email, password: hashedPassword}) 
        await newUser.save()
        res.status(201).json({ message: 'User created successfully' })

    }
    catch(e){
        res.status(500).send(e)
    }
    
})

app.post('/api/login', async(req, res)=>{
    const {username, password} = req.body
    try{
    const user = await User.findOne({username})
    
    if(!user) {
        return res.status(401).send('User Not Found!')
    }
    const validPassword = await bcrypt.compare(password, user.password)
    
    if(!validPassword){ 
        return res.status(401).send({message: 'Invalid Password!'})
    }
    }
    catch(e){
        console.log(e);
        
    }
    const user = {username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken})
    
})

app.use(authenticateToken, (req, res, next)=>{
    if(!req.user) return res.status(403).send({message: 'Not Authorizedd!'})
    next()    
})

// ------Tasks--------

app.get('/api/tasks', (req, res)=>{
    console.log('hi');
    res.status(200).send('get')
    
})
app.post('/api/tasks', (req, res)=>{
    console.log('hi');
    res.status(200).send('post')
    
})
app.put('/api/tasks', (req, res)=>{
    console.log('hi');
    res.status(200).send('put')
    
})
app.delete('/api/tasks', (req, res)=>{
    console.log('hi');
    res.status(200).send('delete')
    
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send({message: 'No token!'})
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
    next()    
    })    
}

app.listen(PORT, ()=>{
    console.log('server is running on port: ', PORT);
    
})