// Import packages
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');



// SASS -> CSS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");



//HTML
const htmlmin = require('gulp-htmlmin');


//JavaScript
const terser = require('gulp-terser');



//Image processing
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');




//Define variables
const src = './src';
const dest = './dist';





//Reload browser
const reload = (done) => {
    browserSync.reload();
    done();
};



//Serve dev-server
const serve = (done) => {
    browserSync.init({
        server: {
            baseDir: `${dest}`
        }
    });
    done();
};




//Compile SASS to CSS
const css = () => {
    return gulp.src(`${src}/sass/**/*.{sass,scss}`)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({ outputStyle: 'compressed' })).on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({basename: 'style', suffix: '.min' }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(`${dest}/css`));
}



//Compile HTML
const html = () => {
   // Find HTML
   return gulp.src(`${src}/*.html`)
        // Init Plumber
        .pipe(plumber())
        // Compile HTML to minified HTML
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            html5: true,
            removeEmptyAttributes: true,
            sortAttributes: true,
            sortClassName: true
        }))
        // Write everything to destination folder
        .pipe(gulp.dest(`${dest}`));
}


//JS
const js = () => {
    return gulp.src(`${src}/js/*.js`) // change to your source directory
      .pipe(terser())
      .pipe(gulp.dest(`${dest}/js`)); // change to your final/public directory
  }



//Optimize images
const imgopt = () => {
    return gulp.src(`${src}/assets/img/*.{jpg,png}`) // change to your source directory
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 2 }),
    ]))
    .pipe(gulp.dest(`${dest}/assets/img`))
}


//.jpg/.png to .webp
const webp = () => {
    return gulp.src(`${src}/assets/img/*.{jpg,png}`)
        .pipe(imagewebp())
        .pipe(gulp.dest(`${dest}/assets/img`))
}






// Copy assets
const assets = () => {
    return gulp.src(`${src}/assets/**`)
        .pipe(gulp.dest(`${dest}/assets`));
};



//Watch changes & refresh page
const watch = () => gulp.watch(
    [
        `${src}/*.html`,
        `${src}/js/*.js`,
        `${src}/sass/**/*.{sass,scss}`,
        `${src}/img/**/*.{jpg,png,svg}`,
        `${src}/assets/**/*.*`
    ],
    gulp.series(
        css,
        html,
        js,
        imgopt,
        webp,
        assets,
        reload
    ));



//Development Tasks
const dev = gulp.task('dev', gulp.series(gulp.parallel(css, html, js, imgopt, webp, assets, reload), serve, watch));


//Build Tasks
const build = gulp.task('build',
    gulp.parallel(
        css,
        html,
        js,
        imgopt,
        webp,
        assets
    ));

// Default function (used when type "gulp")
exports.default = dev;
exports.dev = dev;
exports.build = build;
