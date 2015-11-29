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
    scripts: [
        'js/app.js',
        'js/**/*.module.js',
        'js/**/*.js'
    ],
    vendor_header: [
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js'
    ],
    vendor_footer: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        'bower_components/lodash/lodash.min.js'
    ],
    scss: ['scss/**/*.scss'],
    html: ['index.html'],
    templates: ['js/**/*.html'],
    images: ['images/**/*.jpg', 'images/**/*.png']
};


//Lint Task
gulp.task('lint', ['clean_js'], function() {
    return gulp.src(resources.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('styles', ['clean_styles'], function() {
    return gulp.src(resources.scss, {cwd: path.app})
        .pipe(sass())
        .pipe(gulp.dest(path.dist + 'css'))
        .pipe(browserSync.stream());
});
gulp.task('clean_styles', function() {
    return gulp.src(path.dist + 'css', { read: false }).pipe(rimraf());
});

// Concatenate & Minify App JS
gulp.task('scripts', ['clean_js', 'lint'], function() {
    return gulp.src(resources.scripts, {cwd: path.app})
        .pipe(concat('app.js'))
        .pipe(gulp.dest(path.dist + 'js'))
        .pipe(rename('app.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(path.dist + 'js')) &&

    gulp.src(resources.vendor_header)
        .pipe(concat('vendor_header.js'))
        .pipe(gulp.dest(path.dist + 'js'))
        .pipe(rename('vendor_header.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist + 'js')) &&

    gulp.src(resources.vendor_footer)
        .pipe(concat('vendor_footer.js'))
        .pipe(gulp.dest(path.dist + 'js'))
        .pipe(rename('vendor_footer.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist + 'js'));
});
gulp.task('clean_js', function() {
    return gulp.src(path.dist + 'js', { read: false }).pipe(rimraf());
});

// Copy all other files to dist directly
gulp.task('copy_html', ['clean_html'], function() {
    // Copy main html
    return gulp.src(resources.html, {cwd: path.app})
        .pipe(gulp.dest(path.dist)) &&

    // Copy html templates
    gulp.src(resources.templates, {cwd: path.app})
        .pipe(gulp.dest(path.dist + 'templates'));
});
gulp.task('clean_html', function() {
    // Delete main html
    return gulp.src(path.dist + resources.html, { read: false })
        .pipe(rimraf()) &&

    //Delete html templates
    gulp.src(path.dist + 'templates', { read: false })
        .pipe(rimraf());
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: path.dist
        },
        open: false
    });

    gulp.watch(path.app + '**/*.scss', ['styles']).on('change', reportChange);
    gulp.watch(path.app + '**/*.html', ['copy_html', browserSync.reload]).on('change', reportChange);
    gulp.watch(path.app + '**/*.js', ['scripts', browserSync.reload]).on('change', reportChange);
});

//gulp.task('watch', function() {
    //gulp.watch(path.app + '**/*.html', ['copy_html']);
    //gulp.watch(path.app + '**/*.scss', ['styles']);
    //gulp.watch(path.app + '**/*.js', ['scripts']);
//});


// Default Task
gulp.task('default', ['lint', 'styles', 'scripts', 'copy_html', 'browser-sync']);



function reportChange(event){
    var files = event.path.split('/');
    var file = files.pop();
    console.log('\n----------------------------------------------');
    console.log('File ' + file + ' was ' + event.type + ':');
}