//connecter avec la base de donneé
const { MongoClient, Db } = require("mongodb");

var client = null;

function connecter(url, callback){
    if(client==null){
        client = new MongoClient(url);

        client.connecter((erreur)=>{
            if(erreur){
                client=null;
                callback(erreur);
            }else{
                callback();
            }
        })
    }else{
        callback();

    }
}

function bd(){
    return new Db(client, "dbOK");
}

function fermerConnexion(){
    if (client) {
        client.close();
        client = null;

    }
}

module.exports = {connecter, db, fermerConnexion}