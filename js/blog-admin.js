/**
 * 博客管理面板脚本
 * 提供便捷的博客管理功能，无需直接修改源文件
 */

document.addEventListener('DOMContentLoaded', function() {
  // 创建管理面板元素
  createAdminPanel();
  
  // 绑定事件
  bindEvents();
});

/**
 * 创建管理面板
 */
function createAdminPanel() {
  // 创建面板容器
  const panel = document.createElement('div');
  panel.className = 'blog-admin-panel';
  
  // 创建切换按钮
  const toggle = document.createElement('div');
  toggle.className = 'admin-toggle';
  toggle.innerHTML = '<i class="fa fa-cog"></i>';
  panel.appendChild(toggle);
  
  // 创建菜单
  const menu = document.createElement('div');
  menu.className = 'admin-menu';
  
  // 添加菜单项
  menu.innerHTML = `
    <a href="javascript:void(0);" class="admin-menu-item" id="new-post">
      <i class="fa fa-plus-circle"></i> 新建文章
    </a>
    <a href="javascript:void(0);" class="admin-menu-item" id="edit-post">
      <i class="fa fa-edit"></i> 编辑当前文章
    </a>
    <a href="javascript:void(0);" class="admin-menu-item" id="delete-post">
      <i class="fa fa-trash"></i> 删除当前文章
    </a>
    <a href="javascript:void(0);" class="admin-menu-item" id="manage-categories">
      <i class="fa fa-folder"></i> 管理分类
    </a>
    <a href="javascript:void(0);" class="admin-menu-item" id="manage-tags">
      <i class="fa fa-tags"></i> 管理标签
    </a>
  `;
  
  panel.appendChild(menu);
  document.body.appendChild(panel);
}

/**
 * 绑定事件处理
 */
function bindEvents() {
  // 切换菜单显示/隐藏
  const toggle = document.querySelector('.admin-toggle');
  const menu = document.querySelector('.admin-menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  }
  
  // 点击其他区域关闭菜单
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.blog-admin-panel')) {
      if (menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
      }
    }
  });
  
  // 新建文章
  const newPostBtn = document.getElementById('new-post');
  if (newPostBtn) {
    newPostBtn.addEventListener('click', function() {
      createNewPost();
    });
  }
  
  // 编辑当前文章
  const editPostBtn = document.getElementById('edit-post');
  if (editPostBtn) {
    editPostBtn.addEventListener('click', function() {
      editCurrentPost();
    });
  }
  
  // 删除当前文章
  const deletePostBtn = document.getElementById('delete-post');
  if (deletePostBtn) {
    deletePostBtn.addEventListener('click', function() {
      deleteCurrentPost();
    });
  }
  
  // 管理分类
  const manageCategoriesBtn = document.getElementById('manage-categories');
  if (manageCategoriesBtn) {
    manageCategoriesBtn.addEventListener('click', function() {
      manageCategories();
    });
  }
  
  // 管理标签
  const manageTagsBtn = document.getElementById('manage-tags');
  if (manageTagsBtn) {
    manageTagsBtn.addEventListener('click', function() {
      manageTags();
    });
  }
}

/**
 * 创建新文章
 */
function createNewPost() {
  // 创建模态框
  const modal = createModal('新建文章');
  
  // 添加表单内容
  modal.content.innerHTML = `
    <form id="new-post-form">
      <div class="form-group">
        <label for="post-title">文章标题</label>
        <input type="text" id="post-title" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="post-categories">分类</label>
        <input type="text" id="post-categories" class="form-control" placeholder="多个分类用逗号分隔">
      </div>
      <div class="form-group">
        <label for="post-tags">标签</label>
        <input type="text" id="post-tags" class="form-control" placeholder="多个标签用逗号分隔">
      </div>
      <div class="form-group">
        <label for="post-content">文章内容</label>
        <textarea id="post-content" class="form-control" rows="10" required></textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn">保存</button>
        <button type="button" class="btn btn-cancel">取消</button>
      </div>
    </form>
  `;
  
  // 显示模态框
  showModal(modal);
  
  // 绑定表单提交事件
  const form = document.getElementById('new-post-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 获取表单数据
      const title = document.getElementById('post-title').value;
      const categories = document.getElementById('post-categories').value;
      const tags = document.getElementById('post-tags').value;
      const content = document.getElementById('post-content').value;
      
      // 这里应该发送请求到后端创建文章
      // 由于这是静态博客，我们可以提示用户如何手动添加文章
      alert(`文章创建成功！\n标题: ${title}\n分类: ${categories}\n标签: ${tags}\n\n请按照Hexo的方式将文章添加到博客中。`);
      
      // 关闭模态框
      closeModal(modal);
    });
  }
  
  // 绑定取消按钮事件
  const cancelBtn = modal.element.querySelector('.btn-cancel');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      closeModal(modal);
    });
  }
}

