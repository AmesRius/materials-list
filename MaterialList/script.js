// JSONデータファイルのパス
const jsonDataUrl = 'materials.json';

// 素材一覧を表示するコンテナを取得
const materialGrid = document.querySelector('.material-grid');

// フィルタとソートの要素を取得
const categoryFilter = document.getElementById('category-filter');
const sortOptions = document.getElementById('sort-options');

// JSONデータを保持するための変数
let materialsData = [];

// JSONデータを読み込み、ページに素材を表示する
fetch(jsonDataUrl)
    .then(response => response.json())
    .then(data => {
        materialsData = data; // データを保存
        displayMaterials(materialsData); // 初期表示
    })
    .catch(error => {
        console.error('JSONデータの読み込みに失敗しました:', error);
    });

// 素材データを表示する関数
function displayMaterials(materials) {
    // コンテナをクリア
    materialGrid.innerHTML = '';

    materials.forEach(material => {
        // 素材アイテムのHTML要素を作成
        const materialItem = document.createElement('div');
        materialItem.classList.add('material-item');

        // 詳細ページへのリンクを作成
        const link = document.createElement('a');
        link.href = `material-detail.html?id=${material.id}`;

        // 素材画像の作成
        const img = document.createElement('img');
        img.src = material.imageUrl;
        img.alt = material.name;

        // 素材名の作成
        const name = document.createElement('p');
        name.textContent = material.name;

        // リンク内に画像と名前を追加
        link.appendChild(img);
        link.appendChild(name);

        // 素材アイテムにリンクを追加
        materialItem.appendChild(link);

        // グリッドに追加
        materialGrid.appendChild(materialItem);
    });
}


// カテゴリフィルタの処理
categoryFilter.addEventListener('change', () => {
    filterAndSortMaterials();
});

// ソートオプションの処理
sortOptions.addEventListener('change', () => {
    filterAndSortMaterials();
});

// フィルタとソートの適用関数
function filterAndSortMaterials() {
    let filteredMaterials = materialsData;

    // カテゴリフィルタの適用
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
        filteredMaterials = filteredMaterials.filter(material => material.category === selectedCategory);
    }

    // ソートオプションの適用
    const selectedSort = sortOptions.value;
    if (selectedSort === 'name-asc') {
        filteredMaterials.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === 'name-desc') {
        filteredMaterials.sort((a, b) => b.name.localeCompare(a.name));
    }

    // フィルタとソート後の素材を表示
    displayMaterials(filteredMaterials);
}
