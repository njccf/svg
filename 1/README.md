# 微信推文展示

这是一个简单的静态网页，用于展示微信推文内容。该项目可以直接部署到Netlify上，让用户通过一个网址链接在微信端直接打开查看内容。

## 部署指南

### 通过Netlify部署

1. 注册并登录[Netlify](https://www.netlify.com/)
2. 点击"New site from Git"
3. 选择你的Git提供商（GitHub、GitLab或Bitbucket）
4. 授权Netlify访问你的仓库
5. 选择包含此代码的仓库
6. 保持默认设置，点击"Deploy site"

部署完成后，Netlify会提供一个默认的域名（例如：your-site-name.netlify.app）。你可以使用这个链接在微信中分享，或者在Netlify的设置中配置自定义域名。

### 本地测试

如果你想在部署前在本地测试这个网站，可以使用以下方法：

1. 安装一个简单的HTTP服务器（如果你已经安装了Node.js）：
   ```
   npm install -g http-server
   ```

2. 在项目目录下运行：
   ```
   http-server
   ```

3. 在浏览器中访问 `http://localhost:8080` 查看网站

## 文件结构

- `index.html` - 主网页文件，包含微信推文的内容
- `netlify.toml` - Netlify配置文件
- `README.md` - 项目说明文档

## 自定义

如果你想更改展示的内容，请编辑 `index.html` 文件中的图片链接和其他内容。 