module.exports = function (grunt, options) {
  return {
    dist: {
      options: {
        region: 'us-east-1',
        applicationName: '<%= xxx_awsProdAppName %>',
        environmentCNAME: '<%= xxx_awsProdEnvName %>.elasticbeanstalk.com',
        sourceBundle: '<%= xxx_projectRoot %>/<%= zipname %><%= zipTimeStamp %>.zip',
        accessKeyId: '<%= awsProdKey %>',
        secretAccessKey: '<%= awsProdSecret %>',
        deployType: 'inPlace',
        s3: {
          bucket: 'xxx-web-prod-deploy-zips'
        }
      }
    },
    dev: {
      options: {
        region: 'us-east-1',
        applicationName: '<%= xxx_awsDevAppName %>',
        environmentCNAME: '<%= awsDevEnvName %>.elasticbeanstalk.com',
        sourceBundle: '<%= projectRoot %>/<%= zipname %><%= zipTimeStamp %>.zip',
        accessKeyId: '<%= awsDevKey %>',
        secretAccessKey: '<%= awsDevSecret %>',
        deployType: 'inPlace',
        s3: {
          bucket: 'xxx-web-dev-deploy-zips'
        }
      }
    }
  };
};