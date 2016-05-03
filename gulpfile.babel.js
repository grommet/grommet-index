import gulp from 'gulp';
import path from 'path';
import grommetToolbox from 'grommet-toolbox';
import git from 'gulp-git';
import del from 'del';
import mkdirp from 'mkdirp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import minifyCss from 'gulp-cssnano';

gulp.task('dist-css', () => {
  return gulp.src('src/scss/grommet-index/index.scss')
    .pipe(sass({
      includePaths: [path.resolve(__dirname, './node_modules')]
    }))
    .pipe(rename('grommet-index.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/'));
});

gulp.task('release:createTmp', (done) => {
  del.sync(['./tmp']);
  mkdirp('./tmp', (err) => {
    if (err) {
      throw err;
    }
    done();
  });
});

gulp.task('release:stable', ['dist', 'release:createTmp'], (done) => {
  if (process.env.CI) {
    git.clone('https://' + process.env.GH_TOKEN + '@github.com/grommet/grommet-index.git',
      {
        cwd: './tmp/'
      },
      (err) => {
        if (err) {
          throw err;
        }

        process.chdir('./tmp/grommet-index');
        git.checkout('stable', (err) => {
          if (err) {
            throw err;
          }

          del.sync(['./**/*']);

          gulp.src('../../dist/**').pipe(gulp.dest('./')).on('end', () => {
            git.status({
              args: '--porcelain'
            }, (err, stdout) => {
              if (err) {
                throw err;
              }

              if (stdout && stdout !== '') {
                gulp.src('./')
                  .pipe(git.add({
                    args: '--all'
                  }))
                  .pipe(git.commit('Stable dev version update.')).on('end', () => {
                    git.push('origin', 'stable', { quiet: true }, (err) => {
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

grommetToolbox(gulp);

gulp.task('dev', () => {
  console.error('Running "gulp dev" here is not supported. Please use "gulp dist".');
});
