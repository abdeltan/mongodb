const express = require('express');
const { connecter } = require('./bd/connect');
const routesUtilisateur = require("./route/utilisateur");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/v1", routesUtilisateur);
 

//connection
connecter("mongodb://127.0.0.1:27017/",(erreur) => {
    if (erreur){
        console.log("Error lors de la connexion avec la base de données")
        process.exit(-1);
    }else{
        console.log("Connexion etablie");
        app.listen(3000);
        console.log("attentes des requette")
    }
});

