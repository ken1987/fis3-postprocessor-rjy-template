# fis3-postprocessor-rjy-template

纯前端的模版动态加载方案。

>标准化后对预处理过的模版进行动态绑定。
>与fis3-preprocessor-rjy-template配合使用。

```script
npm install fis3-postprocessor-rjy-template -g
````

##模版引擎

**arttemplate** https://github.com/aui/artTemplate

## fis-conf.js中使用

```javascript
fis.match('**.html', {
    postprocessor: fis.plugin('rjy-template')
});
```
