var template = require('./template.js');

module.exports = function(content, file, settings) {
    //获取配置文件路径信息
    var path;
    content.replace(/<\!--\s*tmpl-config=('|")([\s\S]*?)\1\s*-->/g, function(str, _1, _2) {
        path = fis.uri(_2, file.dirname);
        return "";
    });
    var configFile = fis.file(path.file.origin);
    var json;

    //配置文件存在
    if (configFile.exists) {
        //是否是正确的json格式
        try {
            json = JSON.parse(configFile.getContent());
        } catch (e) {
            json = {};
            console.error("解析json字符串时出错！");
        }
    }
    return content.replace(/<\!--@@tmpl_start:(.*?)-->([\s\S]*?)<\!--@@tmpl_end-->/g, function(str, _1, _2) {
        return template.compile(_2)(json[_1]);
    });
};
