const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const fs = require('fs');

function cleanJS () {
  if(fs.existsSync('01JHU_INST-JHU/js/custom.js')) {
    return src(['01JHU_INST-JHU/js/custom.js'], {read: false})
    .pipe(clean());
  }
  return Promise.resolve('No JS to clean');
}

function cleanCSS () {
  if(fs.existsSync('01JHU_INST-JHU/css/custom1.css')) {
    return src(['01JHU_INST-JHU/css/custom1.css'], {read: false})
        .pipe(clean());
  }
  return Promise.resolve('No CSS to clean');
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

exports.cleanJS = cleanJS;
exports.cleanCSS = cleanCSS;
exports.scripts = scripts;
exports.styles = styles;