document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("fetchBtn").addEventListener("click", function() {
        const url = document.getElementById("urlInput").value;

        if (url) {
            // CORSプロキシを使ってリクエストを送信
            const proxyUrl = "https://cors-anywhere.herokuapp.com/";
            const targetUrl = proxyUrl + url;

            fetch(targetUrl)
                .then(response => {
                    if (response.ok) {
                        return response.text(); // テキストデータを取得
                    } else {
                        throw new Error("データの取得に失敗しました");
                    }
                })
                .then(data => {
                    document.getElementById("output").innerText = data; // 取得したデータを表示
                })
                .catch(error => {
                    document.getElementById("output").innerText = `エラー: ${error.message}`;
                });
        } else {
            document.getElementById("output").innerText = "URLを入力してください";
        }
    });
});
