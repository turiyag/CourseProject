/* Author: Mitchell Ludwig
 This is an example of how to use cookies to persist a session, and also uses the principles of dynamic page generation and URL encoded parameters
*/

var pagemaker = require('pagemaker');
var url = require('url');
var upops = require('uploadOps.js');

exports.getReq = function (request,response) {
    console.log("GETREQUEST!!!");
    try {
        console.log(url);
        console.log(url.parse);
        console.log(url.parse(request.url, true));
        console.log(url.parse(request.url, true).query);
        var params = url.parse(request.url, true).query;

        var cookies = upops.parseCookies(request.headers);
        console.log("parameters are:");
        console.log(params);
        console.log("cookies are: ");
        console.log(cookies);
        
        if (params.user!=undefined) {
            console.log("Redirecting with user");
            var userCookie = "user="+params.user;
            console.log(userCookie);
            response.writeHead(301, {'Location': 'example.js', 'Content-Type': 'text/html', 'Set-Cookie': 'user='+params.user});
            response.end();
        } else {
            if (params.logout!=undefined) {
                console.log("Logging out");
                response.writeHead(301, {'Location': 'example.js', 'Content-Type': 'text/html', 'Set-Cookie': 'user=' + params.user + '; expires=Thu, 01-Jan-1970 00:00:01 GMT;'});
                response.end();
            } else if (cookies.user!=undefined) {
                console.log("Printing username");
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write('<form method=get name=upform action="example.js"><input type="submit" name="logout" value="Logout" /></form>');
                response.end("<p>Your username is " + cookies.user + '</p>');
            } else {
                console.log("Redirecting no user");
                response.writeHead(301, {'Location': 'index.html', 'Content-Type': 'text/html'});
                response.end();
            }
        }
    } catch (err){
        console.log(err);
    }
}

exports.postReq = function (request,response) {
    console.log("POSTINGS!");
    var params = url.parse(request.url,true).query;
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(request.headers);
}
