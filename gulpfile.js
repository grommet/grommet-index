var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var gulpTasks = require('grommet/utils/gulp/gulp-tasks');
////var gulpTasks = require('grommet/src/utils/gulp/gulp-tasks');

var opts = {
  dist: path.resolve(__dirname, 'dist'),
  copyAssets: [
    'README.md',
    'src/js/**',
    {
      asset: 'src/scss/**',
      dist: 'dist/scss/'
    },
    {
      asset: 'examples/**',
      dist: 'dist/examples/',
      ignores: [
        'node_modules/',
        'dist/'
      ]
    }
  ],
  scssAssets: ['src/scss/**/*.scss'],
  jsAssets: [
    'src/js/**/*.js'
  ],
  mainJs: 'src/js/index.js',
  mainScss: 'src/scss/grommet-index/index.scss',
  webpack: {
    output: {
      filename: 'grommet-index.min.js',
      libraryTarget: 'var',
      library: 'GrommetIndex'
    },
    resolve: {
      modulesDirectories: ['node_modules', 'src/js', 'src/scss']
    },
    externals: {
      'react': 'React',
      'grommet': 'grommet'
    }
  },
  scsslint: true
};

gulpTasks(gulp, opts);

gulp.task('dev', function () {
  console.error('Running "gulp dev" here is not supported. Please use "gulp dist".');
});
