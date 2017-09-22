var fs = require('fs'),
readline = require('readline'),
mkdirp = require('mkdirp');

exports.getFileDataAsLines = function (dir) {
    var fullPath = dir;
    if (!fs.existsSync(fullPath)) {
        console.error('The file identified by the full path [ ' + fullPath + ' ] is not found.');
        return;
    }

    var inputStream = fs.createReadStream(fullPath);
    var reader = readline.createInterface({
        input: inputStream
    });

    var lines = [];
    reader.on('line', function (line) {
        lines.push(line);
    });

    var promise = new Promise(function (resolve) {
        reader.on('close', function () {
            resolve(lines);
        });
    });

    return promise;
};

var createFile = function(full_dir, json){
    var writeStream = fs.createWriteStream(full_dir, {
        autoClose: false
    });
    writeStream.write(json);
    writeStream.end();

};

exports.writeAsJson = function (dir, json) {
    var fileName = dir.substr(0, dir.length - 11); //remove .properties extension from the file name
    var full_dir = fileName.concat('.json');

    var get_location = full_dir.split('/');
    var get_location_length = get_location[get_location.length - 1].length;
    get_location = full_dir.substr(0, full_dir.length - get_location_length);
    if (!fs.existsSync(get_location)) {
        mkdirp(get_location, function (err) {
            if(err) 
                console.error(err);
            else
                createFile(full_dir, json);
        });
    } else 
        createFile(full_dir, json);
};