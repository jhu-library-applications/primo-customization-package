const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function scripts () {
  return src('01JHU_INST-JHU/js/*.js')
    .pipe(uglify())
    .pipe(concat('custom.js'))
    .pipe(dest('01JHU_INST-JHU/vendor/js/'));
};

function styles () {
    return src('01JHU_INST-JHU/css/*.css')
        .pipe(concat('custom1.css'))
        .pipe(dest('01JHU_INST-JHU/vendor/css/'));
};

exports.scripts = scripts;
exports.styles = styles;