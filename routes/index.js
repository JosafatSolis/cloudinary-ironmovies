const express = require("express");
const router = express.Router();
const uploader = require("../helpers/cloudinary");
const Movie = require("../models/Movie");

router.get("/", (req, res, next) => {
    Movie.find().then(movies => {
        res.status(200).json({ result });
    })
    .catch(err => res.status(400).json({ err }));
});

// Multer va a interceptar los archivos cuando vayan con Multipart, los va a subir a cloudinary, y recibe el url
// de descarga que se va a colocar en el req
// Cada que se ocupa .array, se accede a los archivos en .files (plural), si uso .single uso .file
// Mutipart[images] => .array("images") => req.files
// El middleware quita el campo "images" del body
router.post("/", uploader.array("images"), (req, res) => {
    // En req.files ya viene el path de la imagen, junto con otros metadatos  
    console.log(req.files);
    const images = req.files.map(file => file.path);
    console.log("Body: ", req.body);
    Movie.create({...req.body, images}).then(created => {
      res.status(200).json( created );
    })
})

module.exports = router;