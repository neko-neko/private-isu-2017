const request = require('request');
const fs = require('fs');
const phantom = require('phantom');

var _phantom, _page;
phantom.create().then(ph => {
  _phantom = ph;
  return _phantom.createPage();
}).then(page => {
  _page = page;
  return _page.open(process.env.PORTAL_URL);
}).then(status => {
  const loginId = process.env.PORTAL_LOGIN_ID;
  const loginPassword = process.env.PORTAL_LOGIN_PASSWORD;

  _page.property('viewportSize', {width: 1280, height: 1024})
  _page.evaluate(function(loginId, loginPassword) {
    $('input[name="user[email]"]').val(loginId);
    $('input[name="user[password]"]').val(loginPassword);
    $("#new_user").submit();
  }, loginId, loginPassword);
}).then(() => {
    setTimeout(() => {
    _page.render('portal.png');
    options = {
      token: process.env.SLACK_TOKEN,
      filename: '定期POSTだよ！',
      file: fs.createReadStream('./portal.png'),
      channels: 'isucon2017'
    };
    request.post({url: 'https://slack.com/api/files.upload', formData: options}, function(error, response, body) {
      if (!error && response.statusCode == 200) {
      console.log('ok');
      } else {
      console.log('status code: ' + response.statusCode);
      }
    });
    _page.close();
    _phantom.exit();
  }, 5000);
});
