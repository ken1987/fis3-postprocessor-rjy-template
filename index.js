var template = require('./template.js');
var reg = /<\!--rjy_template_start:(.*?)-->([\s\S]*?)<\!--rjy_template_end-->/g; //匹配内容

module.exports = function(content, file, settings) {
    return content.replace(reg, function(all, str, tmpl) {
        //解析str
        var options = {},
            arr = str.split("&"),
            i, l, n;
        for (i = 0, l = arr.length; i < l; i++) {
            n = arr[i].split("=");
            options[n[0]] = n[1];
        }

        //如果存在文本，说明是简单数据
        var json, path, newFile;
        if (options.text !== void 0) {
            json = str;
        } else if (options.url !== void 0) {
            path = fis.uri(options.url, file.dirname); //获取绝对路径
            newFile = fis.file(path && path.file ? path.file.origin : ""); //获取文件
            if (newFile.exists()) {
                try {
                    json = JSON.parse(newFile && newFile.getContent());
                } catch (e) {
                    console.error("\n " + str + "：解析json字符串时出错，请检查数据格式！");
                }

                if (options.id !== void 0) {
                    var ids = options.id.split(".");
                    for (i = 0, l = ids.length; i < l; i++) {
                        json = json && json[ids[i]];
                    }
                }
            }
        }

        //解析数据
        if (json == void(0)) {
            return tmpl;
        } else {
            return template.compile(tmpl)(json);
        }
    });
};
