import { store } from './state.js';
import { renderDashboard } from './screens/dashboard.js';
import { renderInventory } from './screens/inventory.js';
import { renderSuppliers } from './screens/suppliers.js';
import { renderPurchaseOrders } from './screens/purchaseOrders.js';
import { renderSales } from './screens/sales.js';
import { renderStockMovement } from './screens/stockMovement.js';
import { renderReports } from './screens/reports.js';
import { renderSettings } from './screens/settings.js';

// Map of screen rendering functions
const screens = {
  dashboard: renderDashboard,
  inventory: renderInventory,
  suppliers: renderSuppliers,
  purchaseOrders: renderPurchaseOrders,
  sales: renderSales,
  stockMovement: renderStockMovement,
  reports: renderReports,
  settings: renderSettings
};

const screenTitles = {
  dashboard: 'Dashboard Overview',
  inventory: 'Product & Stock Inventory',
  suppliers: 'Supplier Management Network',
  purchaseOrders: 'Purchase Orders & Stock Intake',
  sales: 'Sales Invoices & Revenue',
  stockMovement: 'Stock Movement Audit Ledger',
  reports: 'Reports & Predictive Analytics',
  settings: 'System Preferences & Settings'
};

document.addEventListener('DOMContentLoaded', () => {
  // Login & Authentication Handlers
  const loginForm = document.getElementById('login-form');
  const loginScreen = document.getElementById('login-screen');
  const appContainer = document.getElementById('app');
  const loginEmailInput = document.getElementById('login-email');
  const loginPasswordInput = document.getElementById('login-password');
  const btnQuickDemoLogin = document.getElementById('btn-quick-demo-login');
  const btnHeaderLogout = document.getElementById('btn-header-logout');
  const headerUserAvatar = document.getElementById('header-user-avatar');
  const headerUserName = document.getElementById('header-user-name');
  const headerUserRole = document.getElementById('header-user-role');

  function updateHeaderUserInfo(user) {
    if (!user) return;
    if (headerUserName) headerUserName.textContent = user.name || 'Operator';
    if (headerUserRole) headerUserRole.textContent = user.role || 'Enterprise Operator';
    if (headerUserAvatar) {
      const initials = (user.name || 'OP')
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
      headerUserAvatar.textContent = initials || 'OP';
    }
  }

  function performLogin(email, password, customName) {
    const user = store.loginUser(email, password, customName);
    updateHeaderUserInfo(user);
    if (loginScreen) loginScreen.style.display = 'none';
    if (appContainer) appContainer.style.display = 'flex';
    showNotification(`Welcome, ${user.name}! Logged in as ${user.email}`);
  }

  function performLogout() {
    store.logoutUser();
    if (loginScreen) loginScreen.style.display = 'flex';
    if (appContainer) appContainer.style.display = 'none';
    if (loginPasswordInput) loginPasswordInput.value = '';
    showNotification('Logged out successfully');
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginEmailInput ? loginEmailInput.value.trim() : 'admin@stocksync.ai';
      const password = loginPasswordInput ? loginPasswordInput.value : '';
      performLogin(email, password);
    });
  }

  if (btnQuickDemoLogin) {
    btnQuickDemoLogin.addEventListener('click', () => {
      if (loginEmailInput) loginEmailInput.value = 'admin@stocksync.ai';
      if (loginPasswordInput) loginPasswordInput.value = 'password123';
      performLogin('admin@stocksync.ai', 'password123', 'Alex Morgan');
    });
  }

  if (btnHeaderLogout) {
    btnHeaderLogout.addEventListener('click', (e) => {
      e.stopPropagation();
      performLogout();
    });
  }

  // Restore session if previously logged in
  if (store.data.currentUser && store.data.currentUser.isLoggedIn) {
    updateHeaderUserInfo(store.data.currentUser);
    if (loginScreen) loginScreen.style.display = 'none';
    if (appContainer) appContainer.style.display = 'flex';
  }

  const contentArea = document.getElementById('content-area');
  const pageTitleText = document.getElementById('page-title-text');
  const navItems = document.querySelectorAll('.nav-item');
  const globalSearchInput = document.getElementById('global-search-input');
  
  // AI Drawer Elements
  const aiDrawer = document.getElementById('ai-drawer');
  const aiOverlay = document.getElementById('ai-drawer-overlay');
  const btnToggleAi = document.getElementById('btn-toggle-ai-drawer');
  const btnCloseAi = document.getElementById('btn-close-ai-drawer');
  const sidebarAiTrigger = document.getElementById('sidebar-ai-trigger');
  const aiDrawerContent = document.getElementById('ai-drawer-content');
  const aiChatInput = document.getElementById('ai-chat-input');
  const btnSendAiPrompt = document.getElementById('btn-send-ai-prompt');

  // Mobile Preview Elements
  const btnToggleMobile = document.getElementById('btn-toggle-mobile-modal');
  const mobileOverlay = document.getElementById('mobile-modal-overlay');
  const btnCloseMobile = document.getElementById('btn-close-mobile-preview');
  const iphoneScreenContent = document.getElementById('iphone-screen-content');

  // Router render function
  function renderCurrentScreen() {
    const active = store.data.activeScreen || 'dashboard';

    // Update title
    if (pageTitleText) pageTitleText.textContent = screenTitles[active] || 'Dashboard';

    // Update active nav state
    navItems.forEach(item => {
      if (item.dataset.screen === active) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Render screen component
    if (screens[active]) {
      contentArea.innerHTML = '';
      screens[active](contentArea);
    }
  }

  // Subscribe to state changes
  store.subscribe((data) => {
    renderCurrentScreen();
    renderAiDrawerContent();

    // Toggle AI drawer visibility
    if (data.aiDrawerOpen) {
      aiDrawer.classList.add('open');
      aiOverlay.classList.add('open');
    } else {
      aiDrawer.classList.remove('open');
      aiOverlay.classList.remove('open');
    }
  });

  // Mobile sidebar menu toggle for small screens
  const mobileSidebarBtn = document.getElementById('btn-toggle-mobile-sidebar');
  const sidebar = document.getElementById('sidebar');
  const btnCloseSidebar = document.getElementById('btn-close-sidebar');

  if (mobileSidebarBtn && sidebar) {
    mobileSidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }
  if (btnCloseSidebar && sidebar) {
    btnCloseSidebar.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
    });
  }

  // Navigation click listeners
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const screenName = item.dataset.screen;
      store.setActiveScreen(screenName);
      
      // Auto-close sidebar on mobile/app-mode after navigation
      if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
      }
    });
  });

  // --- GLOBAL SEARCH LOGIC ---
  const globalSearchClear = document.getElementById('global-search-clear');
  const globalSearchDropdown = document.getElementById('global-search-dropdown');
  const globalSearchWrapper = document.getElementById('global-search-wrapper');

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function highlightMatch(text, query) {
    if (!text || !query) return text || '';
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeQuery})`, 'gi');
    return String(text).replace(regex, '<span class="highlight-match">$1</span>');
  }

  function closeGlobalDropdown() {
    if (globalSearchDropdown) {
      globalSearchDropdown.style.display = 'none';
      globalSearchDropdown.innerHTML = '';
    }
  }

  function renderGlobalSearchResults(query) {
    if (!globalSearchDropdown) return;
    const cleanQuery = (query || '').trim().toLowerCase();

    if (!cleanQuery) {
      closeGlobalDropdown();
      return;
    }

    const { products, suppliers, purchaseOrders } = store.data;

    // Filter products
    const matchedProducts = products.filter(p =>
      (p.name && p.name.toLowerCase().includes(cleanQuery)) ||
      (p.sku && p.sku.toLowerCase().includes(cleanQuery)) ||
      (p.category && p.category.toLowerCase().includes(cleanQuery)) ||
      (p.supplierName && p.supplierName.toLowerCase().includes(cleanQuery))
    ).slice(0, 5);

    // Filter suppliers
    const matchedSuppliers = suppliers.filter(s =>
      (s.name && s.name.toLowerCase().includes(cleanQuery)) ||
      (s.contactPerson && s.contactPerson.toLowerCase().includes(cleanQuery)) ||
      (s.id && s.id.toLowerCase().includes(cleanQuery))
    ).slice(0, 3);

    // Filter purchase orders
    const matchedPOs = purchaseOrders.filter(po =>
      (po.id && po.id.toLowerCase().includes(cleanQuery)) ||
      (po.productName && po.productName.toLowerCase().includes(cleanQuery)) ||
      (po.supplierName && po.supplierName.toLowerCase().includes(cleanQuery))
    ).slice(0, 3);

    const totalMatches = matchedProducts.length + matchedSuppliers.length + matchedPOs.length;

    if (totalMatches === 0) {
      globalSearchDropdown.innerHTML = `
        <div class="search-empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <div style="font-weight: 700; font-size: 13px; color: #1e293b;">No matching results</div>
          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">No products, suppliers, or orders found for "${escapeHtml(query)}"</div>
        </div>
      `;
      globalSearchDropdown.style.display = 'flex';
      return;
    }

    let html = `<div class="search-dropdown-scroll">`;

    // Products section
    if (matchedProducts.length > 0) {
      html += `<div class="search-section-header"><span>📦 Products (${matchedProducts.length})</span></div>`;
      matchedProducts.forEach(p => {
        const isLow = p.stock <= p.reorderPoint;
        const statusBadge = p.stock === 0
          ? '<span class="badge badge-out" style="font-size: 10px; padding: 2px 6px;">Out</span>'
          : (isLow
            ? '<span class="badge badge-low" style="font-size: 10px; padding: 2px 6px;">Low</span>'
            : '<span class="badge badge-in" style="font-size: 10px; padding: 2px 6px;">In Stock</span>');

        html += `
          <div class="search-dropdown-item" data-action="product" data-id="${p.id}" data-name="${encodeURIComponent(p.name)}">
            <div class="search-dropdown-item-left">
              <div class="search-item-icon">📦</div>
              <div class="search-item-details">
                <div class="search-item-title">${highlightMatch(p.name, query)}</div>
                <div class="search-item-meta">
                  <span>${highlightMatch(p.sku, query)}</span> •
                  <span>${highlightMatch(p.category, query)}</span> •
                  <span>${highlightMatch(p.supplierName, query)}</span>
                </div>
              </div>
            </div>
            <div class="search-dropdown-item-right">
              ${statusBadge}
              <span style="font-size: 11px; font-weight: 700; color: #0f172a;">${p.stock} units • $${p.sellingPrice.toFixed(2)}</span>
            </div>
          </div>
        `;
      });
    }

    // Suppliers section
    if (matchedSuppliers.length > 0) {
      html += `<div class="search-section-header"><span>🏢 Suppliers (${matchedSuppliers.length})</span></div>`;
      matchedSuppliers.forEach(s => {
        html += `
          <div class="search-dropdown-item" data-action="supplier" data-id="${s.id}">
            <div class="search-dropdown-item-left">
              <div class="search-item-icon" style="background: #ecfdf5; color: #059669;">🏢</div>
              <div class="search-item-details">
                <div class="search-item-title">${highlightMatch(s.name, query)}</div>
                <div class="search-item-meta">
                  <span>${highlightMatch(s.contactPerson, query)}</span> •
                  <span>${highlightMatch(s.id, query)}</span>
                </div>
              </div>
            </div>
            <div class="search-dropdown-item-right">
              <span class="badge badge-in" style="font-size: 10px; padding: 2px 6px;">${s.reliabilityScore}% SLA</span>
              <span style="font-size: 10px; color: #64748b;">${s.status}</span>
            </div>
          </div>
        `;
      });
    }

    // Purchase orders section
    if (matchedPOs.length > 0) {
      html += `<div class="search-section-header"><span>📋 Purchase Orders (${matchedPOs.length})</span></div>`;
      matchedPOs.forEach(po => {
        html += `
          <div class="search-dropdown-item" data-action="po" data-id="${po.id}">
            <div class="search-dropdown-item-left">
              <div class="search-item-icon" style="background: #fdf4ff; color: #a855f7;">📋</div>
              <div class="search-item-details">
                <div class="search-item-title">${highlightMatch(po.id, query)} — ${highlightMatch(po.productName, query)}</div>
                <div class="search-item-meta">
                  <span>${highlightMatch(po.supplierName, query)}</span> •
                  <span>${po.quantity} units</span>
                </div>
              </div>
            </div>
            <div class="search-dropdown-item-right">
              <span class="badge badge-purple" style="font-size: 10px; padding: 2px 6px;">${po.status}</span>
              <span style="font-size: 11px; font-weight: 700; color: #0f172a;">$${po.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        `;
      });
    }

    html += `</div>`;
    html += `
      <div class="search-dropdown-footer" id="search-view-all-inventory">
        <span>View all matching products in Inventory</span>
        <span>Enter ↵</span>
      </div>
    `;

    globalSearchDropdown.innerHTML = html;
    globalSearchDropdown.style.display = 'flex';

    // Click listeners on items in dropdown
    globalSearchDropdown.querySelectorAll('.search-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.dataset.action;
        const name = item.dataset.name ? decodeURIComponent(item.dataset.name) : '';

        closeGlobalDropdown();

        if (action === 'product') {
          globalSearchInput.value = name;
          if (globalSearchClear) globalSearchClear.style.display = 'flex';
          store.setSearchQuery(name, true);
          store.setActiveScreen('inventory');
          window.dispatchEvent(new CustomEvent('update-inventory-search', { detail: { query: name } }));
        } else if (action === 'supplier') {
          store.setActiveScreen('suppliers');
        } else if (action === 'po') {
          store.setActiveScreen('purchaseOrders');
        }
      });
    });

    globalSearchDropdown.querySelector('#search-view-all-inventory')?.addEventListener('click', () => {
      closeGlobalDropdown();
      const val = globalSearchInput.value.trim();
      store.setSearchQuery(val, true);
      store.setActiveScreen('inventory');
      window.dispatchEvent(new CustomEvent('update-inventory-search', { detail: { query: val } }));
    });
  }

  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', () => {
      const val = globalSearchInput.value;
      if (globalSearchClear) globalSearchClear.style.display = val.trim() ? 'flex' : 'none';

      // Update state silently so full screen isn't wiped
      store.setSearchQuery(val, true);

      // If active screen is inventory, update table instantly
      if (store.data.activeScreen === 'inventory') {
        window.dispatchEvent(new CustomEvent('update-inventory-search', { detail: { query: val } }));
      }

      renderGlobalSearchResults(val);
    });

    globalSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = globalSearchInput.value.trim();
        closeGlobalDropdown();
        store.setSearchQuery(val, true);
        if (store.data.activeScreen !== 'inventory') {
          store.setActiveScreen('inventory');
        } else {
          window.dispatchEvent(new CustomEvent('update-inventory-search', { detail: { query: val } }));
        }
      } else if (e.key === 'Escape') {
        closeGlobalDropdown();
        globalSearchInput.blur();
      }
    });

    globalSearchInput.addEventListener('focus', () => {
      if (globalSearchInput.value.trim()) {
        renderGlobalSearchResults(globalSearchInput.value);
      }
    });
  }

  if (globalSearchClear) {
    globalSearchClear.addEventListener('click', () => {
      globalSearchInput.value = '';
      globalSearchClear.style.display = 'none';
      closeGlobalDropdown();
      store.setSearchQuery('', true);
      if (store.data.activeScreen === 'inventory') {
        window.dispatchEvent(new CustomEvent('update-inventory-search', { detail: { query: '' } }));
      }
      globalSearchInput.focus();
    });
  }

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (globalSearchWrapper && !globalSearchWrapper.contains(e.target)) {
      closeGlobalDropdown();
    }
  });

  // Global Keyboard Shortcut: Ctrl + K or Cmd + K or / to focus search
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      globalSearchInput?.focus();
      globalSearchInput?.select();
    } else if (e.key === '/' && document.activeElement !== globalSearchInput && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
      e.preventDefault();
      globalSearchInput?.focus();
      globalSearchInput?.select();
    }
  });

  // --- AI DRAWER LOGIC ---
  function renderAiDrawerContent() {
    if (!aiDrawerContent) return;
    const { aiInsights } = store.data;

    aiDrawerContent.innerHTML = aiInsights.map(insight => `
      <div class="ai-insight-card">
        <div class="ai-insight-header">
          <span style="font-weight: 800; font-size: 13px; color: #ffffff;">${insight.title}</span>
          <span class="ai-tag ${insight.priority === 'critical' ? 'ai-tag-critical' : (insight.priority === 'high' ? 'ai-tag-high' : 'ai-tag-medium')}">
            ${insight.priority}
          </span>
        </div>
        <div class="ai-insight-body">
          <p>${insight.message}</p>
        </div>
        <div class="ai-insight-action">
          <button class="btn btn-primary btn-sm btn-drawer-ai-action" data-prodid="${insight.productId || ''}" data-qty="${insight.recommendedQty}" data-supid="${insight.recommendedSupplierId}">
            ⚡ ${insight.actionLabel}
          </button>
        </div>
      </div>
    `).join('');

    aiDrawerContent.querySelectorAll('.btn-drawer-ai-action').forEach(btn => {
      btn.addEventListener('click', () => {
        store.toggleAiDrawer(false);
        window.dispatchEvent(new CustomEvent('open-modal', {
          detail: {
            modal: 'po',
            prefill: {
              productId: btn.dataset.prodid,
              quantity: btn.dataset.qty,
              supplierId: btn.dataset.supid
            }
          }
        }));
      });
    });
  }

  btnToggleAi?.addEventListener('click', () => store.toggleAiDrawer(true));
  sidebarAiTrigger?.addEventListener('click', () => store.toggleAiDrawer(true));
  btnCloseAi?.addEventListener('click', () => store.toggleAiDrawer(false));
  aiOverlay?.addEventListener('click', () => store.toggleAiDrawer(false));

  btnSendAiPrompt?.addEventListener('click', () => handleAiChat());
  aiChatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAiChat();
  });

  function handleAiChat() {
    const text = aiChatInput.value.trim();
    if (!text) return;

    aiChatInput.value = '';
    const { products, suppliers } = store.data;
    const lowCount = products.filter(p => p.stock <= p.reorderPoint).length;

    const responseCard = document.createElement('div');
    responseCard.className = 'ai-insight-card';
    responseCard.style.borderColor = '#10b981';
    responseCard.innerHTML = `
      <div class="ai-insight-header">
        <span style="font-weight: 800; font-size: 13px; color: #10b981;">AI Analysis Response</span>
        <span class="ai-tag ai-tag-medium">Instant</span>
      </div>
      <div class="ai-insight-body">
        <p><strong>Query:</strong> "${text}"</p>
        <p style="margin-top: 6px; color: #a5b4fc;">
          Analysis complete: Currently, <strong>${lowCount} items</strong> require immediate reordering. The most reliable supplier is <strong>${suppliers[0].name}</strong> (98.4% delivery SLA). Recommended total safety stock buffer is 1.5x.
        </p>
      </div>
    `;

    aiDrawerContent.prepend(responseCard);
  }

  // --- APP/WEB MODE TOGGLE LOGIC ---

  let isAppMode = false;
  
  btnToggleMobile?.addEventListener('click', () => {
    isAppMode = !isAppMode;
    if (isAppMode) {
      document.body.classList.add('app-mode');
      btnToggleMobile.innerHTML = '💻 Web View';
    } else {
      document.body.classList.remove('app-mode');
      btnToggleMobile.innerHTML = '📱 Mobile View';
    }
  });



  // --- MODAL CONTROLLERS & SUBMISSIONS ---
  const modals = {
    po: document.getElementById('modal-po'),
    product: document.getElementById('modal-product'),
    supplier: document.getElementById('modal-supplier'),
    sale: document.getElementById('modal-sale')
  };

  window.addEventListener('open-modal', (e) => {
    const { modal, prefill } = e.detail;
    if (!modals[modal]) return;

    // Populate dynamic selects
    populateModalSelects();

    if (modal === 'po' && prefill) {
      if (prefill.supplierId) {
        document.getElementById('po-supplier-select').value = prefill.supplierId;
      }
      if (prefill.productId) {
        document.getElementById('po-product-select').value = prefill.productId;
      }
      if (prefill.quantity) {
        document.getElementById('po-qty-input').value = prefill.quantity;
      }
      calculatePoTotal();
    }

    modals[modal].classList.add('open');
  });

  document.querySelectorAll('.btn-close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      Object.values(modals).forEach(m => m.classList.remove('open'));
    });
  });

  function populateModalSelects() {
    const { products, suppliers } = store.data;

    // PO Supplier Select
    const poSupSelect = document.getElementById('po-supplier-select');
    if (poSupSelect) {
      poSupSelect.innerHTML = suppliers.map(s => `<option value="${s.id}">${s.name} (${s.deliveryPerformance})</option>`).join('');
    }

    // PO Product Select
    const poProdSelect = document.getElementById('po-product-select');
    if (poProdSelect) {
      poProdSelect.innerHTML = products.map(p => `<option value="${p.id}">${p.name} (Stock: ${p.stock})</option>`).join('');
    }

    // Add Product Supplier Select
    const addProdSupSelect = document.getElementById('add-prod-sup-select');
    if (addProdSupSelect) {
      addProdSupSelect.innerHTML = suppliers.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    }

    // Sale Product Select
    const saleProdSelect = document.getElementById('sale-product-select');
    if (saleProdSelect) {
      saleProdSelect.innerHTML = products.map(p => `<option value="${p.id}">${p.name} — Available: ${p.stock} units ($${p.sellingPrice})</option>`).join('');
      if (products.length > 0) {
        document.getElementById('sale-price-input').value = products[0].sellingPrice;
      }
    }
  }

  // Calculate PO Total display dynamically
  const poQtyInput = document.getElementById('po-qty-input');
  const poCostInput = document.getElementById('po-cost-input');
  const poTotalDisplay = document.getElementById('po-total-display');

  function calculatePoTotal() {
    const qty = parseFloat(poQtyInput.value) || 0;
    const cost = parseFloat(poCostInput.value) || 0;
    poTotalDisplay.value = `$${(qty * cost).toLocaleString(undefined, {minimumFractionDigits: 2})}`;
  }

  poQtyInput?.addEventListener('input', calculatePoTotal);
  poCostInput?.addEventListener('input', calculatePoTotal);

  document.getElementById('sale-product-select')?.addEventListener('change', (e) => {
    const prod = store.data.products.find(p => p.id === e.target.value);
    if (prod) {
      document.getElementById('sale-price-input').value = prod.sellingPrice;
    }
  });

  // Submit Handlers
  document.getElementById('form-create-po')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const supplierId = document.getElementById('po-supplier-select').value;
    const productId = document.getElementById('po-product-select').value;
    const quantity = document.getElementById('po-qty-input').value;
    const unitCost = document.getElementById('po-cost-input').value;
    const expectedDelivery = document.getElementById('po-date-input').value;

    store.createPurchaseOrder({
      supplierId,
      productId,
      quantity,
      unitCost,
      expectedDelivery
    });

    modals.po.classList.remove('open');
    showNotification('Purchase Order created successfully!');
    store.setActiveScreen('purchaseOrders');
  });

  document.getElementById('form-add-product')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    store.addProduct({
      name: formData.get('name'),
      sku: formData.get('sku'),
      category: formData.get('category'),
      stock: formData.get('stock'),
      reorderPoint: formData.get('reorderPoint'),
      costPrice: formData.get('costPrice'),
      sellingPrice: formData.get('sellingPrice'),
      supplierId: formData.get('supplierId')
    });

    form.reset();
    modals.product.classList.remove('open');
    showNotification('New Product added to inventory catalog!');
    store.setActiveScreen('inventory');
  });

  document.getElementById('form-add-supplier')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    store.addSupplier({
      name: formData.get('name'),
      contactPerson: formData.get('contactPerson'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      avgDeliveryDays: formData.get('avgDeliveryDays'),
      address: formData.get('address')
    });

    form.reset();
    modals.supplier.classList.remove('open');
    showNotification('New Supplier added to network!');
    store.setActiveScreen('suppliers');
  });

  document.getElementById('form-record-sale')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const sale = store.createSale({
        customer: formData.get('customer'),
        productId: formData.get('productId'),
        quantity: formData.get('quantity'),
        unitPrice: formData.get('unitPrice')
      });

      form.reset();
      modals.sale.classList.remove('open');
      showNotification(`Sale recorded successfully! Invoice #${sale.id} issued & stock deducted.`);
      store.setActiveScreen('sales');
    } catch (err) {
      alert(err.message);
    }
  });

  function showNotification(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>⚡ ${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  // Initial render
  renderCurrentScreen();
});
