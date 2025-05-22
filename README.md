# SVG微信查看器

这是一个简单的服务，可以让用户在微信中直接查看SVG内容。

## 部署说明

### 本地部署

1. 确保你已安装 [Node.js](https://nodejs.org/) (版本 12 或更高)
2. 克隆或下载此仓库到本地
3. 在项目根目录运行以下命令安装依赖：
   ```
   npm install
   ```
4. 启动服务器：
   ```
   npm start
   ```
5. 服务器将在 `http://localhost:3000` 启动

### 服务器部署

#### 使用普通VPS或云服务器

1. 将代码上传到你的服务器
2. 安装 Node.js 环境
3. 运行 `npm install` 安装依赖
4. 使用 PM2 或类似工具启动服务：
   ```
   npm install -g pm2
   pm2 start server.js
   ```
5. 配置你的域名和 Nginx 反向代理（可选）

#### 使用Vercel部署（推荐）

1. 注册 [Vercel](https://vercel.com) 账号
2. 安装 Vercel CLI：`npm install -g vercel`
3. 在项目根目录运行：`vercel`
4. 按照提示操作完成部署

#### 使用Netlify部署

1. 注册 [Netlify](https://netlify.com) 账号
2. 创建 `netlify.toml` 文件：
   ```toml
   [build]
     publish = "."
     command = "# no build command"
   ```
3. 上传代码到 Netlify

## 在微信中使用

1. 部署完成后，获取你的服务URL（例如：`https://your-domain.com`）
2. 在微信中直接访问该URL
3. 页面将显示SVG内容

## 自定义

- 修改 `index.html` 文件中的SVG内容
- 可以添加更多的SVG元素或修改现有的SVG
- 修改样式以适应不同的显示需求

## 注意事项

- 确保服务器配置了HTTPS，微信对非HTTPS链接有限制
- 如果使用的是公网IP而非域名，可能需要在微信开发者工具中进行调试
- 微信内置浏览器可能对某些SVG特性有限制，请进行充分测试 