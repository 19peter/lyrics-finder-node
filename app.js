const express = require("express");
const app = express();
const lyricsFinder = require('lyrics-finder');

var artist;
var title;

app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
  );

app.use(function (req, res, next) {
    

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post("/", (req, res) => {
    console.log(req.body);
    artist = req.body.artist
    title = req.body.song
})

app.get("/", (req, res) => {
    (async function(artist, title) {
        let lyrics = await lyricsFinder(artist, title) || "Not Found!";
        lyrics = JSON.stringify(lyrics)
        console.log(lyrics);
        
        res.send(lyrics)
    })(artist, title);

})



app.listen(3000)