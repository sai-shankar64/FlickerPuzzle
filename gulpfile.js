var gulp=require('gulp');
var minifyCSS =require('gulp-csso');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');

gulp.task('css',function(){
    return gulp.src('game/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/css'))
});

gulp.task('scripts',function(){
    return gulp.src('game/script/**/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts'));
});
gulp.task('default',['css','scripts']);
