module.exports = function (grunt, options) {
  return {
    options: {
      separator: "\n"
    },
    build: {
      src: [

        '<%= appRoot %>/public/js/app.js',
        '<%= appRoot %>/public/js/controllers.js',
        '<%= appRoot %>/public/js/services.js'
      ],
      dest: 'build/public/js/scripts.js'
    }
  };
};
