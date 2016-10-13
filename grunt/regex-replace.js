module.exports = {
    dist: {
        src: ['dist/scripts/scripts.js', 'dist/index.html'],
        actions: [{
                search: '@build.revision@',
                replace: '<%= grunt.config("build.revision") %>'
            },
            {
                search: '<base href="/">',
                replace: '<base href="/navigo/">'
            }
        ]
    }
};