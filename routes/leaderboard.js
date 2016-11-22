var fs = require('fs');
exports.view = function (req, res) {
    fs.readFile('data/data.json', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            var jdata = JSON.parse(data);
            console.log("loading the nav bar");
            jdata.table.sort(function (a, b) {
                return parseFloat(b.netWorth) - parseFloat(a.netWorth);
            });
            res.render('leaderboard_page', jdata);
        }
    });
}