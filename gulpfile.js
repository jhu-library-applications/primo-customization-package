const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');

function cleanFiles () {
    return src(['01JHU_INST-JHU/js/custom.js', '01JHU_INST-JHU/css/custom1.css'], {read: false})
        .pipe(clean());
}

function scripts () {
  return src('01JHU_INST-JHU/js/*.js')
    .pipe(uglify())
    .pipe(concat('custom.js'))
    .pipe(dest('01JHU_INST-JHU/js/'));
};

function styles () {
    return src('01JHU_INST-JHU/css/*.css')
        .pipe(concat('custom1.css'))
        .pipe(dest('01JHU_INST-JHU/css/'));
};

exports.cleanFiles = cleanFiles;
exports.scripts = scripts;
exports.styles = styles;