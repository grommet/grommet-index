import path from 'path';

export default {
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
      'react-dom': 'ReactDOM',
      'grommet': 'grommet'
    }
  },
  scsslint: true,
  distPreprocess: ['dist-css']
};
