const express = require("express");
const app = express();
app.use(express.json());




var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'yousuf',
        database: 'yousuf'
    }
});


knex.schema.hasTable('student_marks').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('student_marks', function(t) {
        t.increments('id').primary();
        t.string('math', 100);
        t.string('english', 100);
        t.string("science",100)
        t.string("history",100)
        // t.text('bio');
      });
    }
  });


app.post("/student_info", (req, res) => {
    res.send(req.body)
    knex("student_info").insert(req.body).then(() => {
        console.log("data ifro insert success");
    }).catch((err) => {
        console.log(err);
    })


})


app.post("/student_marks", (req, res) => {
    res.send(req.body)
    knex("student_marks").insert(req.body).then(() => {
        console.log("data marks insert success");
    }).catch((err) => {
        console.log(err);
    })


})

app.post("/join/:id",(req,res)=>{
    knex.select('*').from('student_info')
    .leftJoin('student_marks', 'student_info.id', 'student_marks.id')
    .where("student_info.id",req.params.id)
    .then((data)=>{
        res.send(data)
        console.log(data);
     
    }).catch((err)=>{res.send(err)})  
    
})


app.listen(5000, () => {
    console.log("server is running at 5000: ");
})