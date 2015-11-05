var template = require('./template.js');

module.exports = function(content, file, settings) {
    var regConfig = /<\!--\s*tmpl-config=('|")([\s\S]*?)\1\s*-->/g; //匹配配置文件路径
    var regContent = /<\!--@@tmpl_start:(.*?)-->([\s\S]*?)<\!--@@tmpl_end-->/g; //匹配内容
    var json = {};
    var configFile;
    var path;

    //获取配置文件路径信息
    content.replace(regConfig, function(str, _1, _2) {
        path = _2;
        return "";
    });

    //获取配置文件
    if (path !== void 0) {
        path = fis.uri(path, file.dirname);
        configFile = fis.file(path && path.file ? path.file.origin : "");

        //配置文件存在
        if (configFile.exists()) {
            //是否是正确的json格式
            jsonStr = configFile.getContent();
            try {
                json = JSON.parse(jsonStr);
            } catch (e) {
                console.error("fis3-postprocessor-rjy-template：解析json字符串时出错！");
            }
        }
    }

    return content.replace(regContent, function(str, _1, _2) {
        return template.compile(_2)(json[_1]);
    });
};
