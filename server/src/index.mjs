import express from 'express'
import connectDB from '../utils/db.mjs'
import session from 'express-session'
import passport from 'passport'
import bcrypt from 'bcrypt'

const app = express()

const PORT = process.env.PORT || 3000
app.use(express.static('../client/public'))
app.use(express.json())
connectDB()

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

app.listen(PORT, ()=>{
    console.log('server is running on port: ', PORT);
    
})