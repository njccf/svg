# SVG微信查看器

这是一个简单的服务，可以让用户在微信中直接查看SVG内容，并解决微信图片防盗链问题。

## 微信图片防盗链问题

在Netlify等外部服务上部署时，可能会遇到微信图片无法显示的问题，显示"此图片来自微信公众平台，未经允许不可引用"。这是因为微信对图片采用了防盗链措施，通过检查HTTP请求头中的Referer字段来判断请求来源。

### 解决方案

我们提供了两种解决方案：

#### 方案一：使用meta标签禁用referrer（最简单）

在HTML的head部分添加以下meta标签：
```html
<meta name="referrer" content="no-referrer">
```

这种方法简单有效，但可能会影响某些需要referrer的服务（如百度统计）。

#### 方案二：使用代理服务器（更灵活）

我们提供了一个简单的Node.js代理服务器`proxy.js`，可以中转微信图片请求，绕过防盗链限制。

使用方法：
1. 部署代理服务器
2. 将图片URL从`https://mmbiz.qpic.cn/xxx`修改为`/proxy?url=https://mmbiz.qpic.cn/xxx`

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
6. 如果需要代理服务，启动代理服务器：
   ```
   node proxy.js
   ```
   代理服务器将在 `http://localhost:3001` 启动

### 服务器部署

#### 使用普通VPS或云服务器

1. 将代码上传到你的服务器
2. 安装 Node.js 环境
3. 运行 `npm install` 安装依赖
4. 使用 PM2 或类似工具启动服务：
   ```
   npm install -g pm2
   pm2 start server.js
   pm2 start proxy.js  # 如果需要代理服务
   ```
5. 配置你的域名和 Nginx 反向代理（可选）

#### 使用Vercel部署（推荐）

1. 注册 [Vercel](https://vercel.com) 账号
2. 安装 Vercel CLI：`npm install -g vercel`
3. 在项目根目录运行：`vercel`
4. 按照提示操作完成部署

#### 使用Netlify部署

1. 注册 [Netlify](https://netlify.com) 账号
2. 创建 `netlify.toml` 文件（已包含在项目中）
3. 上传代码到 Netlify
4. 如果遇到微信图片无法显示问题，可以使用以下两种方法之一：
   - 在HTML文件中添加`<meta name="referrer" content="no-referrer">`
   - 设置Netlify函数作为代理服务器（高级用法，需要额外配置）

## 在微信中使用

1. 部署完成后，获取你的服务URL（例如：`https://your-domain.com`）
2. 在微信中直接访问该URL
3. 页面将显示SVG内容，所有图片都能正常显示

## 文件说明

- `index.html` - 使用meta标签解决防盗链的HTML页面
- `index-proxy.html` - 使用代理服务器解决防盗链的HTML页面
- `server.js` - 主服务器脚本
- `proxy.js` - 图片代理服务器脚本
- `package.json` - 项目配置文件
- `vercel.json` - Vercel部署配置
- `netlify.toml` - Netlify部署配置

## 自定义

- 修改 `index.html` 文件中的SVG内容
- 可以添加更多的SVG元素或修改现有的SVG
- 修改样式以适应不同的显示需求

## 注意事项

- 确保服务器配置了HTTPS，微信对非HTTPS链接有限制
- 如果使用的是公网IP而非域名，可能需要在微信开发者工具中进行调试
- 微信内置浏览器可能对某些SVG特性有限制，请进行充分测试
- 使用meta标签禁用referrer可能会影响依赖referrer的第三方服务（如统计服务） 