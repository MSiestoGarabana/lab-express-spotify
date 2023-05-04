require('dotenv').config();

const express = require('express');
const router = express.Router()
const hbs = require('hbs');
// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token',error))

// Our routes go here:
app.get('/',(req, res) => {
 res.render('index')
})




app.get('/artist-search', (req, res)=>{
    console.log('blablabla------------------------------', req.query)
    const {artist} = req.query
    console.log("-------------QUEREMOS EL ID", id)

     spotifyApi
        .searchArtists(artist)
        //.findOne({name: artist}) METODO SPOTI
        .then(data => {
            const info = data.body.artists.items
            console.log(info)
            res.render('artist-view', {info})
        })
        .catch(err => console.log('The error while searching artists occurred: ', err)) 
   // 
}) 
app.get('/albums/:id', (req, res) => {
  const {id} = req.params
  spotifyApi
  .getArtistAlbums(id)
  .then(data => {
      res.send(data.body)
  } 
  )
})

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
