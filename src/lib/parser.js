var files = require('./files');

var getDuplicateItem = function(keys, value, output){
    var key = keys[0];
    output[key] = value;
    return output;
}

var getDuplicate = function(lines){
    var output = {};
    var _temp = [];
    
    lines.forEach(function (line) {
        var divider = line.indexOf('='); 
        var key = line.slice(0, divider);
        var value = line.slice(divider + 1);
        key = key.trim();
        if(key != ""){
            if(_temp.indexOf(key) === -1)
                uniq_str.push(key);
            else
                getDuplicateItem(key, value, output);
        }
    });
}

exports.parsing = function(options){
    var propertiesFiles = files.getPropertiesFiles(options.src);

    if (propertiesFiles) {
        propertiesFiles.forEach(function (file) {
            var promise = files.getFileDataAsLines(options.src, file);
            promise.then(function (lines) {
                var duplicate = getDuplicate(lines);
                files.writeAsJson(options.dist, file, JSON.stringify(duplicate, null));
            });
        });
    }
}

exports.setOption = function(options){
    var location = {
        src: options.src, 
        dist: options.dist 
    }

    exports.parsing(location);
}