#### 批量文件重新命名，当然没有你想象的那么强大

当一个文件夹里面有许多图片而且文件名很杂（有符号/中文等），也许可以帮到你。虽然说不能按照文件内容命名，但可以添加前缀看着更加整齐、美观。

#### Install

> npm install renamefs -g

#### Use

```javascript
// 交互式 手动入参
const { main } = require('renamefs');
main();

// 代码入参
const { start } = require('renamefs');
start(config);

// 全局命令行执行，执行效果和第一种一样，只是不用跑代码哟
renamefs
```

#### Prop

|参数|说明|类型|可选值|默认值|
|--|--|--|--|--|
|baseUrl|要更新的文件夹路径（注意是文件夹路径），更新文件夹下所有满足条件的文件名|String|-|-|
|type |更新文件名类型（全替换/原文件名前/原文件名后）|String|all/before/after|-|
|repstr|更新的字符串|String|-|-|
|separator|新名与旧名字之间的分隔符|String|-|-|
|includeType|更新的文件类型，只更新这些类型的文件名|String[]|-|[]|
|excludeType|不更新的文件类型|String[]|-|[]|

#### Eg

```javascript
var config = {
    baseUrl: 'E:/images/', // 源路径 E:/images/
    type: 'before', // str出现的位置 all/before/after
    repstr: 'img', // 更换字符串
    separator: '-', // 分隔符
    includeType: ['png'], // 交互式写字符串英文逗号隔开 css,pdf,excel
    excludeType: ['css','pdf'] // 排除文件类型 交互式英文逗号隔开 css,pdf,excel
}
// type: 'all' 直接替换原来文件名，
// test_color.png office_img.png
// 更改为 img-0.png img-1.png

// type: 'before' 原名称前用repstr + separator拼接
// test_color.png
// 更改为 img-test_color.png

// type: 'after' 原名称后用separator + repstr拼接
// test_color.png
// 更改为 test_color-img.png

```

###### 注：如果路径报错，请在路径最后加 /
