import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

export default {
	input: 'src/index.js',
	name: 'simpleCard',
	output: {
		format: 'umd',
		file: 'dist/simple-card.umd.js'
	},
	plugins: [
		buble(),
		uglify()
	]
};
