var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

gulp.task('sass', function(){
  return gulp.src('public/stylesheets/src/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('public/stylesheets/dist'))
});

gulp.task('autoprefix-then-minify', function(){
  return gulp.src('public/stylesheets/dist/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions', '> 0%','Firefox ESR'],
        cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/stylesheets/dist'))
});

gulp.task('nodemon', function() {
    return nodemon({
        script: 'bin/www'
    })
    .on('start', function onStart() {
       browserSync.reload;
    })
    .on('restart', function onRestart() {
       browserSync.reload;
    });
 
})
 
gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        proxy: 'http://localhost:3000',
        port: 3001,
        online: true
    });
});
 
gulp.task('default', ['browser-sync'], function() {
    gulp.start('nodemon');    
    gulp.watch('public/stylesheets/src/*.scss', ['sass']);
    gulp.watch('public/stylesheets/dist/*.css', ['autoprefix-then-minify']);
    gulp.watch("**/*.html").on('change', browserSync.reload);
    gulp.watch("routes/*.js").on('change', browserSync.reload);
    gulp.watch("routes/**/*").on('change', browserSync.reload);
    gulp.watch("app.js").on('change', browserSync.reload);
    gulp.watch("public/**/*").on('change', browserSync.reload);
    gulp.watch("views/**/*").on('change', browserSync.reload);
    gulp.watch("views/*.pug").on('change', browserSync.reload);
 
});
