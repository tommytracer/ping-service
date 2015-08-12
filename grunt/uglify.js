module.exports = function (grunt, options) {
  return {
    vendor: {
      files: {
        '<%= buildRoot %>/public/js/vendor.js' : '<%= buildRoot %>/public/js/vendor.js'
      }
    },
    scripts: {
      files: {
        '<%= buildRoot %>/public/js/scripts.js': '<%= buildRoot %>/public/js/scripts.annotated.js'
      }
    }
  };
};