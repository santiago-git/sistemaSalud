//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/sistema-salud'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/sistema-salud/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log("Servidor corriendo en el puerto 8080")