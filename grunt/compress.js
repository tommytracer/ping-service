module.exports = function (grunt, options) {
  return {
    main : {
      options : {
        mode: 'zip',
        archive : '<%= projectRoot %>/<%= zipname %><%= zipTimeStamp %>.zip'
      },
      files : [
        {
          expand: true,
          cwd : '<%= buildRoot %>',
          src : ['**']
        }
      ]
    }
  };
};