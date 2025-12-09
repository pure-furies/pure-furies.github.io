
function copyServiceLink() {
 
    const linkText = document.getElementById('service-link').innerText.trim();
    const copyBtn = event.target; 

    copyBtn.innerText = '复制中...';
    
  
    if (navigator.clipboard) {
        navigator.clipboard.writeText(linkText)
            .then(() => {
                copyBtn.innerText = '复制成功 ✔';
                // 2秒后恢复按钮文字
                setTimeout(() => {
                    copyBtn.innerText = '点击复制';
                }, 2000);
            })
            .catch(err => {
               
                fallbackCopy(linkText, copyBtn);
            });
    } else {
       
        fallbackCopy(linkText, copyBtn);
    }
}


function fallbackCopy(text, btn) {
 
    const tempInput = document.createElement('input');
    tempInput.value = text;
   
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = 0;
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    

    tempInput.select();
    const isSuccess = document.execCommand('copy');
    
    document.body.removeChild(tempInput);
    

    if (isSuccess) {
        btn.innerText = '复制成功 ✔';
        setTimeout(() => {
            btn.innerText = '点击复制';
        }, 2000);
    } else {
        btn.innerText = '复制失败';
        alert('复制失败，请手动输入链接：' + text);
        setTimeout(() => {
            btn.innerText = '点击复制';
        }, 2000);
    }
}

