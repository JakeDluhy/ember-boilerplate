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
  devPostgres: {
    host: 'localhost',
    port: '5432',
    user: 'LOCAL_USERNAME',
    password: '',
    database: 'LOCAL_DB_NAME'
  },
  prodPostgres: {
    user: 'POSTGRES_USERNAME',
    password: 'POSTGRES_PASSWORD',
    database: 'POSTGRES_DB_NAME'
  },
  tunnelConfig: {
    username: 'ec2-user',
    host: 'EC2 PUBLIC IP',
    privateKeyPath: 'PATH/TO/PRIVATE KEY',
    dstHost: 'POSTGRES ENDPOINT',
    dstPort: '5432'
  }
};