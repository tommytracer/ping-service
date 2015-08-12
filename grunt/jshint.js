module.exports = function (grunt, options) {
  return {
    all: ["<%= appRoot %>/public/js/**/*.js",
            "!<%= appRoot %>/public/js/libs/**",
            "!<%= appRoot %>/public/js/plugins/**",
            "!<%= appRoot %>/public/js/modules/**",
            "!<%= appRoot %>/public/js/require/**",
            "!<%= appRoot %>/public/js/secondary/**",
            "!<%= appRoot %>/public/js/common.js",
            "!<%= appRoot %>/public/js/vendor.js"],
    options: {
      jshintrc: ".jshintrc"
    }
  };
};