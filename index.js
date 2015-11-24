var template = require('./template.js');
var reg = /<\!--rjy_template_start:(.*?)-->([\s\S]*?)<\!--rjy_template_end-->/g; //匹配内容

module.exports = function(content, file, settings) {
    return content.replace(reg, function(all, str, tmpl) {
        var json, path, newFile;
        //如果是url(path)格式，表示传入的是路径，否则是字符串
        if (/^url\(.*\)/.test(str)) {
            path = fis.uri(str.substr(4, str.length - 5), file.dirname); //获取绝对路径
            newFile = fis.file(path && path.file ? path.file.origin : ""); //获取文件
            if (newFile.exists()) {
                try {
                    json = JSON.parse(newFile && newFile.getContent());
                } catch (e) {
                    console.error("\n fis3-postprocessor-rjy-template：解析json字符串时出错，请检查数据格式！");
                }
            }
        } else {
            json = str;
        }
        if (json == void(0) || json === "") {
            console.error("\n fis3-postprocessor-rjy-template：数据不存在！");
            return tmpl;
        } else {
            return template.compile(tmpl)(json);
        }
    });
};
