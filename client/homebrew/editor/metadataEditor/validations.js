module.exports = {
	title : [
		(value)=>{
			return value?.length > 100 ? 'Max title length of 100 characters' : null;
		}
	],
	description : [
		(value)=>{
			return value?.length > 500 ? 'Max description length of 500 characters.' : null;
		}
	],
	thumbnail : [
		(value)=>{
			return value?.length > 256 ? 'Max URL length of 256 characters.' : null;
		},
		(value)=>{
			if(value?.length == 0){return null;}
			try {
				Boolean(new URL(value));
				return null;
			} catch (e) {
				return 'Must be a valid URL';
			}
		}
	],
	lang : [
		(value)=>{
			return new RegExp(/^([a-zA-Z]{2,3})(-[a-zA-Z]{4})?(-(?:[0-9]{3}|[a-zA-Z]{2}))?$/).test(value) === false && (value.length > 0) ? 'Invalid language code.' : null;
		}
	],
	tags : [
		(value)=>{
			return value?.length > 26 ? 'Max tag length is 26 characters.' : null;
		},
		(value)=>{
			const regex = /^(?:(?:group|meta|system|type):)?[A-Za-z0-9][A-Za-z0-9 /.-]{0,40}$/;
			const result = new RegExp(regex).test(value);
			return result === false ? 'Tags must be alphanumeric or / , . , - and can be prefixed with group:, meta:, system:, or type:' : null;
		}
	],
	authors : [
		(value)=>{
			return value?.length < 26 ? 'Max author length is 26 characters.' : null;
		}
	]
};



