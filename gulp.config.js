module.exports = function () {
    var config = {
        dist: 'dist/',
        src: 'src/',
        sass: {
            src: './src/sass/',
            input: './src/sass/style.scss',
            output: './dist/css/',
            watch: ['./src/sass/**/*.sass', './src/sass/**/*.scss']
        },
        js: {
            src: './src/js/',
            input: './src/js/**/*.js',
            output: './dist/js/',
            watch: ['./src/js/**/*.js']
        },
        img: {
            src: './src/img/',
            input: './src/img/**/*.*',
            output: './dist/img/',
            watch: ['./src/img/*']
        },
        lib: [
            {
                src: 'bower_components/jquery/dist/jquery.min.js',
                dist: './dist/lib/jquery/'
            },
            {
                src: 'bower_components/bootstrap/dist/js/bootstrap.min.js',
                dist: './dist/lib/bootstrap/'
            },
            {
                src: 'bower_components/font-awesome/fonts/*',
                dist: './dist/fonts/awesome/'
            },
            {
                src: 'bower_components/moment/min/moment.min.js',
                dist: './dist/lib/moment/'
            },
            {
                src: 'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                dist: './dist/lib/datetimepicker/'
            },
            {
                src: 'bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                dist: './dist/lib/datetimepicker/'
            }
        ]
    };
    return config;
}