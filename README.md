# lylme-spage-template-dengtanet
六零导航页 模板 - 灯塔导航

## 项目介绍

灯塔导航是一个基于六零导航页（Lylme SPage）的主题模板，采用深色太空风格设计，提供美观、现代的导航起始页体验。

- **主题名称**：DengTaNet
- **版本**：1.1.0
- **作者**：灯塔导航页
- **演示网站**：[https://www.dengtanet.com](https://www.dengtanet.com)

## 功能特点

### 视觉设计
- ✅ 深色太空风格界面
- ✅ 动态背景和粒子效果
- ✅ 鼠标跟随光效
- ✅ 响应式设计，支持移动端
- ✅ 平滑的动画效果
- ✅ 渐变色彩和发光效果

### 核心功能
- ✅ 多搜索引擎切换
- ✅ 今日热榜集成（LyToday-JS插件）
- ✅ 分类导航菜单
- ✅ 网站链接列表
- ✅ 实时时间显示
- ✅ 随机一言（若启用）

### 技术特性
- ✅ 基于PHP和HTML5
- ✅ 使用现代CSS3特性
- ✅ 响应式布局
- ✅ 模块化设计
- ✅ 易于配置和定制

## 安装说明

### 前提条件
- 已安装六零导航页（Lylme SPage）系统
- PHP 5.6+ 环境
- 支持MySQL数据库

### 安装步骤
1. 下载本主题压缩包
2. 将主题文件上传到六零导航页的 `templates` 目录
3. 在后台管理中切换到本主题
4. 根据需要配置主题参数

## 主题配置

主题提供以下配置选项：

| 配置项 | 说明 | 默认值 |
|-------|------|-------|
| 首页标题 | 显示在搜索框上方的标题内容，支持HTML代码 | 继承系统配置 |
| 今日热榜 | LyToday-JS插件显示位置 | 关闭 |
| 今日热榜代码 | LyToday-JS插件自定义代码 | 默认为官方代码 |
| 背景图片位置 | 背景图片的滚动方式 | 跟随滚动 |
| 公安备案号 | 网站公安备案号，留空不显示 | 空 |

## 目录结构

```
lylme-spage-template-dengtanet/
├── css/             # 样式文件
│   └── style.css    # 主题样式
├── js/              # JavaScript文件
│   └── script.js    # 主题脚本
├── config.php       # 主题配置
├── footer.php       # 页脚文件
├── index.php        # 主页面
├── list.php         # 网站链接列表
├── theme.ini        # 主题信息
├── LICENSE          # 许可证
└── README.md        # 项目说明
```

## 自定义指南

### 修改主题颜色
在 `style.css` 文件中修改相关颜色变量，或在 `index.php` 中调整颜色数组：

```php
$accentColors = ['#4F7CFF', '#818CF8', '#34D399', '#38BDF8', '#FB923C', '#F472B6', '#A78BFA', '#4ADE80'];
```

### 添加自定义导航链接
在后台管理中添加标签，主题会自动在顶部导航栏显示。

### 调整背景效果
修改 `style.css` 中的背景相关样式，或在后台上传自定义背景图片。

## 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ 移动端浏览器

## 常见问题

### Q: 今日热榜不显示？
A: 请检查是否在主题配置中启用了今日热榜功能，并确保网络连接正常。

### Q: 背景图片不显示？
A: 请在后台上传背景图片，或确保背景图片路径正确。

### Q: 响应式布局在移动端显示异常？
A: 请确保您的设备支持现代浏览器，如Chrome、Safari等。

## 许可证

本主题采用 MIT 许可证开源，详见 LICENSE 文件。

## 鸣谢

- [六零导航页](https://spage.lylme.com) - 基础导航系统
- [LyToday-JS](https://doc.lylme.com/spage/#/lytoday-js) - 今日热榜插件
- [Bootstrap](https://getbootstrap.com) - 前端框架
- [jQuery](https://jquery.com) - JavaScript库

## 更新日志

### v1.1.0
- 优化响应式布局
- 增加鼠标跟随光效
- 改进搜索框动画效果
- 修复已知问题

### v1.0.0
- 初始版本发布
- 实现基本功能
- 深色太空风格设计

## 联系我们

- 官方网站：[https://www.dengtanet.com](https://www.dengtanet.com)
- 项目地址：[https://github.com/dengtanet/lylme-spage-template-dengtanet](https://github.com/dengtanet/lylme-spage-template-dengtanet)

---

**灯塔网络科技（甘肃）有限公司 免费开源**