var fs = require('fs'),
readline = require('readline');

exports.getPropertiesFiles = function (dir) {
    return getFiles(dir, 'properties');
};

var getFiles = function (dir, extension) {
    if (!fs.existsSync(dir)) {
        console.error('The src directory [ ' + dir + ' ] does not exist.');
        return;
    }

    // Set the regex to match any string ending with .json
    var regex = new RegExp('\\.' + extension);
    // Retrieve all the files in the directory
    var files = fs.readdirSync(dir);
    // The identified json file names
    var _files = [];
    if (files) {
        files.forEach(function (file) {
            if (regex.test(file)) {
                _files.push(file);
            }
        });
    }
    return _files;
};

exports.writeAsJson = function (dir, file, json) {
    if (!fs.existsSync(dir)) {
        console.error('The output directory [ ' + dir + ' ] is not a valid directory');
        return;
    }

    var fileName = file.substr(0, file.length - 11); //Omit the .properties extension from the file name
    var writeStream = fs.createWriteStream(dir.concat('\\').concat(fileName.concat('.json')), {
        autoClose: false
    });

    writeStream.write(json);
    writeStream.end();
};