# Cheesemonki's Tech Blog

这是一个基于Hexo框架的个人技术博客，专注于嵌入式系统开发、硬件协议逆向和开源固件研究。

## 博客特点

- 简洁现代的界面设计
- 响应式布局，适配各种设备
- 支持文章搜索功能
- 自定义样式和主题
- 博客管理面板

## 新增功能

- 自定义CSS样式
- 模态框支持
- 博客管理面板
- GitHub角标

## 本地开发

### 环境要求

- Node.js
- Git
- Hexo CLI

### 安装步骤

1. 克隆仓库到本地
   ```bash
   git clone https://github.com/cheesemonki/cheesemonki.github.io.git
   cd cheesemonki.github.io
   ```

2. 安装依赖（如果需要）
   ```bash
   npm install
   ```

3. 本地预览
   ```bash
   hexo server
   ```

## 更新博客

### 创建新文章

```bash
# 创建新文章
hexo new "文章标题"
```

### 生成静态文件

```bash
hexo generate
```

### 部署到GitHub Pages

将本地修改推送到GitHub仓库：

```bash
# 添加所有修改的文件
git add .

# 提交更改
git commit -m "更新说明：添加了什么功能或修改"

# 推送到GitHub
git push origin main
```

## 自定义样式

博客使用了自定义样式，位于 `/css/custom.css`。您可以修改此文件来自定义博客外观。

## 博客管理

博客管理功能通过 `/js/blog-admin.js` 实现，提供了便捷的博客管理界面。

## 许可证

本博客内容采用 [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/zh-CN) 进行许可。