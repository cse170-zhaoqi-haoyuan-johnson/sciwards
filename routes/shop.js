var fs = require('fs');
var shop = require('../data/shop.json');
exports.view = function (req, res) {
    console.log("loading the nav bar");
    res.render('shop_page', shop);
}

exports.levelUp = function (req, res, next) {
    fs.readFile('data/data.json', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            var obj = JSON.parse(data);
            console.log(req.body.price);
            var inData = 0;
            for (var i = 0; i < obj.table.length; i++) {
                if (req.session.name == obj.table[i].name) {
                    obj.table[i].level += 1;
                    obj.table[i].score = req.body.point;
                    obj.table[i].nextLevelExp = req.body.updatedNextLevelExp;
                }
            }
            var json = JSON.stringify(obj);
            fs.writeFileSync('data/data.json', json);
            res.redirect(req.get('referer'));
        }
    });
}

exports.setGoal = function (req, res, next) {
    fs.readFile('data/data.json', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            var profile;
            var obj = JSON.parse(data);
            var inData = 0;
            for (var i = 0; i < obj.table.length; i++) {
                if (req.session.name == obj.table[i].name) {
                    obj.table[i].reward = req.body.reward;
                    profile = obj.table[i];
                }
            }
            var json = JSON.stringify(obj);
            fs.writeFileSync('data/data.json', json);
            res.redirect(req.get('referer'));
        }
    });
}
