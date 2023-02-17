const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const fs = require('fs');

function cleanCSS() {
  if (fs.existsSync('01JHU_INST-JHU/css/custom1.css')) {
    return src(['01JHU_INST-JHU/css/custom1.css'], { read: false })
      .pipe(clean());
  }
  return Promise.resolve('No CSS to clean');
}

function styles() {
  return src('01JHU_INST-JHU/css/*.css')
    .pipe(concat('custom1.css'))
    .pipe(dest('01JHU_INST-JHU/css/'));
};

exports.cleanCSS = cleanCSS;
exports.styles = styles;