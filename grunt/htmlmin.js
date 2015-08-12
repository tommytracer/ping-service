module.exports = function (grunt, options) {
  return {
    prod: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: [
        {
          expand: true,
          cwd: '<%= buildRoot %>/public',
          src: ['**/*.html'],
          dest: '<%= buildRoot %>/public'
        }
      ]
    }
  };
};