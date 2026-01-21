    const defaultConfig = {
      sidebar_bg: "#0f172a",
      card_bg: "#ffffff",
      card_text: "#fff",
      chart_bg: "#ffffff",
      primary_action: "#fff",
      secondary_text: "#fff",
      font_family: "Acme",
      font_size: 16,
      brand_name: "MAMAG",
      total_revenue_label: "Total Revenue",
      income_today_label: "Income Today",
      orders_today_label: "Orders Today",
      new_orders_label: "New Orders",
      analytics_title: "Sales Analytics"
    };

    let config = { ...defaultConfig };
    let currentPeriod = 'week';

    const weekData = {
      orders: [45, 52, 48, 65, 58, 71, 68],
      revenue: [2100, 2450, 2200, 3050, 2700, 3300, 3150],
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    };

    const monthData = {
      orders: [520, 580, 640, 720],
      revenue: [24500, 27200, 30100, 33800],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    };

    const yearData = {
      orders: [1950, 2100, 2350, 2580, 2720, 2890, 3050, 3200, 3380, 3500, 3650, 3800],
      revenue: [92000, 98500, 110000, 121000, 128000, 136000, 143000, 150000, 159000, 164000, 171000, 178000],
      labels: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };

    function getChartData(period) {
      switch(period) {
        case 'week': return weekData;
        case 'month': return monthData;
        case 'year': return yearData;
        default: return weekData;
      }
    }

    function createCombinedChart(containerId, ordersData, revenueData, labels, orderColor, revenueColor) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';
      
      const maxOrders = Math.max(...ordersData);
      const maxRevenue = Math.max(...revenueData);
      
      labels.forEach((label, index) => {
        const orderValue = ordersData[index];
        const revenueValue = revenueData[index];
        const orderPercentage = (orderValue / maxOrders) * 100;
        const revenuePercentage = (revenueValue / maxRevenue) * 100;
        
        const barItem = document.createElement('div');
        barItem.className = 'bar-item';
        
        const barContent = `
          <div class="mb-2">
            <span class="text-sm block mb-3 tracking-wide" style="color: ${config.card_text || defaultConfig.card_text}; font-family: ${config.font_family || defaultConfig.font_family}, sans-serif; font-size: ${(config.font_size || defaultConfig.font_size) * 0.875}px">${label}</span>
            
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full" style="background: ${orderColor}"></div>
                  <span class="text-xs  uppercase tracking-wider" style="color: ${config.secondary_text || defaultConfig.secondary_text}; font-family: ${config.font_family || defaultConfig.font_family}, sans-serif">Orders</span>
                </div>
                <span class="text-sm " style="color: ${config.card_text || defaultConfig.card_text}; font-family: ${config.font_family || defaultConfig.font_family}, sans-serif">${orderValue}</span>
              </div>
              <div class="w-full rounded-full h-3 overflow-hidden relative" style="background: ${orderColor}10">
                <div class="bar-fill h-full rounded-full relative overflow-hidden" style="width: ${orderPercentage}%; background: linear-gradient(90deg, ${orderColor}, ${orderColor}dd)">
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
            
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full" style="background: ${revenueColor}"></div>
                  <span class="text-xs uppercase tracking-wider" style="color: ${config.secondary_text || defaultConfig.secondary_text}; font-family: ${config.font_family || defaultConfig.font_family}, sans-serif">Revenue</span>
                </div>
                <span class="text-sm" style="color: ${config.card_text || defaultConfig.card_text}; font-family: ${config.font_family || defaultConfig.font_family}, sans-serif">₦${revenueValue.toLocaleString()}</span>
              </div>
              <div class="w-full rounded-full h-3 overflow-hidden relative" style="background: ${revenueColor}10">
                <div class="bar-fill h-full rounded-full relative overflow-hidden" style="width: ${revenuePercentage}%; background: linear-gradient(90deg, ${revenueColor}, ${revenueColor}dd)">
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        `;
        
        barItem.innerHTML = barContent;
        container.appendChild(barItem);
      });
    }

    function initCharts() {
      const chartData = getChartData(currentPeriod);
      
      const ordersTotal = chartData.orders.reduce((a, b) => a + b, 0);
      const revenueTotal = chartData.revenue.reduce((a, b) => a + b, 0);
      
      document.getElementById('orders-total').textContent = ordersTotal.toLocaleString();
      document.getElementById('revenue-total').textContent = '₦' + revenueTotal.toLocaleString();
      
      document.getElementById('orders-total').style.fontFamily = `${config.font_family || defaultConfig.font_family}, sans-serif`;
      document.getElementById('revenue-total').style.fontFamily = `${config.font_family || defaultConfig.font_family}, sans-serif`;
      document.getElementById('orders-total').style.color = config.primary_action || defaultConfig.primary_action;
      document.getElementById('revenue-total').style.color = config.primary_action || defaultConfig.primary_action;
      
      document.getElementById('orders-summary').style.background = (config.primary_action || defaultConfig.primary_action) + '10';
      document.getElementById('revenue-summary').style.background = (config.primary_action || defaultConfig.primary_action) + '10';
      
      createCombinedChart(
        'combinedChart', 
        chartData.orders, 
        chartData.revenue, 
        chartData.labels, 
        config.primary_action || defaultConfig.primary_action,
        config.primary_action || defaultConfig.primary_action
      );
    }

    document.querySelectorAll('.period-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentPeriod = this.dataset.period;
        initCharts();
      });
    });

    document.querySelector('[data-period="week"]').classList.add('active');

    // Page navigation
    function switchPage(pageName) {
      document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
      });
      
      document.getElementById(pageName + '-page').classList.add('active');
      
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if(link.dataset.page === pageName) {
          link.classList.add('active');
          link.classList.remove('text-white/70');
          link.classList.add('text-white');
        } else {
          link.classList.add('text-white/70');
          link.classList.remove('text-white');
        }
      });
      
      document.querySelectorAll('.footer-nav-link').forEach(link => {
        link.classList.remove('active');
        if(link.dataset.page === pageName) {
          link.classList.add('active');
        }
      });
    }

    document.querySelectorAll('.nav-link, .footer-nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        switchPage(this.dataset.page);
      });
    });

    async function onConfigChange(newConfig) {
      config = newConfig;
      
      const baseSize = config.font_size || defaultConfig.font_size;
      const fontFamily = config.font_family || defaultConfig.font_family;
      
      document.getElementById('sidebar').style.background = config.sidebar_bg || defaultConfig.sidebar_bg;
      document.getElementById('main-content').style.background = config.card_bg || defaultConfig.card_bg;
      document.getElementById('main-content').style.color = config.card_text || defaultConfig.card_text;
      
      document.getElementById('mobile-footer').style.background = config.sidebar_bg || defaultConfig.sidebar_bg;
      
      document.querySelectorAll('.footer-nav-link').forEach(link => {
        link.style.color = link.classList.contains('active') ? '#ffffff' : 'rgba(255, 255, 255, 0.7)';
      });
      
      document.getElementById('brand-name').textContent = config.brand_name || defaultConfig.brand_name;
      document.getElementById('brand-name').style.fontFamily = `${fontFamily}, sans-serif`;
      document.getElementById('brand-name').style.fontSize = `${baseSize * 1.5}px`;
      
      const titles = ['page-title', 'products-title', 'orders-title'];
      titles.forEach(titleId => {
        const title = document.getElementById(titleId);
        if(title) {
          title.style.fontFamily = `${fontFamily}, sans-serif`;
          title.style.fontSize = `${baseSize * 1.875}px`;
          title.style.color = config.card_text || defaultConfig.card_text;
        }
      });
      
      const placeholders = ['products-placeholder', 'orders-placeholder'];
      placeholders.forEach(id => {
        const el = document.getElementById(id);
        if(el) {
          el.style.color = config.secondary_text || defaultConfig.secondary_text;
          el.style.fontFamily = `${fontFamily}, sans-serif`;
        }
      });
      
      const pageContents = ['products-content', 'orders-content'];
      pageContents.forEach(id => {
        const el = document.getElementById(id);
        if(el) {
          el.style.background = config.chart_bg || defaultConfig.chart_bg;
        }
      });
      
      const cards = ['revenue-card', 'income-card', 'orders-card', 'new-orders-card'];
      cards.forEach(cardId => {
        const card = document.getElementById(cardId);
        card.style.background = config.card_bg || defaultConfig.card_bg;
        card.style.color = config.card_text || defaultConfig.card_text;
      });
      
      document.getElementById('revenue-label').textContent = config.total_revenue_label || defaultConfig.total_revenue_label;
      document.getElementById('income-label').textContent = config.income_today_label || defaultConfig.income_today_label;
      document.getElementById('orders-label').textContent = config.orders_today_label || defaultConfig.orders_today_label;
      document.getElementById('new-orders-label').textContent = config.new_orders_label || defaultConfig.new_orders_label;
      
      document.getElementById('analytics-title').textContent = config.analytics_title || defaultConfig.analytics_title;
      document.getElementById('analytics-title').style.fontFamily = `${fontFamily}, sans-serif`;
      document.getElementById('analytics-title').style.fontSize = `${baseSize * 1.25}px`;
      
      const iconBgs = ['revenue-icon-bg', 'income-icon-bg', 'orders-icon-bg', 'new-orders-icon-bg'];
      iconBgs.forEach(id => {
        document.getElementById(id).style.background = (config.primary_action || defaultConfig.primary_action) + '20';
      });
      
      const icons = ['revenue-icon', 'income-icon', 'orders-icon', 'new-orders-icon'];
      icons.forEach(id => {
        document.getElementById(id).style.stroke = config.primary_action || defaultConfig.primary_action;
      });
      
      document.getElementById('analytics-board').style.background = config.chart_bg || defaultConfig.chart_bg;
      
      document.querySelectorAll('.period-btn').forEach(btn => {
        btn.style.fontFamily = `${fontFamily}, sans-serif`;
        btn.style.fontSize = `${baseSize * 0.875}px`;
        if(btn.classList.contains('active')) {
          btn.style.background = config.primary_action || defaultConfig.primary_action;
          btn.style.color = '#ffffff';
        } else {
          btn.style.background = (config.primary_action || defaultConfig.primary_action) + '10';
          btn.style.color = config.card_text || defaultConfig.card_text;
        }
      });
      
      initCharts();
    }

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: (config) => ({
          recolorables: [
            {
              get: () => config.sidebar_bg || defaultConfig.sidebar_bg,
              set: (value) => {
                config.sidebar_bg = value;
                window.elementSdk.setConfig({ sidebar_bg: value });
              }
            },
            {
              get: () => config.card_bg || defaultConfig.card_bg,
              set: (value) => {
                config.card_bg = value;
                window.elementSdk.setConfig({ card_bg: value });
              }
            },
            {
              get: () => config.card_text || defaultConfig.card_text,
              set: (value) => {
                config.card_text = value;
                window.elementSdk.setConfig({ card_text: value });
              }
            },
            {
              get: () => config.primary_action || defaultConfig.primary_action,
              set: (value) => {
                config.primary_action = value;
                window.elementSdk.setConfig({ primary_action: value });
              }
            },
            {
              get: () => config.secondary_text || defaultConfig.secondary_text,
              set: (value) => {
                config.secondary_text = value;
                window.elementSdk.setConfig({ secondary_text: value });
              }
            }
          ],
          borderables: [],
          fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
              config.font_family = value;
              window.elementSdk.setConfig({ font_family: value });
            }
          },
          fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
              config.font_size = value;
              window.elementSdk.setConfig({ font_size: value });
            }
          }
        }),
        mapToEditPanelValues: (config) => new Map([
          ['brand_name', config.brand_name || defaultConfig.brand_name],
          ['total_revenue_label', config.total_revenue_label || defaultConfig.total_revenue_label],
          ['income_today_label', config.income_today_label || defaultConfig.income_today_label],
          ['orders_today_label', config.orders_today_label || defaultConfig.orders_today_label],
          ['new_orders_label', config.new_orders_label || defaultConfig.new_orders_label],
          ['analytics_title', config.analytics_title || defaultConfig.analytics_title]
        ])
      });
    }

    window.addEventListener('load', () => {
      initCharts();
    });






















            const DB_KEY = 'Nexus_V5_Store';
            let products = [];
            let currentFlow = '';
            const sizes = ["S","M","L","XL","XXL","38","40","42","44","46"];
            const naira = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 });

            function initApp() {
                const data = localStorage.getItem(DB_KEY);
                if(data) products = JSON.parse(data);
                renderGallery();
            }

            function switchView(v) {
                document.querySelectorAll('.nav-card, .view-container').forEach(el => el.classList.remove('active'));
                document.getElementById('nav-'+v).classList.add('active');
                document.getElementById('view-'+v).classList.add('active');
                if(v === 'gallery') renderGallery();
            }

            function showPopup(m) {
                const t = document.getElementById('toast');
                t.innerText = m; t.classList.add('show');
                setTimeout(() => t.classList.remove('show'), 3000);
            }

            function handleImg(input, previewId) {
                if (input.files && input.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = new Image();
                        img.src = e.target.result;
                        img.onload = function() {
                            const canvas = document.createElement('canvas');
                            const MAX = 700;
                            let w = img.width, h = img.height;
                            if (w > MAX) { h *= MAX / w; w = MAX; }
                            canvas.width = w; canvas.height = h;
                            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                            const result = canvas.toDataURL('image/jpeg', 0.65);
                            document.getElementById(previewId).src = result;
                            document.getElementById(previewId).classList.remove('hidden');
                        }
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }

            function startFlow(type) {
                currentFlow = type;
                const form = document.getElementById('modalForm');
                const titleMap = { 'latest': 'Latest Update', 'stock': 'In Stock Goods', 'arrival': 'New Arrival' };
                document.getElementById('modalTitle').innerText = titleMap[type];
                
                let html = `
                    <span class="section-label">Display Product</span>
                    <div class="media-drop" onclick="this.querySelector('input').click()">
                        <img id="main_p" class="hidden">
                        <span>📸 Click to Upload</span>
                        <input type="file" class="hidden" onchange="handleImg(this, 'main_p')">
                    </div>
                    <div class="input-box"><label>Product Name</label><input type="text" id="main_name"></div>
                    <div class="input-box"><label>Price (₦)</label><input type="number" id="main_price"></div>
                    <div class="input-box"><label>Stock</label><input type="number" id="main_stock" value="1"></div>
                    <div class="input-box"><label>Sizes</label><div class="size-grid" id="main_sizes">${sizes.map(s => `<div class="size-chip" onclick="this.classList.toggle('active')">${s}</div>`).join('')}</div></div>
                `;
                if(type === 'arrival' || type === 'stock') {
                    html += `<div id="subContainer"></div><button class="btn btn-outline" style="margin-top:10px" onclick="addSubItemForm()">+ Add Sub Product</button>`;
                }
                form.innerHTML = html;
                document.getElementById('modal').style.display = 'flex';
            }

            function addSubItemForm() {
                const id = Date.now();
                const div = document.createElement('div');
                div.className = 'sub-form-block';
                div.innerHTML = `
                    <span class="remove-sub" onclick="this.parentElement.remove()">REMOVE</span>
                    <span class="section-label" style="margin-top:0">Sub Item Details</span>
                    <div class="media-drop" style="height:150px" onclick="this.querySelector('input').click()">
                        <img id="img_${id}" class="hidden">
                        <span>Add Photo</span>
                        <input type="file" class="hidden" onchange="handleImg(this, 'img_${id}')">
                    </div>
                    <div class="input-box"><label>Name</label><input type="text" class="s-name"></div>
                    <div class="input-box"><label>Price</label><input type="number" class="s-price"></div>
                    <div class="input-box"><label>Stock</label><input type="number" class="s-stock" value="1"></div>
                    <div class="input-box"><label>Sizes</label><div class="size-grid s-sizes">${sizes.map(s => `<div class="size-chip" onclick="this.classList.toggle('active')">${s}</div>`).join('')}</div></div>
                `;
                document.getElementById('subContainer').appendChild(div);
            }

            function finalPublish() {
                const mainImg = document.getElementById('main_p').src;
                if(!mainImg || mainImg.includes('hidden')) return showPopup("Image required");

                const product = {
                    id: Date.now(),
                    type: currentFlow,
                    name: document.getElementById('main_name').value,
                    price: document.getElementById('main_price').value,
                    stock: document.getElementById('main_stock').value,
                    sizes: Array.from(document.querySelectorAll('#main_sizes .size-chip.active')).map(c => c.innerText),
                    image: mainImg,
                    subs: []
                };

                if(currentFlow === 'arrival' || currentFlow === 'stock') {
                    document.querySelectorAll('.sub-form-block').forEach(block => {
                        const sImg = block.querySelector('img').src;
                        if(sImg && !sImg.includes('hidden')) {
                            product.subs.push({
                                name: block.querySelector('.s-name').value,
                                price: block.querySelector('.s-price').value,
                                stock: block.querySelector('.s-stock').value,
                                image: sImg,
                                sizes: Array.from(block.querySelectorAll('.s-sizes .size-chip.active')).map(c => c.innerText)
                            });
                        }
                    });
                }

                products.unshift(product);
                saveAndSync();
                closeModal();
                switchView('gallery');
                showPopup("Product Published!");
            }

            function renderGallery() {
                const latestCont = document.getElementById('latestContainer');
                const stockCont = document.getElementById('stockContainer');
                const arrivalCont = document.getElementById('arrivalsContainer');
                
                const latests = products.filter(p => p.type === 'latest');
                const stocks = products.filter(p => p.type === 'stock');
                const arrivals = products.filter(p => p.type === 'arrival');

                document.getElementById('latestCount').innerText = `${latests.length} Items`;
                document.getElementById('stockCount').innerText = `${stocks.length} Items`;
                document.getElementById('arrivalCount').innerText = `${arrivals.length} Items`;

                latestCont.innerHTML = latests.length ? latests.map(p => `
                    <div class="latest-item" onclick="openDetails(${p.id})">
                        <img src="${p.image}">
                        <div class="arrival-info">
                           <b>${p.name}</b>
                           <span>${naira.format(p.price)}</span>
                        </div>
                    </div>
                `).join('') : '<div class="empty-state">No latest updates uploaded</div>';

                stockCont.innerHTML = stocks.length ? stocks.map(p => `
                    <div class="arrival-card" onclick="openDetails(${p.id})">
                        <img src="${p.image}">
                        <div class="arrival-info">
                            <b>${p.name}</b>
                            <span>${naira.format(p.price)}</span>
                        </div>
                    </div>
                `).join('') : '<div class="empty-state" style="grid-column: span 2">No in stock items uploaded</div>';

                arrivalCont.innerHTML = arrivals.length ? arrivals.map(p => `
                    <div class="arrival-card" onclick="openDetails(${p.id})">
                        <img src="${p.image}">
                        <div class="arrival-info">
                            <b>${p.name}</b>
                            <span>${naira.format(p.price)}</span>
                        </div>
                    </div>
                `).join('') : '<div class="empty-state" style="grid-column: span 2">No new arrivals uploaded</div>';
            }

            function openDetails(id) {
                const p = products.find(x => x.id === id);
                const view = document.getElementById('sheetViewMode');
                const typeLabel = { 'latest': 'Latest Update', 'stock': 'In Stock Bundle', 'arrival': 'New Arrival Bundle' };
                
                view.innerHTML = `
                    <img src="${p.image}" class="sheet-img">
                    <span class="section-label">${typeLabel[p.type]}</span>
                    <h2 style="margin:5px 0">${p.name}</h2>
                    <p style="font-size:24px; font-weight:500; color:var(--accent); margin:0">${naira.format(p.price)}</p>
                    <p style="font-size:18px; color:var(--text-offset); margin-top:10px;"><b>Stock:</b> ${p.stock} | <b>Sizes:</b> ${p.sizes.join(', ') || 'Standard'}</p>
                    
                    ${p.subs.length > 0 ? `
                        <span class="section-label">Included Items</span>
                        <div class="sub-preview-row">
                            ${p.subs.map(s => `
                                <div class="sub-preview-card">
                                    <img src="${s.image}">
                                    <b>${s.name}</b><br><p>${naira.format(s.price)}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    <div class="btn-group">
                        <button class="btn btn-outline" onclick="openEdit(${p.id})">Edit Product</button>
                        <button class="btn btn-black" style="background:#ff3b30" onclick="deleteProd(${p.id})">Delete</button>
                    </div>
                `;
                document.getElementById('sheetEditMode').classList.add('hidden');
                view.classList.remove('hidden');
                document.getElementById('overlayb').style.display = 'block';
                document.getElementById('sheetb').classList.add('open');
            }

            function openEdit(id) {
                const p = products.find(x => x.id === id);
                const edit = document.getElementById('sheetEditMode');
                let subForms = p.subs.map((s, i) => `
                    <div class="sub-form-block edit-sub-block">
                        <span class="section-label" style="margin-top:0">Sub Item ${i+1}</span>
                        <div class="media-drop" style="height:120px" onclick="this.querySelector('input').click()">
                            <img src="${s.image}" id="e_s_img_${i}">
                            <input type="file" class="hidden" onchange="handleImg(this, 'e_s_img_${i}')">
                        </div>
                        <div class="input-box"><label>Name</label><input type="text" class="es-name" value="${s.name}"></div>
                        <div class="input-box"><label>Price</label><input type="number" class="es-price" value="${s.price}"></div>
                        <div class="input-box"><label>Stock</label><input type="number" class="es-stock" value="${s.stock}"></div>
                        <div class="input-box"><label>Sizes</label><div class="size-grid es-sizes">${sizes.map(sz => `<div class="size-chip ${s.sizes.includes(sz)?'active':''}" onclick="this.classList.toggle('active')">${sz}</div>`).join('')}</div></div>
                    </div>
                `).join('');

                edit.innerHTML = `
                    <span class="section-label">Edit Display Image</span>
                    <div class="media-drop" style="height:150px" onclick="this.querySelector('input').click()">
                        <img src="${p.image}" id="e_main_img">
                        <input type="file" class="hidden" onchange="handleImg(this, 'e_main_img')">
                    </div>
                    <div class="input-box"><label>Name</label><input type="text" id="en_name" value="${p.name}"></div>
                    <div class="input-box"><label>Price</label><input type="number" id="en_price" value="${p.price}"></div>
                    <div class="input-box"><label>Stock</label><input type="number" id="en_stock" value="${p.stock}"></div>
                    <div class="input-box"><label>Sizes</label><div class="size-grid" id="en_sizes">${sizes.map(sz => `<div class="size-chip ${p.sizes.includes(sz)?'active':''}" onclick="this.classList.toggle('active')">${sz}</div>`).join('')}</div></div>
                    ${subForms}
                    <div class="btn-groupb">
                        <button class="btn btn-black" onclick="saveGlobalEdit(${p.id})">Update Product</button>
                        <button class="btn btn-outline" onclick="exitEdit()">Cancel</button>
                    </div>
                `;
                document.getElementById('sheetViewMode').classList.add('hidden');
                edit.classList.remove('hidden');
            }

            function saveGlobalEdit(id) {
                const p = products.find(x => x.id === id);
                p.name = document.getElementById('en_name').value;
                p.price = document.getElementById('en_price').value;
                p.stock = document.getElementById('en_stock').value;
                p.image = document.getElementById('e_main_img').src;
                p.sizes = Array.from(document.querySelectorAll('#en_sizes .size-chip.active')).map(c => c.innerText);
                document.querySelectorAll('.edit-sub-block').forEach((block, i) => {
                    p.subs[i].name = block.querySelector('.es-name').value;
                    p.subs[i].price = block.querySelector('.es-price').value;
                    p.subs[i].stock = block.querySelector('.es-stock').value;
                    p.subs[i].image = block.querySelector('img').src;
                    p.subs[i].sizes = Array.from(block.querySelectorAll('.es-sizes .size-chip.active')).map(c => c.innerText);
                });
                saveAndSync();
                openDetails(id);
                showPopup("Store Updated");
            }

            function saveAndSync() { localStorage.setItem(DB_KEY, JSON.stringify(products)); renderGallery(); }
            function deleteProd(id) { if(confirm("Permanently delete?")) { products = products.filter(x => x.id !== id); saveAndSync(); closeSheetb(); } }
            function exitEdit() { document.getElementById('sheetEditMode').classList.add('hidden'); document.getElementById('sheetViewMode').classList.remove('hidden'); }
            function closeModal() { document.getElementById('modal').style.display = 'none'; }
            function closeSheetb() { document.getElementById('sheetb').classList.remove('open'); setTimeout(()=>document.getElementById('overlayb').style.display='none',300); }
            function clearAllData() { if(confirm("Wipe all store data?")) { localStorage.clear(); products = []; renderGallery(); } }
        













































                // --- UTILITIES ---
    function formatMoney(num) {
        return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const chartData = {
        'Daily': [{l:'Mon',v:12},{l:'Tue',v:19},{l:'Wed',v:15},{l:'Thu',v:22},{l:'Fri',v:30},{l:'Sat',v:28},{l:'Sun',v:10}],
        'Weekly': [{l:'Week 1',v:105},{l:'Week 2',v:88},{l:'Week 3',v:120},{l:'Week 4',v:145}],
        'Monthly': [{l:'Jan',v:450},{l:'Feb',v:390},{l:'Mar',v:420},{l:'Apr',v:510},{l:'May',v:480},{l:'Jun',v:320},{l:'Jul',v:290},{l:'Aug',v:410},{l:'Sep',v:560},{l:'Oct',v:610},{l:'Nov',v:890},{l:'Dec',v:1200}]
    };

    const orders = [
        {
            id: "NX-8801",
            customer: "Bolanle Williams",
            phone: "0803 445 1122",
            city: "Lagos",
            area: "Victoria Island",
            address: "Apt 12, Ocean View Towers",
            type: "Delivery",
            shippingFee: 3500,
            status: "Paid",
            items: [{ name: "Nexus Stealth Hoodie", price: 45000, qty: 1, size: "L", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200" }]
        },
        {
            id: "NX-8802",
            customer: "Chidi Okafor",
            phone: "0902 111 2233",
            city: "",
            area: "Pickup at the store",
            address: "",
            type: "Pickup",
            shippingFee: 0,
            status: "paid",
            items: [{ name: "Urban Tech Joggers", price: 35000, qty: 1, size: "M", img: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=200" }]
        }
    ];

    // --- CORE LOGIC ---
    function loadChart(mode, btn) {
        document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const area = document.getElementById('chart-area');
        const data = chartData[mode];
        const max = Math.max(...data.map(d => d.v));
        area.innerHTML = data.map(d => `
            <div class="bar-row">
                <span class="bar-label">${d.l}</span>
                <div class="bar-track"><div class="bar-fill" style="width: ${(d.v/max)*100}%"></div></div>
                <span class="bar-val">${d.v}</span>
            </div>`).join('');
    }

    function renderData() {
        const grid = document.getElementById('order-cards');
        const tbody = document.getElementById('table-body');
        
        grid.innerHTML = orders.map(o => {
            const itemTotal = o.items.reduce((acc, i) => acc + (i.price*i.qty), 0);
            return `
            <div class="card" onclick="openManifest('${o.id}')">
                <span class="tag ${o.type==='Delivery'?'tag-delivery':'tag-pickup'}">${o.type}</span>
                <h3 style="margin:0; font-size:20px; font-weight:800;">${o.customer}</h3>
                <p style="margin:5px 0 15px; color:var(--text-offset); font-size:13px;">${o.area}, ${o.city}</p>
                <p style="font-weight:500; font-size:18px;">${formatMoney(itemTotal + o.shippingFee)}</p>
            </div>`;
        }).join('');

        tbody.innerHTML = orders.map(o => {
            const itemTotal = o.items.reduce((acc, i) => acc + (i.price*i.qty), 0);
            return `
            <tr>
                <td style="font-weight:800;">${o.id}</td>
                <td>${o.customer}</td>
                <td><b>${o.area}</b>, ${o.city}</td>
                <td style="color:var(--accent); font-weight:700;">${o.shippingFee > 0 ? formatMoney(o.shippingFee) : 'FREE'}</td>
                <td style="font-weight:800;">${formatMoney(itemTotal + o.shippingFee)}</td>
                <td><span style="font-size:11px; font-weight:800; color:${o.status==='Paid'?'#2e7d32':'#2e7d32'}">${o.status}</span></td>
            </tr>`;
        }).join('');
    }

    function openManifest(id) {
        const o = orders.find(x => x.id === id);
        const itemTotal = o.items.reduce((acc, i) => acc + (i.price*i.qty), 0);
        const grandTotal = itemTotal + o.shippingFee;

        document.getElementById('manifest-content').innerHTML = `
            <div style="text-align:center; margin-bottom:20px;">
                <div style="width:40px; height:5px; background:#e5e5e5; border-radius:10px; margin: 0 auto 25px;"></div>
                <h2 style="font-size:28px; font-weight:800; margin:0 0 10px;">${o.customer}</h2>
                <div class="area-pill">📍 ${o.area.toUpperCase()}, ${o.city.toUpperCase()}</div>
                <button class="copy-btn" id="copy-btn" onclick="copyInfo('${o.customer}', '${o.phone}', '${o.address}', '${o.city}', '${o.area}', '${o.type}')">
                    Copy Details
                </button>
            </div>

            <div style="background:#f9f9fb; padding:15px; border-radius:24px; font-size:14px; line-height:1.6; margin-bottom:30px; border:1px solid #eee;">
                <div style="margin-bottom:12px;">
                    <span style="color:var(--text-offset); font-size:11px; font-weight:800; text-transform:uppercase; display:block;">Phone Number</span>
                    <b style="font-size:16px;">${o.phone}</b>
                </div>
                <div>
                    <span style="color:var(--text-offset); font-size:11px; font-weight:800; text-transform:uppercase; display:block;">Address Detail</span>
                    ${o.type === 'Delivery' 
                        ? `<b style="font-size:15px; display:block;">${o.address}</b>
                           <span style="color:var(--accent); font-weight:800;">${o.area}, ${o.city}</span>` 
                        : `<b style="color:var(--accent); font-size:15px;">Customer Pickup At Store</b>`
                    }
                </div>
            </div>

            <h4 style="text-transform:uppercase; font-size:10px; color:var(--text-offset); letter-spacing:1px; margin-bottom:15px;">Order Items</h4>
            ${o.items.map(i => `
                <div class="manifest-item">
                    <img src="${i.img}">
                    <div style="flex:1"><b style="font-weight: 500;">${i.name}</b><br><small>Size: ${i.size} • Qty: ${i.qty}</small></div>
                    <b>${formatMoney(i.price * i.qty)}</b>
                </div>`).join('')}

            <div class="price-breakdown">
                <div class="price-row"><span>Items Total</span><b>${formatMoney(itemTotal)}</b></div>
                <div class="price-row"><span>Shipping to: ${o.area}</span><b style="color:var(--accent)">${o.shippingFee > 0 ? formatMoney(o.shippingFee) : 'FREE'}</b></div>
                <div class="total-row"><span>Grand Total</span><span>${formatMoney(grandTotal)}</span></div>
            </div>`;

        document.getElementById('overlay').style.display = 'block';
        setTimeout(() => document.getElementById('order-sheet').classList.add('open'), 10);
    }

    function copyInfo(name, phone, address, city, area, type) {
        const text = type === 'Delivery' 
            ? `CUSTOMER: ${name}\nPHONE: ${phone}\nREGION: ${area}, ${city}\nADDRESS: ${address}`
            : `CUSTOMER: ${name}\nPHONE: ${phone}\nMETHOD: Pickup At Store`;
        
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById('copy-btn');
            btn.innerText = "Details Copied";
            btn.style.background = "#2e7d32";
            setTimeout(() => { btn.innerText = "Copy Details"; btn.style.background = "var(--accent)"; }, 2000);
        });
    }

    function closeSheet() {
        document.getElementById('order-sheet').classList.remove('open');
        setTimeout(() => document.getElementById('overlay').style.display = 'none', 500);
    }

    // --- AUTO INITIALIZATION (No onload required) ---
    document.addEventListener('DOMContentLoaded', () => {
        // Setup chart buttons
        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.addEventListener('click', () => loadChart(btn.innerText, btn));
        });

        // Initialize view
        loadChart('Daily', document.getElementById('default-chart-btn'));
        renderData();
    });