module.exports = function (grunt, options) {
  return {
    app: {
      files: [
        '<%= appRoot %>/**/*.*',
        'bower_components/**/*.*',
        'grunt/**/*.js'
      ],
      tasks: ['dev'],
      options: {
        spawn: false,
        livereload: true
      }
    }
  };
};