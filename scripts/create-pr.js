#!/usr/bin/env node
/**
 * 创建 GitHub Pull Request
 * 用于每日文章发布任务
 * 
 * Usage:
 *   node create-pr.js <branch-name> <article-title>
 * 
 * Example:
 *   node create-pr.js feature/daily-article-2026-04-17 "AI Image Background Removal Guide"
 */

const https = require('https');

// 配置
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'servanter';
const REPO_NAME = 'ai-magic';

// 命令行参数
const branchName = process.argv[2];
const articleTitle = process.argv[3] || '新增文章';

if (!branchName) {
  console.error('❌ 错误: 必须提供分支名称');
  console.error('用法: node create-pr.js <branch-name> <article-title>');
  process.exit(1);
}

if (!GITHUB_TOKEN) {
  console.error('❌ 错误: 未设置 GITHUB_TOKEN 环境变量');
  process.exit(1);
}

// 获取当前日期
const today = new Date().toISOString().split('T')[0];

// PR 数据
const prData = {
  title: `feat: ${today} 新增文章 + SEO 优化`,
  head: branchName,
  base: 'main',
  body: `## 📝 文章信息

- **文章标题**: 《${articleTitle}》
- **字数**: ~2800 词
- **封面图**: 1024x1024 AI 生成
- **SEO 优化**: 完成

## ✅ 检查清单

- [ ] 文章内容质量
- [ ] SEO 标签完整
- [ ] 封面图正常显示
- [ ] MDX 语法无错误
- [ ] 内链/外链有效

## 🚀 Vercel 预览

Vercel 已为此分支自动创建预览环境，请审查后决定是否合并。

---

🤖 此 PR 由 AI Agent 自动创建`
};

// 发送请求
const postData = JSON.stringify(prData);

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: `/repos/${REPO_OWNER}/${REPO_NAME}/pulls`,
  method: 'POST',
  headers: {
    'User-Agent': 'OpenClaw-Daily-Article-Bot',
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log(`🚀 正在创建 PR...`);
console.log(`📦 仓库: ${REPO_OWNER}/${REPO_NAME}`);
console.log(`🌿 分支: ${branchName} → main`);

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);

      if (res.statusCode === 201) {
        console.log('\n✅ PR 创建成功!');
        console.log(`🔗 PR URL: ${response.html_url}`);
        console.log(`📝 PR 编号: #${response.number}`);
        console.log(`\n📋 后续操作:`);
        console.log(`1. 访问 PR 页面查看详情`);
        console.log(`2. 等待 Vercel 部署完成`);
        console.log(`3. 审查预览环境`);
        console.log(`4. 确认无误后手动合并`);
        process.exit(0);
      } else {
        console.error(`\n❌ PR 创建失败`);
        console.error(`状态码: ${res.statusCode}`);
        console.error(`错误信息: ${response.message || '未知错误'}`);
        
        if (response.errors) {
          console.error(`详细错误:`, JSON.stringify(response.errors, null, 2));
        }

        // 常见错误提示
        if (res.statusCode === 422 && response.errors) {
          const error = response.errors[0];
          if (error.message && error.message.includes('already exists')) {
            console.log(`\n💡 提示: PR 可能已经存在，请检查 GitHub PR 列表`);
          }
        }

        process.exit(1);
      }
    } catch (e) {
      console.error('\n❌ 解析响应失败');
      console.error(`原始响应: ${data}`);
      console.error(`错误: ${e.message}`);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error(`\n❌ 请求失败: ${e.message}`);
  process.exit(1);
});

req.write(postData);
req.end();
