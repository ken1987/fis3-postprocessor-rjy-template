# fis3-postprocessor-rjy-template

纯前端的模版动态加载方案，即标准化后对特定模版进行动态绑定。

## 安装

待完善

## 使用

fis-conf.js中

```javascript
fis.match('**.html', {
    postprocessor: fis.plugin('rjy-template')
});
```

模板页中

**`@@tmpl_start:`后面跟着的必须是json字符串**

```html
<!--@@tmpl_start:{"name":"value"}-->
<link rel="import" href="/path/template.tpl?__inline">
<!--@@tmpl_end-->
```
