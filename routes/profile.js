var fs = require('fs');
exports.view = function (req, res) {
    fs.readFile('data/data.json', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            var profile;
            var obj = JSON.parse(data);
            for (var i = 0; i < obj.table.length; i++) {
                if (req.session.name == obj.table[i].name) {
                    profile = obj.table[i];
                }
            }
            res.render('profile_page', profile);
        }

    });

};
