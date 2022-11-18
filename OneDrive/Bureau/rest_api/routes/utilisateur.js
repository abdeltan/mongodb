const express = require('express');
const { ajouterUtilisateur, getTousUtilisateurs, getUtilisateurs } = require('../controller/utilisateur');
const router = express.Router();

router.route("/utilisateurs").post(ajouterUtilisateur);
router.route("/utilisateur").get(getTousUtilisateurs);
router.route("/utilisateur/:id").get(getUtilisateurs);
router.route("/utilisateur/:id").put(modifierUtilisateur);
router.route("/utilisateur/:id").delete(supprimerUtilisateurs);

module.exports = router;