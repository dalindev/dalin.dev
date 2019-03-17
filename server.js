const express = require('express');
const {
	join
} = require('path');


const app = express();
const router = express.Router();


app.use('/dist', express.static(join(__dirname + '/dist')));
app.use('/js', express.static(join(__dirname + '/js')));
app.use('/css', express.static(join(__dirname + '/css')));
app.use('/img', express.static(join(__dirname + '/img')));
app.use('/lib', express.static(join(__dirname + '/lib')));

router.get('/', function (req, res) {
	res.sendFile(join(__dirname + '/index.html'));
});


app.use('/', router);
app.listen(process.env.PORT || 3000, function () {
	console.log('Running at Port 3000');
});