module.exports = {
	app: './app',
	dist: './dist',
	tmp: '.tmp',
	styles: {
		src: './app/assets/styles/main.scss',
		dest: './dist/assets/styles',
		watch: ['app/components/**/*.scss',
				'app/assets/styles/*.scss',
				'app/assets/styles/vendor/*.scss']
	}, 
	scripts: {
		src: './app/assets/scripts/app.js',
		dest: './dist/assets/scripts',
		watch: ['app/components/**/*.js',
				'app/assets/scripts/core/*.js']
	},
	assemble: {
		watch: [	'./app/components/**/*.hbs',
				'./app/layouts/*.hbs',
				'./app/pages/*.hbs',
				'./app/pages/**/*.hbs'
				]
	},
	images: {
		src: './app/assets/images/*',
		dest: './dist/assets/images',
		watch: './app/assets/images/*'
	}, 
	sassOptions: {
		dev: {
			errLogToConsole: true,
			outputStyle: 'expanded',
			precision: 10
		},
		prod: {
			outputStyle: 'compressed',
			precision: 10
		} 
	}, 
	autoPrefixerOptions: {
		dev: {
			browsers: ['> 1%', 'last 2 versions']
		}
	}
}