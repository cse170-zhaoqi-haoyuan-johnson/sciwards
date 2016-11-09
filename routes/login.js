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
                            score: 0,
                            level: 1,
                            reward: "/Images/Avatars/avatar_1.png",
                            nextLevelExp: 15
                        });
                        var json = JSON.stringify(obj);
                        fs.writeFileSync('data/data.json', json);
                        console.log("Wrote:" + req.body.username + " to file!!!");
                    }
                }
            });
        } else {
            console.log("DATA FILE DOES NOT EXIST!!!!!!");
        }
        req.session.name = req.body.username;
        req.session.score = 0;
        res.redirect('/home');
    });

};
