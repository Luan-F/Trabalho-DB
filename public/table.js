export default function createTable(columns ,rows){
	let table = '<tr>';
	for(const type of columns){
		table += `<td>${type[1]}</td>`;
	}
	table += '</tr>';

	for(const val of rows){
		table += '<tr>';
		for(const col of columns){
			table += `<td>${val[col[0]]}</td>`;
		}
		table += '</tr>';
	}

	return table;
}
