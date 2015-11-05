var template = require('./template.js');

module.exports = function(content, file, settings) {
    var info = fis.uri('/test/config.json');
    var configFile = fis.file(info.file.origin);
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
