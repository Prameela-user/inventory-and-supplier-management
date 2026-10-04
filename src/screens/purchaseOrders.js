import { store } from '../state.js';

export function renderPurchaseOrders(container) {
  const { purchaseOrders, suppliers, products } = store.data;

  let activeTab = 'ALL';

  function renderTable() {
    let filtered = [...store.data.purchaseOrders];
    if (activeTab !== 'ALL') {
      filtered = filtered.filter(po => po.status === activeTab);
    }

    const tbody = container.querySelector('#po-table-body');
    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 40px; color: #64748b;">
            No purchase orders found for filter status "${activeTab}".
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(po => {
      let statusBadge = '';
      if (po.status === 'Received') statusBadge = '<span class="badge badge-in"><span class="badge-dot"></span>Received</span>';
      else if (po.status === 'In Transit') statusBadge = '<span class="badge badge-purple"><span class="badge-dot"></span>In Transit</span>';
      else if (po.status === 'Pending') statusBadge = '<span class="badge badge-low"><span class="badge-dot"></span>Pending</span>';
      else if (po.status === 'Processing') statusBadge = '<span class="badge badge-blue"><span class="badge-dot"></span>Processing</span>';
      else statusBadge = '<span class="badge badge-out"><span class="badge-dot"></span>Cancelled</span>';

      return `
        <tr>
          <td>
            <div style="font-weight: 800; color: #4f46e5;">${po.id}</div>
            <div style="font-size: 11px; color: #64748b;">Issued: ${po.orderDate}</div>
          </td>
          <td>
            <div style="font-weight: 700;">${po.supplierName}</div>
          </td>
          <td>
            <div style="font-weight: 700;">${po.productName}</div>
            <div style="font-size: 11px; color: #64748b;">${po.quantity} units @ $${po.unitCost}/unit</div>
          </td>
          <td style="font-weight: 800; font-size: 14px; color: #0f172a;">
            $${po.totalAmount.toLocaleString()}
          </td>
          <td>
            <div style="font-size: 12px; font-weight: 600;">${po.expectedDelivery}</div>
          </td>
          <td>${statusBadge}</td>
          <td>
            <div style="display: flex; gap: 6px;">
              ${po.status !== 'Received' && po.status !== 'Cancelled' ? `
                <button class="btn btn-success btn-sm btn-receive-po" data-poid="${po.id}">
                  ✓ Receive Stock
                </button>
              ` : ''}
              <button class="btn btn-secondary btn-sm btn-track-po" data-poid="${po.id}">
                Track
              </button>
              ${po.status !== 'Received' && po.status !== 'Cancelled' ? `
                <button class="btn btn-danger btn-sm btn-cancel-po" data-poid="${po.id}">
                  ✕
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach actions
    container.querySelectorAll('.btn-receive-po').forEach(btn => {
      btn.addEventListener('click', () => {
        const poId = btn.dataset.poid;
        if (confirm(`Receive stock for Purchase Order ${poId}? This will automatically increase inventory stock levels and log an INWARD movement.`)) {
          store.receivePurchaseOrder(poId);
          renderTable();
          showNotification(`Stock received successfully for ${poId}! Inventory updated.`);
        }
      });
    });

    container.querySelectorAll('.btn-track-po').forEach(btn => {
      btn.addEventListener('click', () => {
        showTrackShipmentModal(btn.dataset.poid);
      });
    });

    container.querySelectorAll('.btn-cancel-po').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Cancel this purchase order?')) {
          store.cancelPurchaseOrder(btn.dataset.poid);
          renderTable();
        }
      });
    });
  }

  container.innerHTML = `
    <div class="page-container">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Purchase Orders & Stock Procurement
            </div>
            <div class="card-subtitle">Manage supplier replenishment purchase orders and stock receiving workflow</div>
          </div>
          <button class="btn btn-primary" id="btn-create-po-page">
            + Create Purchase Order
          </button>
        </div>

        <!-- KPI Row -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
          <div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="font-size: 11px; color: #64748b; font-weight: 700;">OPEN ORDERS</div>
            <div style="font-size: 22px; font-weight: 800; color: #4f46e5;">${purchaseOrders.filter(po => po.status !== 'Received' && po.status !== 'Cancelled').length}</div>
          </div>
          <div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="font-size: 11px; color: #64748b; font-weight: 700;">TOTAL COMMITMENT VALUE</div>
            <div style="font-size: 22px; font-weight: 800; color: #0f172a;">$${purchaseOrders.reduce((a,b)=>a+b.totalAmount,0).toLocaleString()}</div>
          </div>
          <div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="font-size: 11px; color: #64748b; font-weight: 700;">IN TRANSIT</div>
            <div style="font-size: 22px; font-weight: 800; color: #8b5cf6;">${purchaseOrders.filter(po => po.status === 'In Transit').length}</div>
          </div>
          <div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="font-size: 11px; color: #64748b; font-weight: 700;">FULFILLED POs</div>
            <div style="font-size: 22px; font-weight: 800; color: #10b981;">${purchaseOrders.filter(po => po.status === 'Received').length}</div>
          </div>
        </div>

        <!-- Filter Status Tabs -->
        <div style="display: flex; gap: 8px; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">
          ${['ALL', 'Pending', 'In Transit', 'Processing', 'Received', 'Cancelled'].map(t => `
            <button class="btn btn-secondary btn-sm tab-po-filter ${t === 'ALL' ? 'active' : ''}" data-tab="${t}">
              ${t}
            </button>
          `).join('')}
        </div>

        <!-- Table -->
        <div class="table-container">
          <table class="custom-table">
            <thead>
              <tr>
                <th>PO Ref & Date</th>
                <th>Supplier Name</th>
                <th>Product & Qty</th>
                <th>Total Value</th>
                <th>Expected Delivery</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="po-table-body">
              <!-- Dynamically rendered -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="po-track-wrapper"></div>
  `;

  // Filter listener
  container.querySelectorAll('.tab-po-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tab-po-filter').forEach(b => b.classList.remove('btn-primary'));
      container.querySelectorAll('.tab-po-filter').forEach(b => b.classList.add('btn-secondary'));
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');

      activeTab = btn.dataset.tab;
      renderTable();
    });
  });

  container.querySelector('#btn-create-po-page').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-modal', { detail: { modal: 'po' } }));
  });

  renderTable();
}

