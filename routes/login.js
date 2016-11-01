var fs = require('fs');

exports.post = function (req, res, next) {
    fs.exists('data/data.json', function (exists) {
        if (exists) {
            console.log("yes file exists ");
            fs.readFile('data/data.json', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    var obj = JSON.parse(data);
                    var inData = 0;
                    for (var i = 0; i < obj.table.length; i++) {
                        if (req.body.username == obj.table[i].name)
                            inData = 1;
                    }
                    if (inData == 0) {
                        obj.table.push({
                            name: req.body.username,
                            score: 0
                        });
                        var json = JSON.stringify(obj);
                        fs.writeFile('data/data.json', json);
                    }
                }
            });
        } else {
            console.log("DATA FILE DOES NOT EXIST!!!!!!");
        }
        res.redirect('/home');
    });

};
