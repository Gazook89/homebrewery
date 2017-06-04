const _ = require('lodash');
const Data = require('./random.data.js');



/*
- Roll
- Level
- Cost

- spell lists
- cost
- Class

*/


const columns = {
	roll : (rows)=>{
		return _.concat([`d${rows}`, ':---:'], _.times(rows, (i)=>i+1));
	},
	level : (rows)=>{
		return _.concat([`${_.sample(Data.classes)} Level`, ':---:'], _.times(rows, (i)=>Data.levels[i*2]));
	},

	spell : (rows)=>{
		return _.concat(['Spells', ':---'], _.times(rows, (i)=>{
			return `_${Data.rand('spellNames', 2).join(', ')}_`
		}));
	},
	cost : (rows)=>{
		return _.concat([`Cost`, '---:'], _.times(rows, (i)=>{
			return _.sample(['1 gp', '10 gp', '5 cp', '10,000 gp', '200 sp', '1 pp', '2 gp']);
		}));
	},
	gear : (rows)=>{
		return _.concat([_.sample(['Equipment', 'Reward', 'Treasure']), ':---'], _.times(rows, (i)=>{
			return Data.rand('gear');
		}));
	}
}


module.exports = {
	table : () => {
		let title = '';

		if(Data.chance(5)) title = `##### ${Data.rand(Data.abilities)}\n`;


		const rows = _.sample([4,6,8,10]);

		let fns = [];
		if(Data.chance(3)) fns.push(columns.roll);

		fns = _.concat(fns, Data.rand([
			columns.level,
			columns.spell,
			columns.cost,
			columns.gear
		], 3, 2 - fns.length))

		const cols = _.map(fns, (fn)=>fn(rows));

		return title + _.times(rows + 2, (i)=>{
			if(i==1){
				return '|' + _.map(cols, (col)=>col[i]).join('|') + '|';
			}else{
				return '| ' + _.map(cols, (col)=>col[i]).join(' | ') + ' |';
			}
		}).join('\n');
	}
}