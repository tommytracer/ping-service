module.exports = function (grunt, options) {
  return {
    options: {
      algorithm: 'md5',
      length: 8
    },
    dist: {
      src: [
        //'<%= buildRoot %>/public/img/*.{png,jpg,gif}',
        '<%= buildRoot %>/public/js/*.js',
        //'<%= buildRoot %>/partials/**/*.html'
        '<%= buildRoot %>/public/css/*.css'
      ]
    }
  }
};