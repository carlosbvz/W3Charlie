module.exports = {
	app: './app',
	dist: './dist',
	css: {
		src: './app/css/*.css',
		dest: './dist/assets/css',
		watch: 'app/css/*.css'
	},
	scripts: {
		src: './app/js/*.js',
		dest: './dist/assets/scripts',
		watch: 'app/css/*.js'
	},
	images: {
		src: './app/img/*.*',
		dest: './dist/assets/img',
		watch: './app/img/*.*',
	}
}