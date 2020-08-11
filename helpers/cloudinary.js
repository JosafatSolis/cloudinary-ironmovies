require("dotenv");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
});

// Se especifica el folder donde se va a manejar todo, y una función para nombrar los archivos
// Se manda un callback que se asegura que el nombre sea exactamente el mismo que el original
// El callback ya se recibe, sólo hay que mandarle el nombre original
// Primer parámetro, si hay algún error, y segundo, el nombre que quieres que tenga el archivo
const storage = new CloudinaryStorage({
    cloudinary,
    params: {folder: "ironmovies"}
});

// Multer es un middleware que cuando se recibe un dato Mulipart, entra y maneja el contenido
module.exports = multer({ storage });