UI 文档地址
https://ng.ant.design/docs/getting-started/zh


淘宝镜像
单次使用
$  npm install --registry=https://registry.npm.taobao.org
永久使用
在开发react-native的时候，不要使用cnpm！cnpm安装的模块路径比较奇怪，packager不能正常识别。所以，为了方便开发，我们最好是直接永久使用淘宝的镜像源

直接命令行的设置

$ npm config set registry https://registry.npm.taobao.org

npm install