import { store } from '../state.js';
import { renderStockDonutChart, renderStockTrendChart } from '../charts.js';

export function renderDashboard(container) {
  const { products, suppliers, purchaseOrders, sales, stockMovements, aiInsights } = store.data;

  // Compute KPI values dynamically from reactive store state
  const totalProducts = products.length;
  const totalStockVal = products.reduce((acc, p) => acc + (p.stock * p.costPrice), 0);
  const totalSuppliers = suppliers.length;
  const pendingPos = purchaseOrders.filter(po => po.status === 'Pending' || po.status === 'In Transit' || po.status === 'Processing').length;
  const lowStockCount = products.filter(p => p.status === 'low' || p.status === 'out').length;

  const urgentAlerts = products.filter(p => p.stock <= p.reorderPoint);

  container.innerHTML = `
    <div class="page-container">
      <!-- AI Alert Announcement Banner -->
      ${urgentAlerts.length > 0 ? `
        <div class="card" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: white; border: 1px solid rgba(99, 102, 241, 0.4);">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(244, 63, 94, 0.2); border: 1px solid #f43f5e; color: #fb7185; display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <div>
                <div style="font-size: 15px; font-weight: 800;">⚡ AI Reorder Alert: ${urgentAlerts.length} Products Require Immediate Action</div>
                <div style="font-size: 12px; color: #a5b4fc; margin-top: 2px;">
                  ${urgentAlerts.map(p => `<strong>${p.name}</strong> (${p.stock} units left)`).join(' • ')}
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 10px;">
              <button class="btn btn-primary btn-sm" id="btn-quick-po-dash" style="background: #6366f1; border: none;">
                ⚡ Generate Auto-PO Draft
              </button>
              <button class="btn btn-secondary btn-sm" id="btn-open-ai-dash" style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2);">
                View AI Insights
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Top KPI Metric Grid -->
      <div class="kpi-grid">
        <div class="kpi-card" style="--card-accent: #6366f1; --icon-bg: #e0e7ff; --icon-color: #4f46e5;">
          <div class="kpi-info">
            <h4>Total Products</h4>
            <div class="kpi-value">${totalProducts}</div>
            <div class="kpi-subtext positive">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              $${totalStockVal.toLocaleString()} Inventory Valuation
            </div>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
          </div>
        </div>

        <div class="kpi-card" style="--card-accent: #3b82f6; --icon-bg: #dbeafe; --icon-color: #1d4ed8;">
          <div class="kpi-info">
            <h4>Total Suppliers</h4>
            <div class="kpi-value">${totalSuppliers}</div>
            <div class="kpi-subtext positive">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              96.8% Avg Reliability Score
            </div>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </div>

        <div class="kpi-card" style="--card-accent: #f59e0b; --icon-bg: #fef3c7; --icon-color: #b45309;">
          <div class="kpi-info">
            <h4>Pending Purchase Orders</h4>
            <div class="kpi-value">${pendingPos}</div>
            <div class="kpi-subtext warning">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              2 In Transit for Oct 02
            </div>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
        </div>

        <div class="kpi-card" style="--card-accent: #f43f5e; --icon-bg: #fee2e2; --icon-color: #b91c1c;">
          <div class="kpi-info">
            <h4>Low / Out of Stock</h4>
            <div class="kpi-value">${lowStockCount}</div>
            <div class="kpi-subtext negative">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>
              Requires Reordering Today
            </div>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
        </div>
      </div>

      <!-- Charts Section (Donut & Trend Line) -->
      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px;">
        <!-- Donut Overview -->
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
                Stock Health Distribution
              </div>
              <div class="card-subtitle">Real-time status breakdown</div>
            </div>
          </div>
          <div style="height: 240px; position: relative;">
            <canvas id="dash-donut-chart"></canvas>
          </div>
        </div>

        <!-- Line Trend Chart -->
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                Stock Trend & Predictive Forecast
              </div>
              <div class="card-subtitle">Historical inventory velocity vs AI recommendation outcome</div>
            </div>
            <button class="btn btn-primary btn-sm" id="btn-open-po-modal-dash">
              + Create Purchase Order
            </button>
          </div>
          <div style="height: 240px; position: relative;">
            <canvas id="dash-trend-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- Bottom Split: Recent Activity & AI Predictions -->
      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 24px;">
        <!-- Recent Stock Activity -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><polyline points="12 8 12 12 14 14"/><circle cx="12" cy="12" r="10"/></svg>
              Recent Stock Movement & Transactions
            </div>
            <a href="#" id="link-goto-movement" style="font-size: 12px; font-weight: 700; color: #4f46e5; text-decoration: none;">View All Ledger →</a>
          </div>
          <div class="table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Stock Level</th>
                  <th>Ref</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                ${stockMovements.slice(0, 5).map(m => `
                  <tr>
                    <td>
                      <span class="badge ${m.type === 'INWARD' ? 'badge-in' : 'badge-purple'}">
                        ${m.type === 'INWARD' ? '↓ INWARD' : '↑ OUTWARD'}
                      </span>
                    </td>
                    <td>
                      <div style="font-weight: 700;">${m.productName}</div>
                    </td>
                    <td style="font-weight: 800; color: ${m.type === 'INWARD' ? '#10b981' : '#4f46e5'}">
                      ${m.quantity > 0 ? '+' + m.quantity : m.quantity}
                    </td>
                    <td style="font-weight: 600;">${m.stockAfter} units</td>
                    <td style="font-size: 11px; color: #64748b;">${m.reference}</td>
                    <td style="font-size: 11px; color: #64748b;">${m.timestamp.split(' ')[1] || m.timestamp}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- AI Recommendations Card -->
        <div class="card" style="background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%); border: 1px solid #cbd5e1;">
          <div class="card-header">
            <div class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              AI Reorder Recommendations
            </div>
            <span class="badge badge-purple">AI Active</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${aiInsights.slice(0, 3).map(insight => `
              <div style="padding: 12px 14px; border-radius: 12px; background: white; border: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 6px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-size: 12px; font-weight: 800; color: #0f172a;">${insight.title}</span>
                  <span class="badge ${insight.priority === 'critical' ? 'badge-out' : 'badge-low'}">${insight.priority}</span>
                </div>
                <p style="font-size: 12px; color: #475569; line-height: 1.4;">${insight.message}</p>
                <div style="display: flex; justify-content: flex-end; margin-top: 4px;">
                  <button class="btn btn-primary btn-sm btn-reorder-ai-action" data-prodid="${insight.productId || ''}" data-qty="${insight.recommendedQty}" data-supid="${insight.recommendedSupplierId}">
                    ${insight.actionLabel} →
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Render Charts
  renderStockDonutChart('dash-donut-chart', products);
  renderStockTrendChart('dash-trend-chart');

  // Event Listeners
  const btnQuickPo = container.querySelector('#btn-quick-po-dash');
  if (btnQuickPo) {
    btnQuickPo.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('open-modal', { detail: { modal: 'po' } }));
    });
  }

  const btnOpenPoModal = container.querySelector('#btn-open-po-modal-dash');
  if (btnOpenPoModal) {
    btnOpenPoModal.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('open-modal', { detail: { modal: 'po' } }));
    });
  }

  const btnOpenAi = container.querySelector('#btn-open-ai-dash');
  if (btnOpenAi) {
    btnOpenAi.addEventListener('click', () => {
      store.toggleAiDrawer(true);
    });
  }

  const linkGotoMov = container.querySelector('#link-goto-movement');
  if (linkGotoMov) {
    linkGotoMov.addEventListener('click', (e) => {
      e.preventDefault();
      store.setActiveScreen('stockMovement');
    });
  }

  const aiActionBtns = container.querySelectorAll('.btn-reorder-ai-action');
  aiActionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prodId = btn.dataset.prodid;
      const qty = btn.dataset.qty;
      const supId = btn.dataset.supid;
      window.dispatchEvent(new CustomEvent('open-modal', {
        detail: { modal: 'po', prefill: { productId: prodId, quantity: qty, supplierId: supId } }
      }));
    });
  });
}
