module.exports = function (grunt, options) {
  return {
    html: '<%= buildRoot %>/public/index.html',
    options: {
      dest: '<%= buildRoot %>/public'
    }
  };
};
