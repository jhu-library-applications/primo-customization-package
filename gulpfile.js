const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const replace = require('gulp-replace');
const fs = require('fs');

function cleanCSS () {
  if(fs.existsSync('01JHU_INST-JHU/css/custom1.css')) {
    return src(['01JHU_INST-JHU/css/custom1.css'], {read: false})
        .pipe(clean());
  }
  return Promise.resolve('No CSS to clean');
}

function scripts () {
  var anchor = '/* INSERT CUSTOM COMMENTS AND JAVASCRIPT CODE BLOCKS HERE */';

  return src('01JHU_INST-JHU/js/custom.js')
    .pipe(replace(anchor, concat(src('01JHU_INST-JHU/js/*.js', '!01JHU_INST-JHU/js/custom.js')))
    .pipe(dest('01JHU_INST-JHU/js/')));
};

function styles () {
    return src('01JHU_INST-JHU/css/*.css')
        .pipe(concat('custom1.css'))
        .pipe(dest('01JHU_INST-JHU/css/'));
};

exports.cleanCSS = cleanCSS;
exports.scripts = scripts;
exports.styles = styles;