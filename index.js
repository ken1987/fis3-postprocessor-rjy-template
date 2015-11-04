var template = require('./template.js');

module.exports = function(content, file, settings) {
    content = content.replace(/<\!--@@tmpl_start(:.*)?-->([\s\S]*?)<\!--@@tmpl_end-->/g, function(str, _1, _2) {
        var jsonStr = _1,
            json;
        //是否捕获到
        if (_1 && _1.length > 1) {
            //是否是正确的json格式
            try {
                json = JSON.parse(_1.substr(1));
            } catch (e) {
                console.log("解析json字符串时出错！");
                return _2;
            }
            return template.compile(_2)(json);
        } else {
            return _2;
        }
    });
    return content;
};