function showTrackShipmentModal(poId) {
  const po = store.data.purchaseOrders.find(p => p.id === poId);
  if (!po) return;

  const wrapper = document.getElementById('po-track-wrapper');
  wrapper.innerHTML = `
    <div class="modal-overlay open">
      <div class="modal-card" style="max-width: 500px;">
        <div class="modal-header">
          <div>
            <h3>Track Order #${po.id}</h3>
            <span style="font-size: 12px; color: #64748b;">Supplier: ${po.supplierName}</span>
          </div>
          <button class="btn-close-drawer" id="close-track-modal">✕</button>
        </div>
        <div class="modal-body">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #10b981;"></div>
              <div>
                <div style="font-size: 13px; font-weight: 700;">Purchase Order Transmitted</div>
                <div style="font-size: 11px; color: #64748b;">Order created on ${po.orderDate}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: ${po.status === 'Pending' ? '#cbd5e1' : '#10b981'};"></div>
              <div>
                <div style="font-size: 13px; font-weight: 700;">Supplier Processing & Assembly</div>
                <div style="font-size: 11px; color: #64748b;">Verified by ${po.supplierName}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: ${po.status === 'In Transit' || po.status === 'Received' ? '#10b981' : '#cbd5e1'};"></div>
              <div>
                <div style="font-size: 13px; font-weight: 700;">In Transit / Dispatch</div>
                <div style="font-size: 11px; color: #64748b;">Logistics Partner Freight ID #TRK-9982</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: ${po.status === 'Received' ? '#10b981' : '#cbd5e1'};"></div>
              <div>
                <div style="font-size: 13px; font-weight: 700;">Warehouse Intake & Stock Verification</div>
                <div style="font-size: 11px; color: #64748b;">Expected on ${po.expectedDelivery}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="close-track-btn">Close</button>
        </div>
      </div>
    </div>
  `;

  const closeFn = () => { wrapper.innerHTML = ''; };
  wrapper.querySelector('#close-track-modal').addEventListener('click', closeFn);
  wrapper.querySelector('#close-track-btn').addEventListener('click', closeFn);
}

function showNotification(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>⚡ ${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}