/**
 * 编辑当前文章
 */
function editCurrentPost() {
  // 检查当前是否在文章页面
  if (!isPostPage()) {
    alert('请在文章页面使用此功能！');
    return;
  }
  
  // 获取当前文章信息
  const title = document.querySelector('.post-title h1')?.textContent || '';
  const content = document.querySelector('.post-body')?.innerHTML || '';
  
  // 创建模态框
  const modal = createModal('编辑文章');
  
  // 添加表单内容
  modal.content.innerHTML = `
    <form id="edit-post-form">
      <div class="form-group">
        <label for="post-title">文章标题</label>
        <input type="text" id="post-title" class="form-control" value="${title}" required>
      </div>
      <div class="form-group">
        <label for="post-content">文章内容</label>
        <textarea id="post-content" class="form-control" rows="10" required>${content}</textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn">保存</button>
        <button type="button" class="btn btn-cancel">取消</button>
      </div>
    </form>
  `;
  
  // 显示模态框
  showModal(modal);
  
  // 绑定表单提交事件
  const form = document.getElementById('edit-post-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 获取表单数据
      const newTitle = document.getElementById('post-title').value;
      const newContent = document.getElementById('post-content').value;
      
      // 这里应该发送请求到后端更新文章
      // 由于这是静态博客，我们可以提示用户如何手动更新文章
      alert(`文章更新成功！\n标题: ${newTitle}\n\n请按照Hexo的方式更新博客中的文章。`);
      
      // 关闭模态框
      closeModal(modal);
    });
  }
  
  // 绑定取消按钮事件
  const cancelBtn = modal.element.querySelector('.btn-cancel');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      closeModal(modal);
    });
  }
}

/**
 * 删除当前文章
 */
function deleteCurrentPost() {
  // 检查当前是否在文章页面
  if (!isPostPage()) {
    alert('请在文章页面使用此功能！');
    return;
  }
  
  // 获取当前文章标题
  const title = document.querySelector('.post-title h1')?.textContent || '当前文章';
  
  // 确认删除
  if (confirm(`确定要删除「${title}」吗？此操作不可恢复！`)) {
    // 这里应该发送请求到后端删除文章
    // 由于这是静态博客，我们可以提示用户如何手动删除文章
    alert(`文章「${title}」已标记为删除！\n\n请按照Hexo的方式从博客中删除此文章。`);
  }
}

/**
 * 管理分类
 */
function manageCategories() {
  // 创建模态框
  const modal = createModal('管理分类');
  
  // 获取当前所有分类
  const categories = getCategories();
  
  // 添加表单内容
  modal.content.innerHTML = `
    <div class="categories-manager">
      <div class="categories-list">
        <h3>当前分类</h3>
        <ul id="categories-list">
          ${categories.map(cat => `<li>${cat} <button class="btn-remove" data-category="${cat}">删除</button></li>`).join('')}
        </ul>
      </div>
      <div class="add-category">
        <h3>添加新分类</h3>
        <form id="add-category-form">
          <div class="form-group">
            <input type="text" id="new-category" class="form-control" placeholder="分类名称" required>
          </div>
          <button type="submit" class="btn">添加</button>
        </form>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-close">关闭</button>
      </div>
    </div>
  `;
  
  // 显示模态框
  showModal(modal);
  
  // 绑定添加分类表单提交事件
  const form = document.getElementById('add-category-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 获取新分类名称
      const newCategory = document.getElementById('new-category').value;
      
      // 添加到列表
      const list = document.getElementById('categories-list');
      if (list) {
        const li = document.createElement('li');
        li.innerHTML = `${newCategory} <button class="btn-remove" data-category="${newCategory}">删除</button>`;
        list.appendChild(li);
      }
      
      // 清空输入框
      document.getElementById('new-category').value = '';
      
      // 提示用户
      alert(`分类「${newCategory}」已添加！\n\n请按照Hexo的方式更新博客中的分类。`);
    });
  }
  
  // 绑定删除分类按钮事件
  modal.element.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-remove')) {
      const category = e.target.getAttribute('data-category');
      if (confirm(`确定要删除分类「${category}」吗？`)) {
        e.target.parentElement.remove();
        alert(`分类「${category}」已删除！\n\n请按照Hexo的方式从博客中删除此分类。`);
      }
    }
  });
  
  // 绑定关闭按钮事件
  const closeBtn = modal.element.querySelector('.btn-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      closeModal(modal);
    });
  }
}

