var gulp = require('gulp');
var path = require('path');
var nodemon = require('gulp-nodemon');
var gulpTasks = require('grommet/utils/gulp/gulp-tasks');
////var gulpTasks = require('grommet/src/utils/gulp/gulp-tasks');

var opts = {
  base: '../../',
  dist: path.resolve(__dirname, '../../examples/indexer/dist/'),
  copyAssets: [
    'examples/indexer/src/index.html',
    {
      asset: 'examples/indexer/src/img/**',
      dist: 'examples/indexer/dist/img/'
    }
  ],
  scssAssets: ['examples/indexer/src/scss/**/*.scss'],
  jsAssets: ['examples/indexer/src/js/**/*.js'],
  mainJs: 'examples/indexer/src/js/index.js',
  mainScss: 'examples/indexer/src/scss/index.scss',
  sync: {
    hostname: 'grommet.us.rdlabs.hpecorp.net',
    username: 'ligo',
    remoteDestination: '/var/www/html/examples/indexer/dist'
  },
  webpack: {
    resolve: {
      alias: { // TODO: remove, just for local dev
        'grommet/scss': path.resolve(__dirname, '../../../grommet/src/scss'),
        'grommet': path.resolve(__dirname, '../../../grommet/src/js'),
        'grommet-index/scss': path.resolve(__dirname, '../../src/scss'),
        'grommet-index': path.resolve(__dirname, '../../src/js')
      },
      root: [
        path.resolve(__dirname, 'src/js'),
        path.resolve(__dirname, 'src/scss'),
        path.resolve(__dirname, '../../src/scss'),
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(__dirname, 'node_modules')
      ]
    }
  },
  devServerPort: 8001,
  // The 8010 port number needs to align with hostName in index.js
  devServerProxy: {
    "/rest/*": 'http://localhost:8010'
  },
  websocketHost: 'localhost:8010'
  //devPreprocess: ['start-backend']
};

gulp.task('start-backend', function() {
  nodemon({
    watch: ["examples/indexer/server"],
    script: path.resolve(__dirname, 'server/server')
  });
});

gulpTasks(gulp, opts);
