var http = require('http');
var qs = require('querystring');
var urlModule = require('url');


exports.queryDataByGet = function(url,data,fn){
    data=data||{};
    var content=qs.stringify(data);
    var parse_u=urlModule.parse(url,true);

    var options = {
        host:parse_u.hostname,
        port:parse_u.port||80,
        path: parse_u.path + '?' + content,
        method: 'GET'
    };

    var req = http.request(options, function (res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        var returnGetData = "";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            returnGetData = returnGetData + chunk;
            // console.log('chunk: ' + chunk);
        }).on('end', function (){
            fn!=undefined && fn(JSON.parse(returnGetData));
            // console.log('returnGetData: ' + returnGetData);
        });
    });

    req.on('error', function (e) {
        // console.log('problem with request: ' + e.message);
    });

    req.end();
};

exports.queryDataByPost = function(url,data,fn){
    data=data||{};
    var content=qs.stringify(data);
    var parse_u=urlModule.parse(url,true);

    var options = {
        host:parse_u.hostname,
        port:parse_u.port||80,
        path:parse_u.path,
        method:'POST',
        headers: {
            'Connection':'Keep-Alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            "Content-Length": content.length
        }
    };

    var req = http.request(options, function (res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        var returnPostData = "";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            returnPostData = returnPostData + chunk;
            // console.log('chunk: ' + chunk);
        }).on('end', function (){
            fn!=undefined && fn(JSON.parse(returnPostData));
            // console.log('returnPostData: ' + returnPostData);
        });
    });

    req.on('error', function (e) {
        // console.log('problem with request: ' + e.message);
    });

// write data to request body
    req.write(content);

    req.end();

};

exports.queryByPost = function(url,data,fn){
    data=data||{};
    var content=qs.stringify(data);
    var parse_u=urlModule.parse(url,true);
    var isHttp=parse_u.protocol=='http:';

    var options={
        host:parse_u.hostname,
        port:parse_u.port||(isHttp?80:443),
        path:parse_u.path,
        method:'POST',
        headers:{
            'Connection':'Keep-Alive',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length':content.length
        }
    };

    var req = require(isHttp?'http':'https').request(options,function(res){
        var _data='';
        res.on('data', function(chunk){
            _data += chunk;
        });

        res.on('end', function(){
            fn!=undefined && fn(JSON.parse(_data));
        });
    });

    req.write(content);

    req.end();
};
