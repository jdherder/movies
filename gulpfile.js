// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var rimraf = require('gulp-rimraf');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var browserSync = require('browser-sync').create();

var path = {
    app: 'app/',
    dist: 'dist/',
    root: ''
};

var resources = {
    scripts: ['js/app.js', 'js/**/*.module.js', 'js/**/*.js'],
    vendor_header: ['bower_components/angular/angular.js'],
    vendor_footer: [],
    scss: ['scss/**/*.scss'],
    html: ['index.html'],
    templates: ['js/**/*.html'],
    images: ['images/**/*.jpg', 'images/**/*.png']
};

// Delete the dist directory
gulp.task('clean', function() {
    return gulp.src(path.dist, { read: false }) // much faster
        .pipe(rimraf());
});

//Lint Task
gulp.task('lint', ['clean'], function() {
    return gulp.src(resources.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('styles', ['clean'], function() {
    return gulp.src(resources.scss, {cwd: path.app})
        .pipe(sass())
        .pipe(gulp.dest(path.dist + 'css'))
        .pipe(browserSync.stream());
});

// Concatenate & Minify App JS
gulp.task('scripts', ['clean', 'lint'], function() {
    gulp.src(resources.scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(path.dist + 'js'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist + 'js'));

    gulp.src(resources.vendor_header)
        .pipe(concat('vendor_header.js'))
        .pipe(gulp.dest(path.dist + 'js'))
        .pipe(rename('vendor_header.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist + 'js'));

    gulp.src(resources.vendor_footer)
        .pipe(concat('vendor_footer.js'))
        .pipe(gulp.dest(path.dist + 'js'))
        .pipe(rename('vendor_footer.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist + 'js'));
});

// Copy all other files to dist directly
gulp.task('copy', ['clean'], function() {
    // Copy main html
    gulp.src(resources.html, {cwd: path.app})
        .pipe(gulp.dest(path.dist));

    // Copy html templates
    gulp.src(resources.templates, {cwd: path.app})
        .pipe(gulp.dest(path.dist + 'templates'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: path.dist
        },
        open: false
    });
    gulp.watch("app/scss/**/*.scss", ['styles']);
    //gulp.watch("app/**/*.html", ['copy']).on('change', browserSync.reload);
});

gulp.task('watch', function() {
    gulp.watch(path.app + '**/*.*', ['lint', 'scripts', 'copy']);
});


// Default Task
gulp.task('default', ['lint', 'styles', 'scripts', 'copy', 'watch', 'browser-sync']);