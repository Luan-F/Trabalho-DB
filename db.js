const { Client }= require('pg');

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

client.connect();

function getAllT(callback){
	client.query('SELECT * FROM produtos p1 JOIN precos p2 USING(prod_id) JOIN estoque e1 USING(prod_id);', 
		(err, res) => {
			callback(err, res);
	});
}

function getAll(tableName, callback){
	client.query(`SELECT * FROM ${tableName};`,
		(err, res) => {
			callback(err, res);
		}
	);
}

function getProduct(type, value, callback){
	client.query(`SELECT * FROM produtos WHERE ${type}=$1`,
		[value],	
		(err, res) => {
			callback(err, res);
		}
	);
}

function addProduct(name, category, callback){
	client.query('INSERT INTO produtos(prod_name, prod_cat) VALUES($1, $2);',
		[name, category],
		(err, res) => {
			callback(err, res)
		}
	);
}

function rmProduct(id, callback){
	client.query('DELETE FROM produtos WHERE prod_id=$1;'
		, [id]
		, (err, res) => {
			callback(err, res);
		}
	);
}

module.exports = {
	getAllT,
	getAll,
	getProduct,	
	addProduct,
	rmProduct
};
