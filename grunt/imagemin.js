module.exports = function (grunt, options) {
  return {
    prod: {
      files: [
        {
          expand: true,
          cwd: '<%= appRoot %>/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/img'
        }
      ]
    }
  };
};