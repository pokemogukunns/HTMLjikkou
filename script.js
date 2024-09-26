document.addEventListener("DOMContentLoaded", function() {
    // URLからデータを取得する例
    const url = "https://yuki-math-blog-bymy.onrender.com/"; // ここに指定されたURLを入力してください

    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById("output").innerText = data;
        })
        .catch(error => console.error('Error:', error));

    // クッキーの変更
    document.cookie = "yuki; path=/"; // 例
});
