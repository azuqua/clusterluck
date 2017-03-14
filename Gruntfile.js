var path = require("path"),
  _ = require("lodash");

module.exports = function (grunt) {
  var files = [
    "lib/conn.js",
    "lib/chash.js",
    "lib/vclock.js",
    "lib/kernel.js",
    "lib/gossip.js",
    "lib/table.js",
    "lib/gen_server.js"
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    jsdoc: {
      dist: {
        src: files,
        options: {
          destination: "doc",
          configure: ".jsdoc.conf.json"
        }
      }
    },
    jsdoc2md: {
      separateOutputFilePerInput: {
        files: files.map((file) => {
          var path = file.split("/");
          var last = _.last(path);
          last = last.slice(0, last.length-3) + ".md";
          path[path.length-1] = last;
          return {src: file, dest: "doc/" + _.drop(path).join("/")};
        })
      }
    }
  });

  grunt.loadNpmTasks("grunt-jsdoc");
  grunt.loadNpmTasks("grunt-jsdoc-to-markdown");
  // create documentation
  grunt.registerTask("docs", ["jsdoc"]);
  grunt.registerTask("md", ["jsdoc2md"]);
  
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-mocha-test");
};