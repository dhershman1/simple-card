import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

export default {
	entry: 'src/index.js',
	moduleName: 'simpleCard',
	format: 'umd',
	plugins: [
		buble()
	],
	dest: 'dist/simple-card.umd.js'
};
