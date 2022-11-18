const { ObjectID } = require("bson");
const { Utilisateur } = require("../model/utilisateur");
const { param } = require("../routes/utilisateur");

const ajouterUtilisateur = async (req,res) =>{
try{
    let utilisateur = new Utilisateur(
        req.body.noms,
        req.body.adresse,
        req.body.telephone,
        req.body.email,
        req.body.password,
        req.body.password2
        );

        let result = await client
        .db()
        .collection("utilisateurs")
        .insertOne(utilisateur);

        res.status(200).json(result);
} catch (error){
    console.log(error);
    res.status(500).json(error); 
}
};
const getTousUtilisateurs = async (req, res)=>{
    try{
        let cursor = client.db().collection("utilisateur").find();
        let result = await cursor.toArray();
        if(result.lenght > 0){
            res.status(200).json(result);
        }else {
            res.status(204).json({msg:"Aucun utilisateur trouvé"});
        }

    }catch (error){
            console.log(error);
            res.status(500).json(error);
        }   
};

const getUtilisateurs = async (req, res)=>{
    try{
        let id = new Object(req.params.id)
        let cursor = client.db().collection("utilisateur").find({_id : id});
        let result = await cursor.toArray();
        if(result.lenght > 0){
            res.status(200).json(result[0]);
        }else {
            res.status(204).json({msg:"cette utilisateur n'existe pas"});
        }

    }catch (error){
            console.log(error);
            res.status(500).json(error);
        }   
};

const modifierUtilisateur = async (req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let nNoms = req.body.noms;
        let nAdresse = req.body.adresse;
        let nTelephone = req.body.telephone;
        let nEmail = req.body.email;
        let nPassword = req.body.password;
        let nPassword2=req.body.password2;

        let result = await client 
        .db()
        .collection("utilisateurs")
        .updateOne(
            {_id: id },
            {$set: {noms: nNoms ,adresse : nAdresse, email: nEmail, telephone: nTelephone, password: nPassword, password2 : nPassword2 }}
        );
        res.status(200).json(result);
    }catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const supprimerUtilisateur = async (req, res) => {
    try {
        let id = new ObjectID(req.params.id);
     

        let result = await client 
        .db()
        .collection("utilisateurs")
        .updateOne({_id: id });
        res.status(200).json(result);
    }catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};
module.exports = {ajouterUtilisateur , getTousUtilisateurs , getUtilisateurs, modifierUtilisateur,supprimerUtilisateur};