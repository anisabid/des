var fs = require('fs'),
    gulp = require('gulp'),
    path = require('path'),
    argv = require('yargs').argv,
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    superstatic = require('superstatic'),
    preprocess = require('gulp-preprocess'),
    config = require('./gulp.config')();

gulp.task('build-clean', function () {
    var clean = require('gulp-clean');
    return gulp.src(config.dist, {read: false})
        .pipe(clean());
});

gulp.task('build-libs', function () {
    config.lib.forEach(function (lib, index, array) {
        gulp.src(lib.src)
            .pipe(
                gulp.dest(
                    path.join('./', lib.dist)
                )
            )
    });
    return true;
});

gulp.task('build-scripts', function () {
    var uglify = require('gulp-uglify');
    var gutil = require('gulp-util');

    var jsResult = gulp.src(config.js.input)
        .pipe(concat('ng-script.js'))
        .pipe(gulp.dest(config.js.output))
        .pipe(uglify())
        .pipe(rename('ng-script.min.js'))
        .pipe(gulp.dest(config.js.output))
        .on('error', gutil.log);

    return jsResult;

});

gulp.task('watch.build.scripts', ['build-scripts'], function () {
    gulp.watch([config.js.watch], ['build-scripts']);
});

gulp.task('build-styles', function () {
    var sass = require('gulp-sass');

    var sassCssResult = gulp.src(config.sass.input)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('ng-style.css'))
        .pipe(gulp.dest(config.sass.output))
        .pipe(
            sass({
                outputStyle: 'compressed',
                compress: true
            }).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.sass.output));

    return sassCssResult;
});

/**
 * @example build single theme => gulp build-theme-styles --theme Paris --watch
 * @example build all themes => gulp build-theme-styles --all
 */
gulp.task('build-theme-styles', function () {
    var sass = require('gulp-sass');

    var _theme = (argv.theme === undefined) ? false : argv.theme,
        _all = (argv.all === undefined) ? false : argv.all,
        _watch = (argv.watch === undefined) ? false : true,
        sassCssResult = true;

    var _getPath = function (_theme) {
        return '../config/' + _theme + '/charte_graphique/css/';
    };

    var sassToCss = function (_theme) {
        var _return = gulp.src('./src/sass/theme/' + _theme + '/style.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('ng-style.css'))
            .pipe(gulp.dest(_getPath(_theme)))
            .pipe(
                sass({
                    outputStyle: 'compressed',
                    compress: true
                }).on('error', sass.logError))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(_getPath(_theme)));

        //console.log('Sass to css '+ _theme);
        return _return;

    };

    if (_theme) {
        console.log(_theme);
        try {
            // Query the entry
            var dirTheme = fs.lstatSync('./src/sass/theme/' + _theme);

            // Is it a directory?
            if (dirTheme.isDirectory()) {
                var sassCssResult = sassToCss(_theme);

                if (_watch) {
                    gulp.watch(['./src/sass/theme/' + _theme + '/**/*.sass', './src/sass/theme/' + _theme + '/**/*.scss'], ['build-theme-styles']);
                }
            }
        }
        catch (e) {
            console.log('Not found theme dir !');
        }

    } else {
        //console.log('Theme is undefined !');

        if (_all) {
            console.log('Build all theme');
            console.log(_all);

            function getDirectories(srcpath) {
                return fs.readdirSync(srcpath)
                    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
            }

            getDirectories('./src/sass/theme/').forEach(function (theme, index, array) {
                console.log((index + 1) + ' => ' + theme);
                sassToCss(theme);
            });
        }

    }

    return sassCssResult;
});

gulp.task('watch.build.styles', ['build-styles'], function () {
    gulp.watch([config.sass.watch], ['build-styles']);
});

gulp.task('build-img', function () {

    imgResult = gulp.src(config.img.input).pipe(gulp.dest(config.img.output));
    return imgResult;

});

gulp.task('build', function (callback) {
    runSequence('build-clean',
        ['build-img', 'build-libs', 'build-scripts', 'build-styles'],
        callback);
});

gulp.task('watch.build', ['build-styles', 'build-scripts'], function () {
    gulp.watch([config.sass.watch], ['build-styles']);
    gulp.watch([config.js.watch], ['build-scripts']);
});

gulp.task('serve', ['build'], function () {

    gulp.watch([config.img.watch], ['build-img']);
    gulp.watch([config.js.watch], ['build-scripts']);
    gulp.watch([config.sass.watch], ['build-styles']);

    browserSync({
        port: 6600,
        files: ['./dist/**/*.js', './dist/**/*.css'],
        injectChanges: true,
        logFileChanges: false,
        logLevel: 'silent',
        notify: true,
        reloadDelay: 0,
        server: {
            baseDir: ['./']
        }
    });
});

gulp.task('default', ['serve']);