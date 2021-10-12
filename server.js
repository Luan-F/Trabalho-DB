require('dotenv').config();

const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);

const db = require('./db.js');

app.use(express.static('public'));

sockets.on('connection', socket => {

	db.getAll('produtos', (err, res) => {
		if(err){
			console.log(err);
		}
		else{
			socket.emit('findAll', res.rows);
		}
	});

	socket.on('searchAll', () => {
		db.getAllT((err, res) => {
			if(err){
				console.log(err);
			}
			else{
				socket.emit('findAllDet', res.rows);
			}
		});
	});

	socket.on('searchProduct', (type, value) => {
		value = value.toLowerCase();
		db.getProduct(type, value, (err, res) => {
			if(err){
				console.log('> Erro no searchProduct: ', err);
				socket.emit('searchError');
			}
			else{
				console.log(res.rows);
				socket.emit('searchFound', res.rows);
			}
		});
	});

	socket.on('addProduct', (name, category) => {
		name = name.toLowerCase();
		category = category.toLowerCase();
		db.addProduct(name, category, (err, res) => {
			if(err){
				socket.emit('addError', err);
			}
			else{
				socket.emit('addRes');
			}
		});
	});

	socket.on('rmProduct', (id) => {
		db.rmProduct(id, (err, res) => {
			if(err){
				socket.emit('rmError', err);
			}
			else{
				socket.emit('rmRes');
			}
		});
	});
});

const port = process.env.PORT;

server.listen(port, () => {
	console.log('> Connected');
	console.log(`> Listen ${port}!`);
});
