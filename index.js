const express = require("express");
const app = express();
const connection = require("./database/database")
// Responsavel por traduzir os dodos do formulario em uma estrutura js
const bodyParser = require("body-parser");
// Estou dizendo para o express usar o ejs com View engine
const pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");


app.set('view engine', 'ejs');

app.use(express.static('public'));



//Database 
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgError) => {
        console.log(msgError);
    })

// Body parser 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get("/", function(req, res) {
    pergunta.findAll({ raw: true, order: [['id', 'DESC']] }).then(perguntas => {
        res.render("index", {perguntas: perguntas});
    });
    
});

app.get("/perguntar", function(req, res) {
    res.render("perguntar");
});

app.post("/salvarpergunta", function(req, res){
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
})

app.get("/pergunta/:id", (req ,res) => {
    var id = req.params.id;
    pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined) {

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[
                    ["id", "DESC"]
                ]
            }).then(resposta =>{
                res.render("pergunta", {
                    pergunta: pergunta,
                    resposta: resposta
                });
            });

        }else {
            res.redirect("/");
        }
    });

})

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId,
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });

});

app.listen(8080, () => {
    console.log("Run app!");
});