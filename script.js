document.addEventListener("DOMContentLoaded", function() {
    // ボタンがクリックされたときにデータを取得
    document.getElementById("fetchBtn").addEventListener("click", function() {
        // ユーザーが入力したURLを取得
        const url = document.getElementById("urlInput").value;

        // URLが入力されているかチェック
        if (url) {
            // Fetch APIを使用してデータを取得
            fetch(url)
                .then(response => {
                    // レスポンスがテキストであることを確認
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error("データの取得に失敗しました");
                    }
                })
                .then(data => {
                    // データをHTML要素に表示
                    document.getElementById("output").innerText = data;
                })
                .catch(error => {
                    // エラーメッセージを表示
                    document.getElementById("output").innerText = `エラー: ${error.message}`;
                });
        } else {
            // URLが空の場合のエラーメッセージ
            document.getElementById("output").innerText = "URLを入力してください";
        }
    });
});
