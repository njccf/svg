const https = require('https');
const url = require('url');

exports.handler = async function(event, context) {
  // 只允许GET请求
  if (event.httpMethod !== 'GET') {
    return { 
      statusCode: 405, 
      body: 'Method Not Allowed' 
    };
  }

  // 获取查询参数中的url
  const params = new URLSearchParams(event.queryStringParameters);
  const targetUrl = params.get('url');

  if (!targetUrl) {
    return { 
      statusCode: 400, 
      body: 'Missing url parameter' 
    };
  }

  try {
    // 解析目标URL
    const parsedUrl = url.parse(targetUrl);
    
    // 创建请求选项
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      method: 'GET',
      headers: {
        // 设置Referer为目标域名，绕过防盗链
        'Referer': `https://${parsedUrl.hostname}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    // 发起请求并获取响应
    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let body = [];
        res.on('data', (chunk) => body.push(chunk));
        res.on('end', () => {
          const responseBody = Buffer.concat(body);
          const contentType = res.headers['content-type'];
          
          resolve({
            statusCode: res.statusCode,
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=86400', // 缓存一天
              'Access-Control-Allow-Origin': '*'
            },
            body: responseBody.toString('base64'),
            isBase64Encoded: true
          });
        });
      });

      req.on('error', (e) => {
        reject({ statusCode: 500, body: `代理请求失败: ${e.message}` });
      });

      req.end();
    });

    return response;
  } catch (error) {
    return { 
      statusCode: 500, 
      body: `服务器错误: ${error.message}` 
    };
  }
}; 