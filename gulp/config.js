module.exports = {
	app: './app',
	dist: './dist',
	css: {
		src: './app/assets/styles/global.scss',
		dest: './dist/assets/css',
		watch: ['app/components/**/*.scss',
				'app/assets/styles/*.scss',
				'app/assets/styles/vendor/*.scss']
	},
	scripts: {
		src: './app/assets/scripts/app.js',
		dest: './dist/assets/scripts',
		watch: ['app/components/**/*.js','app/assets/scripts/core/*.js']
	},
	images: {
		src: './app/img/*.*',
		dest: './dist/assets/img',
		watch: './app/img/*.*',
	}
}