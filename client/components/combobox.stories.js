import { fn } from '@storybook/test';
import  { Combobox }  from './combobox';



const langCodes = ['en', 'de', 'de-ch', 'fr', 'ja', 'es', 'it', 'sv', 'ru', 'zh-Hans', 'zh-Hant'];
const langElements = langCodes.map((lang)=>{
	const element = Object.assign(document.createElement('div'), { class: 'language' });
	element.innerText = lang;
	console.log(element)
	return element
});

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title     : 'Combobox',
	component : Combobox,
	//   parameters: {
	//     // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
	//     layout: 'centered',
	//   },
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags      : ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes  : {
		className : { control: 'string' },
		options  : { control: 'object' }
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args : { 
		onClick: fn(),
		options: langElements
	},
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
	args : {
		className   : 'butt',
	},
};

export const Secondary = {
	args : {
		className : 'poo',
	},
};
