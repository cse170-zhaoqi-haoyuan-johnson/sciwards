var projects_list = require("../data/projects.json");

exports.view = function (req, res) {
    console.log("loading the nav bar");

    res.render('home_page', projects_list);
}
