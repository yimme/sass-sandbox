const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()

// Convert scss to css
gulp.task('sass', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
})

// Copy html  into the dist folder
gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('./dist'))
})

// Build project
gulp.task('build', ['sass', 'html'] ,() => {

})

// Watch changes and run local server
gulp.task('watch', ['sass', 'html'], () => {

    browserSync.init({
        server: "./dist"
    })

    gulp.watch('src/scss/**/*.scss', ['sass'])
    gulp.watch('src/*.html', ['html'])
    gulp.watch('src/*.html').on('change', browserSync.reload)
})