module.exports = function (grunt) {

  var path = require('path');

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    useminPatterns: 'usemin-patterns'
  });

  require("jit-grunt")(grunt);
  require("time-grunt")(grunt);

  // Project configuration.
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt'),
    init: true,
    jitGrunt: true,
    data: {
      projectRoot: './',
      appRoot: 'app',
      webRoot: 'www/public',
      serverRoot: 'www',
      buildRoot: 'build',
      awsDevKey: process.env.AWS_DEV_KEY,
      awsDevSecret: process.env.AWS_DEV_SECRET,
      awsDevAppName: process.env.AWS_DEV_APP_NAME,
      awsDevEnvName: process.env.AWS_DEV_ENV_NAME,
      awsProdKey: process.env.AWS_PROD_KEY,
      awsProdSecret: process.env.AWS_PROD_SECRET,
      awsProdAppName: process.env.AWS_PROD_APP_NAME,
      awsProdEnvName: process.env.AWS_PROD_ENV_NAME,
      zipTimeStamp: '',
      zipname: 'ping-service',
      cacheDate: new Date().getTime()
    }
  });

  // Distribution build task
  grunt.registerTask('dist-build', [
    'clean',
    'bower_concat',
    'copy:css',
    'copy:html',
    'copy:images',
    'copy:fonts',
    'copy:server',
    'copy:packages',
    'concat:build'
  ]);

  // Optimization task (must be ran after the 'build' task)
  grunt.registerTask('optimize', [
    'cssmin:build',
    'cssmin',
    'concat',
    'ngAnnotate',
    'uglify',
    'useminPrepare',
    'usemin',
  ]);

  // Distribution build task
  grunt.registerTask('dist', [
    "jshint",
    'dist-build',
    'optimize',
  ]);

  grunt.registerTask('prepareDist', function() {
    grunt.config.data.zipTimeStamp = grunt.template.today("-yyyymmdd-HHMM");
  });

  grunt.registerTask('writeData', function(){

    grunt.file.defaultEncoding = 'utf8';
    grunt.file.preserveBOM = false;

    grunt.file.write('app/server/data/cacheBust.json', JSON.stringify({cacheDate:grunt.config.data.cacheDate}));
  });

};
