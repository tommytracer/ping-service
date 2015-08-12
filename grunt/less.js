module.exports = function (grunt, options) {
  return {
    dev: {
      files: {
        'build/css/styles.css': '<%= appRoot %>/sass/styles.scss'
      }
    },
    dist: {
      options: {
        cleancss: true
      },
      files: {
        'build/css/styles.css': '<%= appRoot %>/sass/styles.scss'
      }
    }
  };
};