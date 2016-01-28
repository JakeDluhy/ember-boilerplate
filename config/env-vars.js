/**
 * Environment variables set for deployment
 */

module.exports = {
  appName: 'MY APP NAME',
  accessKeyId: 'AWS ACCESS KEY ID',
  secretAccessKey: 'AWS SECRET ACCESS KEY',
  s3Bucket: 'S3 BUCKET NAME',
  s3Region: 'S3 REGION',
  cdnUrl: 'https://s3-{S3 REGION}.amazonaws.com/{S3 BUCKET}/{APP NAME}/',
  tunnelConfig: {
    username: 'ec2-user',
    host: 'EC2 PUBLIC IP',
    privateKeyPath: 'PATH/TO/PRIVATE KEY',
    dstHost: 'REDIS ENDPOINT'
  }
};