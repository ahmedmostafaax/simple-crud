import mongoose from "mongoose"


export const dbconecction = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/MVC').then(()=>{
        console.log('database is connect');
    }).catch(err=>{
        console.log(err);
    })   
}