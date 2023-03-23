
var inquirer = require('./node_modules/inquirer');
var {baseFilesReaname} = require('./utils.js');

var default_config = {
    baseUrl: '', // 源路径
    type: '', // 更名类型
    repstr: '', // 更换字符串
    separator: '', // 分隔符
    excludeType: [] // 排除文件类型
};

async function main(){
    await pathInput()
    baseFilesReaname(default_config)
};

async function pathInput() {
    let result = await inquirer.prompt([
        {
            name: 'baseUrl',
            type: 'input',
            message: 'please input source file path?'
        },
        {
            name: 'type',
            type: 'list',
            message: 'please choose type?',
            choices: ['all', 'before', 'after'],
            default: 0
        },
        {
            name: 'repstr',
            type: 'input',
            message: 'please input replace string?'
        },
        {
            name: 'separator',
            type: 'input',
            message: 'please input separator string?'
        },
        {
            name: 'excludeType',
            type: 'input',
            message: "please input exclude file types separate with ,?  eg: 'css,png,pdf'"
        }
    ]);
    const excludeType = result.excludeType.trim() && result.excludeType.split(',') || []
    const baseUrl = result.baseUrl.trim() && result.baseUrl.replaceAll('\\', '/')
    default_config = {
        ...default_config,
        ...result,
        baseUrl,
        excludeType
    }
};

module.exports = {
    main,
    start: baseFilesReaname
};