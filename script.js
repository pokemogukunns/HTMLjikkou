async function fetchAndDownloadResources(url) {
    try {
        // HTMLファイルの取得
        console.log(`Fetching HTML from ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status} - ${response.statusText}`);
        }

        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // HTMLファイルのダウンロードリンクを作成
        createDownloadLink('index.html', htmlText);
        logToUser('HTMLファイルが正常に取得されました。');

        // CSSファイルの読み込みとダウンロード
        const styleTags = doc.querySelectorAll('link[rel="stylesheet"]');
        if (styleTags.length > 0) {
            for (let tag of styleTags) {
                const cssUrl = new URL(tag.href, url).href; // 絶対パスに変換
                logToUser(`CSSファイルを取得中: ${cssUrl}`);
                const cssResponse = await fetch(cssUrl);
                if (!cssResponse.ok) {
                    throw new Error(`CSSファイルの取得に失敗: ${cssUrl}`);
                }
                const cssText = await cssResponse.text();
                const fileName = cssUrl.split('/').pop();
                createDownloadLink(fileName, cssText);
                logToUser(`${fileName} が正常に取得されました。`);
            }
        } else {
            logToUser('CSSファイルが見つかりませんでした。');
        }

        // JSファイルの読み込みとダウンロード
        const scriptTags = doc.querySelectorAll('script[src]');
        if (scriptTags.length > 0) {
            for (let tag of scriptTags) {
                const jsUrl = new URL(tag.src, url).href; // 絶対パスに変換
                logToUser(`JavaScriptファイルを取得中: ${jsUrl}`);
                const jsResponse = await fetch(jsUrl);
                if (!jsResponse.ok) {
                    throw new Error(`JavaScriptファイルの取得に失敗: ${jsUrl}`);
                }
                const jsText = await jsResponse.text();
                const fileName = jsUrl.split('/').pop();
                createDownloadLink(fileName, jsText);
                logToUser(`${fileName} が正常に取得されました。`);
            }
        } else {
            logToUser('JavaScriptファイルが見つかりませんでした。');
        }

    } catch (error) {
        logToUser(`エラーが発生しました: ${error.message}`);
        console.error('エラー詳細:', error);
    }
}

// ダウンロードリンクを作成する関数
function createDownloadLink(fileName, fileContent) {
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.textContent = `Download ${fileName}`;
    document.body.appendChild(link);
    document.body.appendChild(document.createElement('br')); // 改行を追加
}

// ユーザーにログを表示する関数
function logToUser(message) {
    const logElement = document.createElement('div');
    logElement.textContent = message;
    document.body.appendChild(logElement);
}

// 使用例
fetchAndDownloadResources('https://yuki-math-blog-43t5.onrender.com/');
