var fs = require("fs");
/**
 * @description: 获取文件信息
 * @param {string} filesUrl 文件路径
 * @return Promise()
 */
const getFileInfo = (filesUrl) => {
  return new Promise((resolve, reject) => {
    fs.stat(filesUrl, function (err, stats) {
      if (!err) {
        resolve(stats.isFile()); //  是否为文件
      } else {
        reject(null);
      }
    });
  });
};
/**
 * @description: 读取文件列表
 * @param {string} filesUrl 文件路径
 * @return Promise()
 */
const readdir = (filesUrl) => {
  return new Promise((resolve, rejcet) => {
    fs.readdir(filesUrl, function (err, files) {
      if (!err) {
        let newFiles = [];
        let resFiles = [];
        for (let i = 0; i < files.length; i++) {
          const element = files[i];
          const baseUrl = filesUrl + "/" + element;
          resFiles.push(getFileInfo(baseUrl));
        }
        Promise.all(resFiles).then((e) => {
          for (let i = 0; i < files.length; i++) {
            const element = files[i];
            if (e[i]) {
              newFiles.push(filesUrl + "/" + element);
            }
          }
          resolve(newFiles); // 只返回文件
        });
      }
    });
  });
};
/**
 * @description: 修改文件名
 * @param {string} oldFileUrl 旧文件路径数组
 * @param {string} type 新命名模式（前缀or后缀，after or before）
 * @param {string} repstr 添加命名字符串
 * @param {string} separator 分隔符
 * @param {string[]} includeType 文件类型数组
 * @param {string[]} excludeType 排除文件类型数组
 * @return Undefined
 */
const renameFile = (
  oldFileUrl,
  type,
  repstr,
  separator,
  includeType,
  excludeType
) => {
  if (oldFileUrl.length === 0) return;
  try {
    for (let i = 0; i < oldFileUrl.length; i++) {
      const element = oldFileUrl[i];
      let fileType = element.split(".").pop(); // 文件类型
      let filePath = element.substr(0, element.lastIndexOf(".")); // 文件路径
      let fileBasePath = filePath.substr(0, element.lastIndexOf("/")); // 文件父目录
      let fileName = filePath.substr(element.lastIndexOf("/") + 1); // 文件名
      let newName = "";
      if (excludeType && excludeType.includes(fileType) || includeType && !includeType.includes(fileType)) continue;
      if (type === "before") {
        newName = repstr + separator + fileName;
      } else if (type === "after") {
        newName = fileName + separator + repstr;
      } else {
        newName = repstr + separator + i;
      }
      fs.rename(element, fileBasePath + "/" + newName + "." + fileType, () => {
        console.log(fileName + "已重命名！");
      });
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * @description: 重命名
 * @param {object} 
    baseUrl 修改文件夹路径
    type 修改方式 all before after 
    repstr 文件名字符串
    separator 间隔符
    excludeType 排除修改类型
 * @return {*}
 */
const baseFilesReaname = ({
  baseUrl,
  type,
  repstr,
  separator,
  includeType,
  excludeType,
}) => {
  readdir(baseUrl).then((e) => {
    renameFile(e, type, repstr, separator, includeType, excludeType);
  });
};
module.exports = {
  baseFilesReaname,
};
