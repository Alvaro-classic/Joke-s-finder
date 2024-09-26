// Import statements
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// Creating app and defining port
const app = express();
const port = 3000;
const apiUrl = "https://v2.jokeapi.dev/joke/";
const date = new Date();
const actualYear = date.getFullYear();

// Middleware for static files
app.use(express.static("public"));

// Middleware for geting body requests
app.use(bodyParser.urlencoded({extended: true}));

// Rendering home page
app.get("/", (req, res) =>{
    res.render("index.ejs", {year: actualYear})
})

// Processing the request from the form
app.post("/", async(req, res) =>{
    // Geting the values from the form
    const category = req.body.category;
    const blacklistFlags = req.body.flag;
    const type = req.body.parts;
    const lang = req.body.language;
    const word = req.body.word;
    try{
        // Making request to the API
        const response = await axios.get(`${apiUrl}${category}?lang=${lang}&blacklistFlags=${blacklistFlags}&type=${type}&contains=${word}`)
        const result = response.data;
        // Sending data to the ejs template
        res.render("index.ejs", {data: result,
                                year: actualYear
         });
        // Error handling during the request
    }catch (error){
        console.log(error.response.data);
    }
})

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})
