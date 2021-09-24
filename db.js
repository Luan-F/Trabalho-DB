const { Client }= require('pg');

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

client.connect();

client.query('SELECT * FROM teste;', (err, res) => {
	if(err){
		console.log(err);
	}
	else{
		console.log(res.rows);
	}
});

function getProduct(type, value, callback){
//	console.log('type and value: ', type, value);

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
	getProduct,	
	addProduct,
	rmProduct
};
