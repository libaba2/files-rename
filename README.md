#### files-rename 批量重命名文件
#### 安装
> npm install renamefs -g

#### 使用

```javascript
const {main} = require('renamefs');
main();
// or 命令行执行
@renamefs start
```


#### 参数配置
```javascript
var config = {
    baseUrl: 'E:/images/', // 源路径 E:/images/
    type: 'before', // str出现的位置 all/before/after
    repstr: 'img', // 更换字符串
    separator: '-', // 分隔符
    excludeType: [] // 排除文件类型 英文逗号隔开 css,pdf,excel
}
// type: 'all' 直接替换
// test_color.png office_img.png
// 更改为 img-0.png img-1.png

// type: 'before' 原名称前
// test_color.png
// 更改为 img-test_color.png

// type: 'after' 原名称后
// test_color.png
// 更改为 test_color-img.png

```

###### 注意：路径最后需加 /
