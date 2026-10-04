import { store } from '../state.js';

export function renderInventory(container) {
  const { products, suppliers } = store.data;

  // Local state for category and status filters
  let selectedCategory = 'ALL';
  let selectedStatus = 'ALL';

  function renderTable() {
    let filtered = [...store.data.products];

    // Filter by live input value or stored search query
    const searchInput = container.querySelector('#inventory-search-input');
    const query = (searchInput ? searchInput.value : (store.data.searchQuery || '')).trim().toLowerCase();

    if (query !== '') {
      filtered = filtered.filter(p =>
        (p.name && p.name.toLowerCase().includes(query)) ||
        (p.sku && p.sku.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.supplierName && p.supplierName.toLowerCase().includes(query)) ||
        (p.id && p.id.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedStatus !== 'ALL') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    const tableBody = container.querySelector('#inventory-table-body');
    const countBadge = container.querySelector('#inventory-count');

    if (countBadge) countBadge.textContent = `${filtered.length} Items`;

    if (!tableBody) return;

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 48px 20px; color: #64748b;">
            <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
            <div style="font-size: 15px; font-weight: 700; color: #1e293b;">
              ${query ? `No inventory items found matching "${query}"` : 'No inventory items match the selected filters.'}
            </div>
            <p style="font-size: 13px; color: #64748b; margin-top: 4px;">Try searching by a different product name, SKU, or category.</p>
            <button class="btn btn-secondary btn-sm" id="btn-reset-inventory-search" style="margin-top: 14px;">
              Reset Filters & Search
            </button>
          </td>
        </tr>
      `;

      container.querySelector('#btn-reset-inventory-search')?.addEventListener('click', () => {
        const inp = container.querySelector('#inventory-search-input');
        const clr = container.querySelector('#inventory-search-clear');
        const globalInp = document.getElementById('global-search-input');
        const globalClr = document.getElementById('global-search-clear');

        if (inp) inp.value = '';
        if (clr) clr.style.display = 'none';
        if (globalInp) globalInp.value = '';
        if (globalClr) globalClr.style.display = 'none';

        selectedCategory = 'ALL';
        selectedStatus = 'ALL';
        const catSelect = container.querySelector('#filter-category');
        const statSelect = container.querySelector('#filter-status');
        if (catSelect) catSelect.value = 'ALL';
        if (statSelect) statSelect.value = 'ALL';

        store.setSearchQuery('', true);
        renderTable();
      });
      return;
    }

    tableBody.innerHTML = filtered.map(p => {
      let statusBadge = '';
      if (p.status === 'in') {
        statusBadge = '<span class="badge badge-in"><span class="badge-dot"></span>In Stock</span>';
      } else if (p.status === 'low') {
        statusBadge = '<span class="badge badge-low"><span class="badge-dot"></span>Low Stock</span>';
      } else {
        statusBadge = '<span class="badge badge-out"><span class="badge-dot"></span>Out of Stock</span>';
      }

      const isLow = p.stock <= p.reorderPoint;

      return `
        <tr>
          <td>
            <div class="product-cell">
              <div class="product-img-thumb" style="${p.fastMoving ? 'border: 2px solid #f97316;' : ''}">
                ${p.name.charAt(0)}
              </div>
              <div class="product-name-block">
                <div class="product-title">${p.name}</div>
                <div class="product-meta">${p.sku} ${p.fastMoving ? ' • <span style="color:#c2410c; font-weight:700;">🔥 Fast-Moving</span>' : ''}</div>
              </div>
            </div>
          </td>
          <td><span class="badge badge-purple">${p.category}</span></td>
          <td>
            <div style="font-weight: 800; font-size: 15px; color: ${p.stock === 0 ? '#dc2626' : (isLow ? '#d97706' : '#0f172a')}">
              ${p.stock} units
            </div>
            <div style="font-size: 11px; color: #64748b;">Min: ${p.reorderPoint}</div>
          </td>
          <td>
            <div style="font-weight: 700; color: #6366f1;">${p.predictedReorderQty} units</div>
            <div style="font-size: 10px; color: #10b981; font-weight: 600;">⚡ AI Calculated</div>
          </td>
          <td>
            <div style="font-weight: 600;">$${p.costPrice.toFixed(2)}</div>
            <div style="font-size: 11px; color: #64748b;">Sell: $${p.sellingPrice.toFixed(2)}</div>
          </td>
          <td>
            <div style="font-weight: 600; font-size: 12px;">${p.supplierName}</div>
          </td>
          <td>${statusBadge}</td>
          <td>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-primary btn-sm btn-reorder-now" data-id="${p.id}" data-sup="${p.supplierId}" data-qty="${p.predictedReorderQty}">
                Reorder
              </button>
              <button class="btn btn-secondary btn-sm btn-view-prod-details" data-id="${p.id}">
                Details
              </button>
              <button class="btn btn-danger btn-sm btn-delete-product" data-id="${p.id}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach Row Action Handlers
    container.querySelectorAll('.btn-reorder-now').forEach(btn => {
      btn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('open-modal', {
          detail: { modal: 'po', prefill: { productId: btn.dataset.id, quantity: btn.dataset.qty, supplierId: btn.dataset.sup } }
        }));
      });
    });

    container.querySelectorAll('.btn-view-prod-details').forEach(btn => {
      btn.addEventListener('click', () => {
        showProductDetailsModal(btn.dataset.id);
      });
    });

    container.querySelectorAll('.btn-delete-product').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this product?')) {
          store.deleteProduct(btn.dataset.id);
          renderTable();
        }
      });
    });
  }

  // Render Full Page Layout
  const categories = ['ALL', ...new Set(products.map(p => p.category))];

  container.innerHTML = `
    <div class="page-container">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
              Product & Stock Inventory Management
            </div>
            <div class="card-subtitle">Real-time stock monitoring with automatic reorder point prediction</div>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary" id="btn-add-product-modal">
              + Add New Product
            </button>
          </div>
        </div>

        <!-- Controls Bar -->
        <div class="controls-bar">
          <div class="filter-group">
            <div style="position: relative; width: 280px;">
              <input type="text" id="inventory-search-input" class="input-custom" placeholder="Search SKU, Product, Supplier..." value="${store.data.searchQuery || ''}" style="width: 100%; padding-left: 36px; padding-right: 32px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <button type="button" id="inventory-search-clear" class="search-clear-btn" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); display: ${(store.data.searchQuery || '').trim() ? 'flex' : 'none'};">✕</button>
            </div>

            <select id="filter-category" class="select-custom">
              ${categories.map(c => `<option value="${c}">${c === 'ALL' ? 'All Categories' : c}</option>`).join('')}
            </select>

            <select id="filter-status" class="select-custom">
              <option value="ALL">All Stock Statuses</option>
              <option value="in">In Stock Only</option>
              <option value="low">Low Stock Only</option>
              <option value="out">Out of Stock Only</option>
            </select>
          </div>

          <span class="badge badge-purple" id="inventory-count">${products.length} Items</span>
        </div>

        <!-- Table -->
        <div class="table-container">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Product & SKU</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>AI Predicted Qty</th>
                <th>Cost / Price</th>
                <th>Primary Supplier</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="inventory-table-body">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Product Details Modal Container -->
    <div id="product-details-modal-wrapper"></div>
  `;

  // Filter Listeners
  const searchInput = container.querySelector('#inventory-search-input');
  const clearBtn = container.querySelector('#inventory-search-clear');
  const globalSearchInput = document.getElementById('global-search-input');
  const globalClear = document.getElementById('global-search-clear');

  searchInput.addEventListener('input', () => {
    const val = searchInput.value;
    if (clearBtn) clearBtn.style.display = val.trim() ? 'flex' : 'none';
    store.setSearchQuery(val, true); // Silent update to prevent whole-screen redraw and focus loss!
    
    // Sync with top global search input
    if (globalSearchInput && globalSearchInput.value !== val) {
      globalSearchInput.value = val;
      if (globalClear) globalClear.style.display = val.trim() ? 'flex' : 'none';
    }

    renderTable();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      store.setSearchQuery('', true);
      if (globalSearchInput) {
        globalSearchInput.value = '';
        if (globalClear) globalClear.style.display = 'none';
      }
      renderTable();
      searchInput.focus();
    });
  }

  // Listen for external filter updates (e.g. from global search input)
  const handleExternalSearch = (e) => {
    const newQuery = e.detail?.query !== undefined ? e.detail.query : (store.data.searchQuery || '');
    if (searchInput && searchInput.value !== newQuery) {
      searchInput.value = newQuery;
      if (clearBtn) clearBtn.style.display = newQuery.trim() ? 'flex' : 'none';
      renderTable();
    }
  };
  window.addEventListener('update-inventory-search', handleExternalSearch);

  const filterCategory = container.querySelector('#filter-category');
  filterCategory.addEventListener('change', (e) => {
    selectedCategory = e.target.value;
    renderTable();
  });

  const filterStatus = container.querySelector('#filter-status');
  filterStatus.addEventListener('change', (e) => {
    selectedStatus = e.target.value;
    renderTable();
  });

  const btnAddModal = container.querySelector('#btn-add-product-modal');
  btnAddModal.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-modal', { detail: { modal: 'product' } }));
  });

  renderTable();
}

