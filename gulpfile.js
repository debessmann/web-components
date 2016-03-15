/**
 * Created by User on 20.02.2016
 */

var gulp = require('gulp');
var less = require('gulp-less');
var inject = require('gulp-inject');
var del = require('del');

gulp.task('less', function () {
    return gulp.src('src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('less-deb', function () {
    return gulp.src('src/less/themes/*.less')
        .pipe(inject(gulp.src(['src/less/debessmann.less'], {read: false}), {
            starttag: '/* debessmann:begin */',
            endtag: '/* debessmann:end */',
            transform: function (filepath) {
                return '@import ".' + filepath + '";';
            }
        }))
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(gulp.dest('dist/demo/css'));
});

gulp.task('copy-demo', function () {
    return gulp.src('src/demo/**')
        .pipe(gulp.dest('dist/demo'));
});

gulp.task('copy-fonts', function () {
    return gulp.src('src/demo/fonts/**')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy-img', function () {
    return gulp.src('src/demo/img/**')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'copy-demo', 'copy-fonts', 'copy-img', 'less-deb']);

gulp.task('watch', function(){
    gulp.watch('src/less/**/*.less', ['less-deb']);
    gulp.watch('src/demo/**', ['copy-demo']);
});
