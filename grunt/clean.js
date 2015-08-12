module.exports = function (grunt, options) {
  return {
    copied: ['<%= buildRoot %>/partials', '<%= buildRoot %>/public/js/scripts.js', '<%= buildRoot %>/public/js/vendor.js'],
    build: ['<%= buildRoot %>', '<%= zipname %><%= zipTimeStamp %>.zip']
  };
};