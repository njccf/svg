const http = require('http');
const https = require('https');
const url = require('url');
const PORT = process.env.PORT || 3001;

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 设置CORS头，允许跨域访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 解析请求URL
  const parsedUrl = url.parse(req.url, true);
  
  // 检查是否为代理请求
  if (parsedUrl.pathname === '/proxy') {
    const targetUrl = parsedUrl.query.url;
    
    if (!targetUrl) {
      res.writeHead(400);
      res.end('Missing url parameter');
      return;
    }

    // 解析目标URL
    const targetParsedUrl = url.parse(targetUrl);
    
    // 创建请求选项
    const options = {
      hostname: targetParsedUrl.hostname,
      path: targetParsedUrl.path,
      method: 'GET',
      headers: {
        // 设置Referer为目标域名，绕过防盗链
        'Referer': `https://${targetParsedUrl.hostname}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    // 发起请求
    const proxyReq = https.request(options, (proxyRes) => {
      // 复制响应头
      Object.keys(proxyRes.headers).forEach(key => {
        // 跳过transfer-encoding头，避免冲突
        if (key.toLowerCase() === 'transfer-encoding') return;
        res.setHeader(key, proxyRes.headers[key]);
      });

      // 设置状态码
      res.writeHead(proxyRes.statusCode);
      
      // 管道传输响应数据
      proxyRes.pipe(res);
    });

    // 处理请求错误
    proxyReq.on('error', (e) => {
      console.error(`请求错误: ${e.message}`);
      res.writeHead(500);
      res.end(`代理请求失败: ${e.message}`);
    });

    // 结束请求
    proxyReq.end();
  } else {
    // 返回简单的HTML页面，用于测试
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>微信图片代理服务</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; }
          pre { background: #f5f5f5; padding: 10px; border-radius: 5px; }
          .example { margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1>微信图片代理服务</h1>
        <p>这是一个用于解决微信图片防盗链问题的代理服务。</p>
        
        <div class="example">
          <h3>使用方法：</h3>
          <pre>/proxy?url=https://mmbiz.qpic.cn/your_image_path</pre>
          
          <h3>示例：</h3>
          <img src="/proxy?url=https://mmbiz.qpic.cn/sz_mmbiz_png/aTnTTELWibpNnE5n7EakaEqZmkuN4dKu2gP65H5tiaaBGicIzPvQhqEZlg4ichZ6hlpB7mpnF15dR7Coxmhuf2hEzA/640?wx_fmt=png" style="max-width: 100%;">
        </div>
      </body>
      </html>
    `);
  }
});

// 启动服务器
server.listen(PORT, () => {
  console.log(`图片代理服务器运行在 http://localhost:${PORT}`);
}); 