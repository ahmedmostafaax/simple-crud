import express from 'express'
import { dbconecction } from './database/dbconecction.js'
import path from "path"
import { userModel } from './database/models/user.model.js'
const app = express()
const port = 4000
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.set('views','viewess')
app.set('view engine', 'ejs');


//add user
app.post('/addUser', async(req,res)=>{

    await userModel.insertMany(req.body)
    res.redirect('/')
})

//delete user 
app.get('/delete/:id' , async(req,res)=>{
    await userModel.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

app.get('/', async(req,res)=>{

    let users = await userModel.find()

    res.render('index.ejs',{name:"ahmed",users})
})
 
//update user
app.get('/update/:id', async(req,res)=>{
    let user = await userModel.findById(req.params.id)
    res.render('update.ejs', {user} )
})

//handel update
app.post('/handelUpdate/:id' , async(req,res)=>{
    
    await userModel.findByIdAndUpdate(req.params.id , req.body)    
    res.redirect('/')
})
 

dbconecction()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))