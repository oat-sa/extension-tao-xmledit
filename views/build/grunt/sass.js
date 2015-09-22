module.exports = function(grunt) {

    var sass    = grunt.config('sass') || {};
    var watch   = grunt.config('watch') || {};
    var notify  = grunt.config('notify') || {};
    var root    = grunt.option('root') + '/xmlEdit/views/';

    //override load path
    sass.xmledit = {
        options : {
            loadPath : ['../scss/', '../js/lib/', root + 'scss/inc', root + 'scss/qti']
        },
        files : {}
    };

    //files goes heres
    sass.xmledit.files[root + 'css/editor.css'] = root + 'scss/editor.scss';
    watch.xmleditsass = {
        files : [root + 'scss/**/*.scss'],
        tasks : ['sass:xmledit', 'notify:xmleditsass'],
        options : {
            debounceDelay : 500
        }
    };

    notify.xmleditsass = {
        options: {
            title: 'Grunt SASS',
            message: 'SASS files compiled to CSS'
        }
    };

    grunt.config('sass', sass);
    grunt.config('watch', watch);
    grunt.config('notify', notify);

    //register an alias for main build
    grunt.registerTask('xmleditsass', ['sass:xmledit']);
};
