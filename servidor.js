const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()
app.use(express.json())

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})
const userModel = mongoose.model('contas', userSchema)

if(process.env.NODE_ENV == 'PROD'){
    dotenv.config({path: './config/.env.prod'})
}

if(process.env.NODE_ENV == 'DEV'){
    dotenv.config({path: './config/.env.dev'})
}


mongoose.connect(process.env.DB)
  .then(()=>{

    app.post('/get', async (req,res)=>{
    const usuarioEncontrado = await userModel.findOne(req.body)
    res.send(usuarioEncontrado)
    })

    app.post('/create', async (req,res)=>{
    const usuarioCriado = await userModel.create(req.body)
    res.send(usuarioCriado)
    })

    app.put('/put', async (req,res)=>{
     const {email, password} = req.body 
    const usuarioAtualizado = await userModel.findOneAndUpdate(
        {email, password},
        {email: req.body.newEmail, password: req.body.newPassword})

    res.send(usuarioAtualizado)
    })

    app.delete('/delete', async (req,res)=>{
    const usuarioEncontrado = await userModel.findOne(req.body)
    await modelodeUsuario.deleteOne(req.body, {returnDocument: 'before'})
    res.send(usuarioEncontrado)
    })

    app.listen(3030)
  })




