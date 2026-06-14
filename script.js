// 系統架構整合引擎手稿配置
document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化 Lucide 向量圖標
    lucide.createIcons();

    // 2. 精確指定帶特殊符號與中文編碼的影像路徑，阻斷本地解碼錯誤
    document.getElementById('img-tea').src = "紫斑蝶立體花茶包%20(2).png";
    document.getElementById('img-diffuser').src = "試管芳香瓶.png";
    document.getElementById('img-butterfly').src = "飛天蝴蝶.png";

    // 3. 多元商品卡片結帳事件註冊連動
    document.getElementById('btn-tea').onclick = () => addToCart('p1', '【紫在塭內】特色天然花茶', 280, '紫斑蝶立體花茶包%20(2).png');
    document.getElementById('btn-diffuser').onclick = () => addToCart('p2', '海廢再生漂流木試管芳香瓶', 450, '試管芳香瓶.png');
    document.getElementById('btn-butterfly').onclick = () => addToCart('p3', '飛天蝴蝶 DIY 體驗套組', 150, '飛天蝴蝶.png');
});

// 行動版導覽選單控制
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

if(mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    menuIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
}

// 彈出視窗控制
function openModal(id) {
    if(id === 'pledge') {
        document.getElementById('pledgeModal').classList.remove('hidden');
    }
}

function closeModal(id) {
    if(id === 'pledge') {
        document.getElementById('pledgeModal').classList.add('hidden');
    }
}

function submitPledge() {
    alert('感謝您的綠色承諾！您的優惠碼為：WENNEI_ECO_2026。');
    closeModal('pledge');
}

// 生態梯度切換邏輯
const gradientContents = [
    {
        title: "【陸/沙灘】西側沙質海岸與馬鞍藤",
        desc: "西側直接承受強烈鹹風，沙地乾燥多鹽。這裡爬滿了防沙先驅植被「馬鞍藤」，其鞍形厚葉能降低蒸散，並綻放紫色漏斗狀花朵。它是保護內陸免遭風沙與潮水肆虐的首道防線。",
        tag: "沙質、強海風",
        pos: "生態位置：西側最外緣",
        icon: "sun"
    },
    {
        title: "【林/保安林】1311號防風綠色長廊",
        desc: "由高大的木麻黃與羊角藤組成，是全台灣首個被證實的斯氏紫斑蝶春季繁殖熱點。這條天然防風綠帶有效阻擋強烈東北季風，穩固沙丘並提供溫暖多樣的庇護所。",
        tag: "木麻黃、羊角藤",
        pos: "生態位置：中部陸林帶",
        icon: "tree-pine"
    },
    {
        title: "【灘/潮間帶】中港溪北岸泥質灘地",
        desc: "出海口附近的大片泥質灘地，每日潮汐往返積聚了大量有機物。這裡是招潮蟹的樂園，上百萬隻不同品種的招潮蟹在此揮螯覓食，展示著旺盛的生命力。",
        tag: "泥質、鹽沼濕地",
        pos: "生態位置：高潮線以下潮間帶",
        icon: "activity"
    },
    {
        title: "【水/河口】官義渡紅樹林水域",
        desc: "位於中港溪與射流溪的交會處，淡海水激烈混合。這裡是臺灣少數保留完整的水筆仔林地，不僅是海鳥和過境候鳥的極佳覓食地，幕後更維護著海洋生態鏈。",
        tag: "水筆仔、淡海水",
        pos: "生態位置：出海口核心水域",
        icon: "waves"
    }
];

function switchGradient(index, btn) {
    const tracker = document.getElementById('gradientTracker');
    if (tracker) {
        tracker.style.left = `${index * 25}%`;
    }

    const buttons = btn.parentElement.querySelectorAll('button');
    buttons.forEach(b => {
        b.classList.remove('text-[#69448E]');
        b.classList.add('text-slate-400');
        b.querySelector('span').classList.remove('text-slate-500');
        b.querySelector('span').classList.add('text-slate-400');
    });
    btn.classList.add('text-[#69448E]');
    btn.classList.remove('text-slate-400');
    btn.querySelector('span').classList.add('text-slate-500');
    btn.querySelector('span').classList.remove('text-slate-400');

    const contentBox = document.getElementById('gradientContent');
    contentBox.style.opacity = '0';
    setTimeout(() => {
        const data = gradientContents[index];
        contentBox.innerHTML = `
            <div class="flex flex-col justify-between h-full space-y-4">
                <div class="flex items-start gap-4">
                    <div class="p-3 bg-slate-100 rounded-xl text-[#69448E]">
                        <i class="w-6 h-6" data-lucide="${data.icon}"></i>
                    </div>
                    <div>
                        <h4 class="text-lg font-black text-slate-800">${data.title}</h4>
                        <p class="text-sm text-slate-600 mt-2 leading-relaxed font-bold">${data.desc}</p>
                    </div>
                </div>
                <div class="border-t border-slate-200 pt-4 flex items-center justify-between">
                    <span class="text-xs font-bold text-[#69448E] bg-[#F0ECF5] px-2.5 py-1 rounded">${data.tag}</span>
                    <span class="text-xs text-slate-500 font-extrabold">${data.pos}</span>
                </div>
            </div>
        `;
        lucide.createIcons();
        contentBox.style.opacity = '1';
    }, 150);
}

// 購物車模組核心引擎
let cart = [];

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    const isOpen = !sidebar.classList.contains('translate-x-full');
    
    if (isOpen) {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    } else {
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        sidebar.classList.remove('translate-x-full');
    }
}

function addToCart(id, name, price, img) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, img, quantity: 1 });
    }
    updateCartUI();
    
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.remove('opacity-0'), 10);
}

function changeQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const itemsContainer = document.getElementById('cart-items');
    const countBadge = document.getElementById('cart-count');
    const totalSpan = document.getElementById('cart-total');

    itemsContainer.innerHTML = '';

    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div id="empty-cart-state" class="text-center py-12 text-slate-500">
                <i data-lucide="shopping-bag" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
                <p class="font-bold">您的購物車目前是空的</p>
            </div>
        `;
        countBadge.classList.add('hidden');
        totalSpan.textContent = 'NT$ 0';
    } else {
        let total = 0;
        let count = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            const itemEl = document.createElement('div');
            itemEl.className = 'flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm';
            itemEl.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg border">
                <div class="flex-1">
                    <h4 class="text-xs font-black text-slate-800">${item.name}</h4>
                    <p class="text-[10px] text-slate-500 font-bold">NT$ ${item.price}</p>
                    <div class="flex items-center gap-2 mt-1">
                        <button onclick="changeQuantity('${item.id}', -1)" class="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-xs">-</button>
                        <span class="text-xs font-bold w-4 text-center">${item.quantity}</span>
                        <button onclick="changeQuantity('${item.id}', 1)" class="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-xs">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart('${item.id}')" class="text-slate-400 hover:text-red-500 transition-colors p-1">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            `;
            itemsContainer.appendChild(itemEl);
        });

        countBadge.textContent = count;
        countBadge.classList.remove('hidden');
        totalSpan.textContent = `NT$ ${total.toLocaleString()}`;
    }
    lucide.createIcons();
}
