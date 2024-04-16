//requires

const express=require('express');
const mysql=require('mysql2');
const cors=require('cors');

//imports
const mysql_config = require('./imp/mysql_config');
const functions = require('./imp/functions');

//Variáveis para disponibilidade e versionamento

const API_AVAILABILITY = true;
const API_VERSION = '1.0.0';

// iniciar servidor 

const app= express();

app.listen(3000,()=>{
    console.log("API executando");
})

//verificar disponibilidade da API 

app.use((req,res,next)=>{
    if(API_AVAILABILITY){
        next()
    }
    else{
        res.json(functions.response('Atenção!','API está em manutenção. Desculpe.',0,null));

    }
})

//conexão com mysql

const connection = mysql.createConnection(mysql_config);

//cors

app.use(cors());

//rotas
//rota inicial 

app.get('/',(req,res)=>{
    res.json(functions.response("Sucesso","API ok",0,null))
})
//endpoint
//rota para consulta completa
app.get('/tasks',(req,res)=>{
    connection.query('SELECT * FROM tasks',(err,rows)=>{
        if(!err){
            res.json(functions.response("Sucesso","Tudo ok",rows.length,rows))
        }
        else{
            res.json(functions.response('Erro',err.message,0,null))
        }
    })
})



//tratar erro de rota

app.use((req,res)=>{
    res.json(functions.response('Atenção!','Rota não encontrada',0,null))
})