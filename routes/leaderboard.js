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
exports.buy = function (req, res) {
    var gold = req.body.something;
    var url = req.body.url;
    fs.readFile('data/data.json', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            var profile;
            var obj = JSON.parse(data);
            var inData = 0;
            for (var i = 0; i < obj.table.length; i++) {
                if (req.session.name == obj.table[i].name) {
                    obj.table[i].gold -= parseInt(gold);
                    obj.table[i].items.push(url);
                    obj.table[i].netWorth += parseInt(gold);
                    profile = obj.table[i];
                }
            }
            var json = JSON.stringify(obj);
            fs.writeFileSync('data/data.json', json);
            console.log("Wrote: " + profile.name + " to file!!!");
            console.log("Gold: " + profile.gold);
            console.log("Items: " + profile.items);
        }

    });
}
