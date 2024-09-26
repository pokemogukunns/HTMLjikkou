async function fetchAndEmbedExternalResources(url) {
    try {
        // HTMLファイルの取得
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status} - ${response.statusText}`);
        }

        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // CSSファイルの読み込みと<Style>タグに変換
        const styleTags = doc.querySelectorAll('link[rel="stylesheet"]');
        for (let tag of styleTags) {
            const cssUrl = tag.href;
            const cssResponse = await fetch(cssUrl);
            const cssText = await cssResponse.text();
            const styleElement = document.createElement('style');
            styleElement.textContent = cssText;
            document.head.appendChild(styleElement);

            // 元の<link>タグを削除
            tag.remove();
        }

        // JSファイルの読み込みと<Script>タグに変換
        const scriptTags = doc.querySelectorAll('script[src]');
        for (let tag of scriptTags) {
            const jsUrl = tag.src;
            const jsResponse = await fetch(jsUrl);
            const jsText = await jsResponse.text();
            const scriptElement = document.createElement('script');
            scriptElement.textContent = jsText;
            document.body.appendChild(scriptElement);

            // 元の<script>タグを削除
            tag.remove();
        }

        // 最終的なHTMLコンテンツの出力
        console.log(doc.documentElement.outerHTML);

    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

// 使用例
//fetchAndEmbedExternalResources('https://yuki-math-blog-43t5.onrender.com/');
