/**
 * 自定义初始化脚本
 * 用于加载自定义样式和博客管理面板
 */

document.addEventListener('DOMContentLoaded', function() {
  // 加载自定义样式
  loadCustomStyles();
  
  // 加载博客管理面板
  loadBlogAdmin();
});

/**
 * 加载自定义样式
 */
function loadCustomStyles() {
  // 添加自定义CSS
  const customCSS = document.createElement('link');
  customCSS.rel = 'stylesheet';
  customCSS.href = '/css/custom.css';
  document.head.appendChild(customCSS);
  
  // 添加模态框CSS
  const modalCSS = document.createElement('link');
  modalCSS.rel = 'stylesheet';
  modalCSS.href = '/css/modal.css';
  document.head.appendChild(modalCSS);
}

/**
 * 加载博客管理面板
 */
function loadBlogAdmin() {
  // 添加博客管理脚本
  const adminScript = document.createElement('script');
  adminScript.src = '/js/blog-admin.js';
  document.body.appendChild(adminScript);
}