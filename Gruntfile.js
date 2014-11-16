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
    },
    jshint: {
      files: [

        'Gruntfile.js',
        'test/*.js',
        
        'spells-messaging/Gruntfile.js',
        'spells-messaging/index.js',
        'spells-messaging/lib/*.js',
        'spells-messaging/test/*.js',
        'spells-messaging/protocol/*.js',
        'spells-messaging/build.js',


        'spells-gateway/Gruntfile.js',
        'spells-gateway/index.js',
        'spells-gateway/lib/*.js',
        'spells-gateway/test/*.js',

        'spells-control/Gruntfile.js',
        'spells-control/index.js',
        'spells-control/lib/*.js',
        'spells-control/test/*.js'

      ],
      options: {
        nonbsp: true,
        nonew: true,
        noyield: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: false,
        node: true,
        quotmark: 'single',
        camelcase: true,
        globals: {
          describe: true,
          it: true
        }
      }
    },
    watch: {
      all: {
        files: ['**/*', '!**/node_modules/**', '!**/build/**'],
        tasks: ['test'],
        options: {
          spawn: false
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-subgrunt');

  // Default task.
  grunt.registerTask('default', ['jshint', 'mochaTest', 'subgrunt:default']);
  grunt.registerTask('test', ['jshint', 'mochaTest', 'subgrunt:test']);
};