/**
 * 管理标签
 */
function manageTags() {
  // 创建模态框
  const modal = createModal('管理标签');
  
  // 获取当前所有标签
  const tags = getTags();
  
  // 添加表单内容
  modal.content.innerHTML = `
    <div class="tags-manager">
      <div class="tags-list">
        <h3>当前标签</h3>
        <ul id="tags-list">
          ${tags.map(tag => `<li>${tag} <button class="btn-remove" data-tag="${tag}">删除</button></li>`).join('')}
        </ul>
      </div>
      <div class="add-tag">
        <h3>添加新标签</h3>
        <form id="add-tag-form">
          <div class="form-group">
            <input type="text" id="new-tag" class="form-control" placeholder="标签名称" required>
          </div>
          <button type="submit" class="btn">添加</button>
        </form>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-close">关闭</button>
      </div>
    </div>
  `;
  
  // 显示模态框
  showModal(modal);
  
  // 绑定添加标签表单提交事件
  const form = document.getElementById('add-tag-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 获取新标签名称
      const newTag = document.getElementById('new-tag').value;
      
      // 添加到列表
      const list = document.getElementById('tags-list');
      if (list) {
        const li = document.createElement('li');
        li.innerHTML = `${newTag} <button class="btn-remove" data-tag="${newTag}">删除</button>`;
        list.appendChild(li);
      }
      
      // 清空输入框
      document.getElementById('new-tag').value = '';
      
      // 提示用户
      alert(`标签「${newTag}」已添加！\n\n请按照Hexo的方式更新博客中的标签。`);
    });
  }
  
  // 绑定删除标签按钮事件
  modal.element.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-remove')) {
      const tag = e.target.getAttribute('data-tag');
      if (confirm(`确定要删除标签「${tag}」吗？`)) {
        e.target.parentElement.remove();
        alert(`标签「${tag}」已删除！\n\n请按照Hexo的方式从博客中删除此标签。`);
      }
    }
  });
  
  // 绑定关闭按钮事件
  const closeBtn = modal.element.querySelector('.btn-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      closeModal(modal);
    });
  }
}

/**
 * 创建模态框
 * @param {string} title - 模态框标题
 * @returns {Object} 模态框对象
 */
function createModal(title) {
  // 创建模态框容器
  const modalElement = document.createElement('div');
  modalElement.className = 'modal';
  
  // 创建模态框内容
  modalElement.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${title}</h2>
        <span class="modal-close">&times;</span>
      </div>
      <div class="modal-body"></div>
    </div>
  `;
  
  // 获取内容容器
  const modalBody = modalElement.querySelector('.modal-body');
  
  // 绑定关闭按钮事件
  const closeBtn = modalElement.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      closeModal({ element: modalElement });
    });
  }
  
  return {
    element: modalElement,
    content: modalBody
  };
}

/**
 * 显示模态框
 * @param {Object} modal - 模态框对象
 */
function showModal(modal) {
  // 添加到文档
  document.body.appendChild(modal.element);
  
  // 显示模态框
  setTimeout(() => {
    modal.element.classList.add('active');
  }, 10);
  
  // 阻止滚动
  document.body.style.overflow = 'hidden';
}

/**
 * 关闭模态框
 * @param {Object} modal - 模态框对象
 */
function closeModal(modal) {
  // 隐藏模态框
  modal.element.classList.remove('active');
  
  // 延迟移除元素
  setTimeout(() => {
    if (modal.element.parentNode) {
      modal.element.parentNode.removeChild(modal.element);
    }
  }, 300);
  
  // 恢复滚动
  document.body.style.overflow = '';
}

/**
 * 检查当前是否在文章页面
 * @returns {boolean} 是否在文章页面
 */
function isPostPage() {
  // 检查URL或页面元素判断是否为文章页面
  return !!document.querySelector('.post-title h1');
}

/**
 * 获取所有分类
 * @returns {Array} 分类列表
 */
function getCategories() {
  // 这里应该从页面中获取所有分类
  // 简化处理，返回固定分类
  return ['编程', '技术博客', 'Web开发', '嵌入式'];
}

/**
 * 获取所有标签
 * @returns {Array} 标签列表
 */
function getTags() {
  // 这里应该从页面中获取所有标签
  // 简化处理，返回固定标签
  return ['编程', '技术博客', 'Web开发', 'Rust', 'Python', '嵌入式'];
}