function showProductDetailsModal(productId) {
  const prod = store.data.products.find(p => p.id === productId);
  if (!prod) return;

  const wrapper = document.getElementById('product-details-modal-wrapper');
  wrapper.innerHTML = `
    <div class="modal-overlay open">
      <div class="modal-card" style="max-width: 550px;">
        <div class="modal-header">
          <div>
            <h3>${prod.name}</h3>
            <span style="font-size: 12px; color: #64748b;">${prod.sku} • Category: ${prod.category}</span>
          </div>
          <button class="btn-close-drawer" id="close-prod-details">✕</button>
        </div>
        <div class="modal-body">
          <div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 8px;">
            <div style="font-size: 13px; font-weight: 800; color: #4f46e5;">⚡ B-Tree Indexed Inventory Diagnostic</div>
            <div style="font-size: 12px; color: #475569; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>Current Stock: <strong>${prod.stock} units</strong></div>
              <div>Safety Reorder Point: <strong>${prod.reorderPoint} units</strong></div>
              <div>Supplier: <strong>${prod.supplierName}</strong></div>
              <div>Velocity Tag: <strong>${prod.fastMoving ? '🔥 Fast-Moving' : 'Standard'}</strong></div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <label style="font-size: 12px; font-weight: 700; color: #0f172a;">AI Predictive Algorithm Breakdown</label>
            <p style="font-size: 12px; color: #64748b; line-height: 1.5;">
              Based on historical 30-day sales demand and supplier lead time (2.1 days), the AI engine calculates optimal reorder quantity as <strong>${prod.predictedReorderQty} units</strong> to prevent stockout while avoiding overstocking holding costs.
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="close-prod-details-btn">Close</button>
          <button class="btn btn-primary" id="btn-reorder-from-details">⚡ Reorder Now (${prod.predictedReorderQty} Qty)</button>
        </div>
      </div>
    </div>
  `;

  const closeFn = () => { wrapper.innerHTML = ''; };
  wrapper.querySelector('#close-prod-details').addEventListener('click', closeFn);
  wrapper.querySelector('#close-prod-details-btn').addEventListener('click', closeFn);
  wrapper.querySelector('#btn-reorder-from-details').addEventListener('click', () => {
    closeFn();
    window.dispatchEvent(new CustomEvent('open-modal', {
      detail: { modal: 'po', prefill: { productId: prod.id, quantity: prod.predictedReorderQty, supplierId: prod.supplierId } }
    }));
  });
}
