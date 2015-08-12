module.exports = function (grunt, options) {
  return {
    build: {
      expand: true,
      cwd: '<%= buildRoot %>/css',
      src: ['*.css', '!*.min.css'],
      dest: '<%= buildRoot %>/css'
    }
  };
};