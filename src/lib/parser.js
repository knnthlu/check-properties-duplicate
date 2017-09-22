var files = require('./files');
var glob = require('glob');  

var getDuplicate = function(lines){
    var output = {};
    var _temp = [];
    
    lines.forEach(function (line) {
        var divider = line.indexOf('='); 
        var key = line.slice(0, divider);
        var value = line.slice(divider + 1);
        key = key.replace(/\s/g, '');
        if(key != ""){
            if(_temp.indexOf(key) === -1)
                _temp.push(key);
            else
                output[key] = value;
        }
    });
    return output;
}

exports.parsing = function(options){
    glob(options.src + '/**/*.properties', function(err, _files) {
        var propertiesFiles = _files;
        if (propertiesFiles) {
            propertiesFiles.forEach(function (file) {
                var new_dist = options.dist + file.substr(options.src.length);
                var promise = files.getFileDataAsLines(file);
                promise.then(function (lines) {
                    var duplicate = getDuplicate(lines);
                    files.writeAsJson(new_dist, JSON.stringify(duplicate, null, 4));
                });
            });
        }
    });
}

exports.setOption = function(options){
    var location = {
        src: options.src, 
        dist: options.dist 
    }
    exports.parsing(location);
}