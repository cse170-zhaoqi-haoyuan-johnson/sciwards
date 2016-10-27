
/*
 * GET home page.
 */

exports.view = function(req, res){
  var projectName = req.params.projectName;
  console.log("Project is " + projectName);
  res.render('earn_page', {
  	'projectName': projectName
  });
};
exports.nav = function(req,res){
	console.log("loading the nav bar");
	res.render('persistent_tab');
}