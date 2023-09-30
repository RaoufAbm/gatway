const express = require("express");
const Parser = require("body-parser");
const bodyParser = require("body-parser");
const mysql=require("mysql2")
const app =express()
const port =process.env.POTT || 5000
// const db =require('./config/database');
// const modelexpor =require('./models/index')
const cors =require("cors")
app.use( bodyParser.urlencoded({extended:true}))
app.use( bodyParser.json())

app.use(cors())






///////////////////////CNX SQL//////////////////
const db2 = mysql.createConnection({
  host: "91.134.151.72",
  user: "brzukxvw_STS",
  password: "6$bT~{h8PgAf",
  database: "brzukxvw_GSTS"
});


app.post("/login", (req, res) => {
    const sql = "SELECT  Clients.Host,Clients.bdd,Clients.UserName,Clients.passeword ,Tokens.id from Clients ,Tokens WHERE token=? and Tokens.IDClient=Clients.IDClient;";
    db2.query(sql, [req.headers.authorization],(err,data_)=>{
        
        console.log(data_);
        console.log(data_[0].bdd);
        // const db3 = mysql.createConnection({
        //     host: "91.134.151.72",
        //     user: "brzukxvw_STS",
        //     password: "6$bT~{h8PgAf",
        //     database: "brzukxvw_GSTS"
        //   });
          

return res.json("okk");
    })
  
});
app.listen(port, () => { 
    console.log(`Server is running on port yes `);
  })