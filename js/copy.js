<script>
// 复制服务链接函数
function copyServiceLink() {
    // 获取要复制的链接文本
    const linkText = document.getElementById('service-link').innerText.trim();
    const copyBtn = event.target; // 获取点击的按钮
    
    // 修改按钮文字提示
    copyBtn.innerText = '复制中...';
    // 禁用按钮避免重复点击
    copyBtn.disabled = true;
    
    // 现代浏览器 Clipboard API（推荐）
    if (navigator.clipboard) {
        navigator.clipboard.writeText(linkText)
            .then(() => {
                copyBtn.innerText = '复制成功 ✔';
                copyBtn.style.backgroundColor = '#52C41A'; // 成功时改绿色
                // 2秒后恢复按钮状态
                setTimeout(() => {
                    copyBtn.innerText = '点击复制';
                    copyBtn.style.backgroundColor = '#FF66B2';
                    copyBtn.disabled = false;
                }, 2000);
            })
            .catch(err => {
                // 降级方案：兼容旧浏览器
                fallbackCopy(linkText, copyBtn);
            });
    } else {
        // 旧浏览器直接使用降级方案
        fallbackCopy(linkText, copyBtn);
    }
}

// 降级复制函数（兼容IE/HTTP页面）
function fallbackCopy(text, btn) {
    // 创建临时输入框
    const tempInput = document.createElement('input');
    tempInput.value = text;
    // 隐藏临时输入框（避免页面闪烁）
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = 0;
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    
    // 选中并复制
    tempInput.select();
    const isSuccess = document.execCommand('copy');
    
    // 删除临时输入框
    document.body.removeChild(tempInput);
    
    // 提示结果
    if (isSuccess) {
        btn.innerText = '复制成功 ✔';
        btn.style.backgroundColor = '#52C41A';
    } else {
        btn.innerText = '复制失败';
        btn.style.backgroundColor = '#FF4D4F';
        alert('复制失败，请手动复制链接：' + text);
    }
    
    // 恢复按钮状态
    setTimeout(() => {
        btn.innerText = '点击复制';
        btn.style.backgroundColor = '#FF66B2';
        btn.disabled = false;
    }, 2000);
}
