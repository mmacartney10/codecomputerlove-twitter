module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				files: {
					'css/screen.css': 'sass/screen.scss',
					'css/heart.css': 'sass/heart.scss'
				}
			}
		},

		watch: {
			files: ['sass/**/*.scss'],
			tasks: ['sass'],
			options: {
				livereload: true,
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'watch']);
};















