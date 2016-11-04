var projects_list = require("../data/projects.json");
var fs = require('fs');
var rewards = require('../data/rewards.json');
exports.view = function (req, res) {
    console.log("loading the nav bar");
    fs.readFile('data/data.json', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            var profile;
            var obj = JSON.parse(data);
            console.log("REWARD ! " + rewards.rewards[1].name);
            var inData = 0;
            var goal;
            for (var i = 0; i < obj.table.length; i++) {
                if (req.session.name == obj.table[i].name) {
                    for (var j = 0; j < rewards.rewards.length; j++)
                        if (obj.table[i].reward == rewards.rewards[j].name) {
                            //projects_list.push(rewards.rewards[j].name);
                            goal = rewards.rewards[j];
                        }
                }
            }
            var home_data = {
                projects: projects_list,
                rewards: goal
            };
            res.render('home_page', home_data);
        }

    });

}
