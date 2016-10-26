
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