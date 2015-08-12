module.exports = function (grunt, options) {
  return {
    build: {
      files: [
        {
          expand: true,
          cwd: '<%= buildRoot %>',
          src: [
            '**/*.html',
            '**/*.css',
            '**/*.js',
            '**/*.{png,jpg,gif}',
            '!js/*.annotated.js'
          ],
          dest: '<%= webRoot %>',
          filter: 'isFile'
        }
      ]
    },
    css: {
      files: [
        {
          expand: true,
          cwd: '<%= appRoot %>/public/css',
          src: ['styles.css', 'bootstrap.min.css'],
          dest: '<%= buildRoot %>/public/css',
          filter: 'isFile'
        }
      ]
    },
    html: {
      files: [
        {
          expand: true,
          cwd: '<%= appRoot %>/public',
          src: ['**/*.html'],
          dest: '<%= buildRoot %>/public',
          filter: 'isFile'
        }
      ]
    },
    images: {
      files: [
        {
          expand: true,
          cwd: '<%= appRoot %>/public/img',
          src: ['**/*.{png,jpg,gif,ico}'],
          dest: '<%= buildRoot %>/public/img',
          filter: 'isFile'
        }
      ]
    },
    fonts: {
      files: [
        {
          expand: true,
          cwd: 'bower_components',
          src: ['bootstrap/fonts/*.{eot,svg,ttf,woff}'],
          dest: '<%= buildRoot %>/public/fonts',
          filter: 'isFile'
        },
        {
          expand: true,
          cwd: '<%= appRoot %>/public/fonts',
          src: ['**/*'],
          dest: '<%= buildRoot %>/public/fonts',
          filter: 'isFile'
        }
      ]
    },
    server: {
      files: [
        {
          expand: true,
          cwd: '<%= appRoot %>',
          src: ['**/*', '!apigee_credentials.js', '!**/public/**',],
          dest: '<%= buildRoot %>',
          filter: 'isFile'
        }
      ]
    },
    js: {
      files: [
        {
          expand: true,
          cwd: '<%= appRoot %>/public/js',
          src: ['**/*', '!vendor.js', '!**/angular/**'],
          dest: '<%= buildRoot %>/public/js',
          filter: 'isFile'
        }
      ]
    },
    misc: {
      files: [
        {
          expand: true,
          cwd: '<%= appRoot %>',
          src: ['robots.txt'],
          dest: '<%= buildRoot %>/public',
          filter: 'isFile'
        }
      ]
    },
    packages : {
      files: [
        {
          expand: true,
          cwd: '<%= projectRoot %>/node_modules/express',
          src: ['**/*'],
          dest: '<%= buildRoot %>/node_modules/express'
        },
        {
          expand: true,
          cwd: '<%= projectRoot %>/node_modules/request',
          src: ['**/*'],
          dest: '<%= buildRoot %>/node_modules/request'
        },
        {
          expand: true,
          cwd: '<%= projectRoot %>/node_modules/q',
          src: ['**/*'],
          dest: '<%= buildRoot %>/node_modules/q'
        }
      ]
    }
  };
};
