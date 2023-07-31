//Carregando módulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require("body-parser")
    const app = express()
    const admin = require("./routes/admin")
    const path = require("path")
    const mongoose = require("mongoose")

// Configurações
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    //Handlebars
        app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        runtimeOptions: {
             allowProtoPropertiesByDefault: false,
            allowProtoMethodsByDefault: false,
        }
    }))
    app.set('view engine', 'handlebars')

    //Mongoose
        mongoose.Promise = global.Promise;
                mongoose.connect('mongodb://127.0.0.1/blogapp', {
                    useNewUrlParser: true, 
                    useUnifiedTopology: true
                }).then(()=> {
                    console.log('Conectado ao mongo')
                }).catch((err)=> {
                    console.log('Erro ao se conectar: ' + err)
                })


    // Public 
        app.use(express.static(path.join(__dirname, "public")))
        
// Rotas
app.use('/admin', admin)
app.get('/posts', (req, res) => {
    res.send('lista de posts')
})

// Outros
const PORT = 8081
app.listen(PORT,() => {
    console.log("Servidor rodando! ")
} )
