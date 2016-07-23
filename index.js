var template = require('./template.js');
var reg = /<\!--rjy_template_start:(.*?)-->([\s\S]*?)<\!--rjy_template_end-->/g; //匹配内容

//获取数据解析代码
var getCode = function(url) {
    if (url !== void 0) {
        var info = fis.uri(url); //基于路径查找文件
        url = info && info.file && info.file.fullname; //获取全路径
        return url && require(url);
    }

    return;
};
//解析字符串
var parserStr = function(str) { 
    var arr = str.split("&"),
        options = {},
        i, l, n;
    for (i = 0, l = arr.length; i < l; i++) {
        n = arr[i].split("=");
        options[n[0]] = n[1];
    }
    return options;
};

module.exports = function(content, file, settings) {
    return content.replace(reg, function(all, str, tmpl) {
        //解析字符串
        var options = parserStr(str);

        //解析数据
        var json,
            dataParser = getCode(options.url);

        if (typeof dataParser == "function") {
            json = dataParser(file.url,options.id);
        }

        //返回结果
        if (json == void(0)) {
            return tmpl;
        } else {
            return template.compile(tmpl)(json);
        }
    });
};