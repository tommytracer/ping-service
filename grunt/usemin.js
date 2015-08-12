module.exports = function (grunt, options) {
  return {
    options: {
      assetsDirs: [
        '<%= buildRoot %>',
        '<%= buildRoot %>/public/css',
        //'<%= buildRoot %>/public/img',
        '<%= buildRoot %>/public/js'
      ],
      patterns: {
        html: [
          [/(\/.*?\.html)/gm, 'Update the reference to our revved template file']
        ],
        images: [
          [/(img\/.*?\.(?:gif|jpeg|jpg|png|webp))/gm, 'Update the reference to our revved image file']
        ]
      }
    },
    css: [
      '<%= buildRoot %>/**/*.css'
    ],
    html: [
      '<%= buildRoot %>/**/*.html'
    ],
    js: [
      '<%= buildRoot %>/**/*.js'
    ]
  };
};
