

const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const gulp = require('gulp');
const gutil = require('gulp-util');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const scss = require('postcss-scss');
const uglify = require('gulp-uglify');
var tailwindcss = require('tailwindcss');
const rename = require('gulp-rename');
const options = require('./package.json').options; //Options : paths and other options from package.json
const purgecss = require('gulp-purgecss'); //To Remove Unsued CSS
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const noop = require('gulp-noop');
const htmlclean = require('gulp-htmlclean');
const terser = require('gulp-terser');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-z0-9-:\/]+/g);
    }
}

gulp.task('connect', function () {
    connect.server({
        root: './src',
        port: 4000,
        livereload: true
    });
});

gulp.task('img', function () {
    gulp.src('src/img/**/*')
        // .pipe(newer('src/img'))
        // .pipe(imagemin({ optimizationLevel: 5 }))
        // .pipe(gulp.dest('src/img'))
        .pipe(gulp.dest('src/dist/img'));
});

gulp.task('html', function () {
    gulp
        .src(options.paths.src.base + '/**/*.html')
        .pipe(newer('src/dist/'))
        // .pipe(gulp.dest('src/dist/'))
        .pipe(connect.reload());
});

gulp.task('build-html', function () {
    gulp
        .src(options.paths.src.base + '/**/*.html')
        .pipe(newer('src/dist/'))
        .pipe(htmlclean())
        .pipe(gulp.dest('src/dist/'));
});

gulp.task('css', function () {
    gulp
        .src('src/css/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', gutil.log))
        .pipe(postcss([
            tailwindcss(options.config.tailwindjs),
            autoprefixer(),
            mqpacker,
            cssnano
        ], { syntax: scss }))
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('src/dist/css'))
        .pipe(gulp.dest('src/css'))
        .pipe(connect.reload());

});

gulp.task('js', function () {
    gulp
        .src('src/js/main.js')
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(concat('app.js'))
        // .pipe(terser())
        .pipe(uglify())
        .pipe(connect.reload())
        .pipe(gulp.dest('src/dist/js'))
        .pipe(gulp.dest('src/js'));
});

gulp.task('font', function () {
    gulp
        .src('src/font/*')
        .pipe(gulp.dest('src/dist/font'));
});

//Compiling styles
gulp.task('build-styles', function () {
    gulp
        .src('src/dist/**/*')
        .pipe(purgecss({
            content: ["src/**/*.html", "src/**/.*js"],
            extractors: [{
                extractor: TailwindExtractor,
                extensions: ['html']
            }]
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('src/dist/'));
});

gulp.task('watch', function () {
    gulp.watch('src/img/*', ['img']);
    gulp.watch('src/css/*.scss', ['css']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch("src/*.html", ['html']);
});

gulp.task('deploy', ['font', 'img', 'css', 'build-styles', 'js', 'build-html']);

gulp.task('default', ['connect', 'css', 'build-styles', 'js', 'watch']);