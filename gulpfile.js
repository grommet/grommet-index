var gulp = require('gulp');
var path = require('path');
var gulpTasks = require('grommet/utils/gulp/gulp-tasks');
var git = require('gulp-git');
var del = require('del');
var mkdirp = require('mkdirp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifyCss = require('gulp-cssnano');

var opts = {
  dist: path.resolve(__dirname, 'dist'),
  copyAssets: [
    'README.md',
    'package.json',
    {
      asset: 'src/js/**',
      babel: true
    },
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
    //alias: { // TODO: remove, just for local dev
    //  'grommet/scss': path.resolve(__dirname, '../grommet/src/scss'),
    //  'grommet': path.resolve(__dirname, '../grommet/src/js')
    //},
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
  scsslint: true,
  distPreprocess: ['dist-css']
};

gulp.task('dist-css', function() {
  return gulp.src('src/scss/grommet-index/index.scss')
    .pipe(sass({
      includePaths: [path.resolve(__dirname, './node_modules')]
    }))
    .pipe(rename('grommet-index.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/'));
});

gulp.task('release:createTmp', function(done) {
  del.sync(['./tmp']);
  mkdirp('./tmp', function(err) {
    if (err) {
      throw err;
    }
    done();
  });
});

gulp.task('release:stable', ['dist', 'release:createTmp'], function(done) {
  if (process.env.CI) {
    git.clone('https://' + process.env.GH_TOKEN + '@github.com/grommet/grommet-index.git',
      {
        cwd: './tmp/'
      },
      function(err) {
        if (err) {
          throw err;
        }

        process.chdir('./tmp/grommet-index');
        git.checkout('stable', function(err) {
          if (err) {
            throw err;
          }

          del.sync(['./**/*']);

          gulp.src('../../dist/**').pipe(gulp.dest('./')).on('end', function() {
            git.status({
              args: '--porcelain'
            }, function(err, stdout) {
              if (err) {
                throw err;
              }

              if (stdout && stdout !== '') {
                gulp.src('./')
                  .pipe(git.add({
                    args: '--all'
                  }))
                  .pipe(git.commit('Stable dev version update.')).on('end', function() {
                    git.push('origin', 'stable', { quiet: true }, function(err) {
                      if (err) {
                        throw err;
                      }

                      process.chdir(__dirname);
                      done();
                    });
                  });
              } else {
                console.log('No difference since last commit, skipping stable release.');

                process.chdir(__dirname);
                done();
              }
            });
          });
        });
      }
    );
  } else {
    console.warn('Skipping release. Release:stable task should be executed by CI only.');
  }
});

gulpTasks(gulp, opts);

gulp.task('dev', function () {
  console.error('Running "gulp dev" here is not supported. Please use "gulp dist".');
});
