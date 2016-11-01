/*
 * GET home page.
 */
var data = require('../data/data.json');
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
    console.log("loading the nav bar");
    var profile;
    for (var i = 0; i < data.table.length; i++) {
        if (req.session.name == data.table[i].name)
            profile = data.table[i];
        console.log(data.table[i].name);
    }
    console.log(profile);
    res.render('persistent_tab', profile);
}
