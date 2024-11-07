// JSONデータファイルのパス
const jsonDataUrl = 'materials.json';

// URLパラメータから素材のIDを取得
const urlParams = new URLSearchParams(window.location.search);
const materialId = parseInt(urlParams.get('id'));

// ページ要素の取得
const materialNameElem = document.getElementById('material-name');
const materialImageElem = document.getElementById('material-image');
const materialCategoryElem = document.getElementById('material-category');
const materialDescriptionElem = document.getElementById('material-description');

// JSONデータを読み込み、該当する素材を表示する
fetch(jsonDataUrl)
    .then(response => response.json())
    .then(data => {
        // 素材IDに一致するデータを検索
        const material = data.find(item => item.id === materialId);
        if (material) {
            // 該当する素材をページに表示
            materialNameElem.textContent = material.name;
            materialImageElem.src = material.imageUrl;
            materialImageElem.alt = material.name;
            materialCategoryElem.textContent = `カテゴリ: ${material.category}`;
            materialDescriptionElem.textContent = `説明: ${material.description}`;
        } else {
            // 素材が見つからなかった場合のエラーメッセージ
            materialNameElem.textContent = '素材が見つかりませんでした';
        }
    })
    .catch(error => {
        console.error('JSONデータの読み込みに失敗しました:', error);
        materialNameElem.textContent = 'データの読み込みに失敗しました';
    });
