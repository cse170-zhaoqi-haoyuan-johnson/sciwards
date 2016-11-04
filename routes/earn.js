/*
 * GET home page.
 */
var fs = require('fs');
exports.view = function (req, res) {
    var projectName = req.params.projectName;
    console.log("Project is " + projectName);
    res.render('earn_page', {
        'projectName': projectName
    });
};
exports.viewEmpty = function (req, res) {
    console.log("Project is emtpy");
    res.render('earn_page', {
        'projectName': ''
    });
};
exports.nav = function (req, res) {
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
            console.log("in NAV");
            //console.log("Wrote in nav:" + profile.name + " to file!!!");
            //console.log("Score in nav:     " + profile.score);
            res.render('persistent_tab', profile);
            //res.redirect(req.get('/nav'));
        }

    });
}
exports.point = function (req, res) {
    var point = req.body.point;
    fs.readFile('data/data.json', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            var profile;
            var obj = JSON.parse(data);
            var inData = 0;
            for (var i = 0; i < obj.table.length; i++) {
                if (req.session.name == obj.table[i].name) {
                    obj.table[i].score += 5;
                    profile = obj.table[i];
                }
            }
            var json = JSON.stringify(obj);
            fs.writeFileSync('data/data.json', json);
            console.log("Wrote:" + profile.name + " to file!!!");
            console.log("Score:     " + profile.score);
            //res.render('persistent_tab', profile);
            res.redirect(req.get('referer'));
        }

    });

}
