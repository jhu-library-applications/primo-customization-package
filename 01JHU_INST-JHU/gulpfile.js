const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function scripts () {
  return src('js/*.js')
    .pipe(uglify())
    .pipe(concat('custom.js'))
    .pipe(dest('vendor/js/'));
};

function styles () {
    return src('css/*.css')
        .pipe(concat('custom1.css'))
        .pipe(dest('vendor/css/'));
};

exports.scripts = scripts;
exports.styles = styles;