module.exports = function (grunt, options) {
  return {
    all: {
      dest: '<%= buildRoot %>/public/js/vendor.js',
      cssDest: '<%= buildRoot %>/public/css/vendor.css',
      dependencies: {
        'angular': 'jquery'
      }
    }
  };
};