/*global module:false*/
module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    mochaTest: {
      test: {
        options: {
          run: true,
          debug: true,
          reporter: 'spec'
        },
        src: 'test/'
      }
    },
    subgrunt: {
      test: {
        'spells-messaging': 'test',
        'spells-gateway': 'test',
        'spells-control': 'test'
      },
      default: {
        'spells-messaging': 'default',
        'spells-gateway': 'default',
        'spells-control': 'default'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-subgrunt');

  // Default task.
  grunt.registerTask('default', ['mochaTest', 'subgrunt:default']);
  grunt.registerTask('test', ['mochaTest', 'subgrunt:test']);
};
