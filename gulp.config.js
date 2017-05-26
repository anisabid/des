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
        tpl:{
            src: './src/tpl/',
            input: './src/tpl/*.html',
            output: './demo/pages/',
            watch: ['./src/tpl/**/*']
        },
        lib: [
            {
                src: 'bower_components/jquery/dist/jquery.min.js',
                dist: './dist/lib/jquery/'
            },
            {
                src: 'bower_components/vue/dist/vue.min.js',
                dist: './dist/lib/vue/'
            },
            {
                src: 'bower_components/bootstrap/dist/js/bootstrap.min.js',
                dist: './dist/lib/bootstrap/'
            },
            {
                src: 'bower_components/select2/dist/js/select2.min.js',
                dist: './dist/lib/select2/'
            },
            {
                src: 'bower_components/select2/dist/js/select2.full.min.js',
                dist: './dist/lib/select2/'
            },
            {
                src: 'bower_components/select2/dist/css/select2.min.css',
                dist: './dist/lib/select2/'
            },
            {
                src: 'bower_components/font-awesome/fonts/*',
                dist: './dist/fonts/'
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
            },
            {
                src: 'bower_components/jquery.scrollbar/jquery.scrollbar.min.js',
                dist: './dist/lib/jquery.scrollbar/'
            }
        ]
    };
    return config;
}