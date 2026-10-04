import { store } from '../state.js';

export function renderStockMovement(container) {
  const { stockMovements, products } = store.data;

  let activeFilter = 'ALL';

  function renderLedger() {
    let filtered = [...store.data.stockMovements];
    if (activeFilter !== 'ALL') {
      filtered = filtered.filter(m => m.type === activeFilter);
    }

    const tbody = container.querySelector('#movement-table-body');
    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px; color: #64748b;">
            No stock movement transactions recorded for filter "${activeFilter}".
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(m => `
      <tr style="background: ${m.type === 'INWARD' ? 'rgba(16, 185, 129, 0.02)' : 'rgba(99, 102, 241, 0.02)'};">
        <td>
          <span class="badge ${m.type === 'INWARD' ? 'badge-in' : 'badge-purple'}">
            ${m.type === 'INWARD' ? '↓ INWARD (RESTOCK)' : '↑ OUTWARD (SALE)'}
          </span>
        </td>
        <td>
          <div style="font-weight: 700; color: #0f172a;">${m.productName}</div>
          <div style="font-size: 11px; color: #64748b;">${m.id}</div>
        </td>
        <td style="font-weight: 800; font-size: 15px; color: ${m.type === 'INWARD' ? '#10b981' : '#4f46e5'};">
          ${m.quantity > 0 ? '+' + m.quantity : m.quantity} units
        </td>
        <td>
          <div style="font-weight: 700;">${m.stockAfter} units</div>
          <div style="font-size: 10px; color: #64748b;">Stock level after</div>
        </td>
        <td>
          <span class="badge badge-blue" style="font-size: 10px;">${m.reference}</span>
        </td>
        <td>
          <div style="font-size: 12px; font-weight: 600;">${m.user}</div>
          <div style="font-size: 11px; color: #64748b;">${m.reason}</div>
        </td>
        <td style="font-size: 11px; color: #64748b; font-weight: 600;">
          ${m.timestamp}
        </td>
      </tr>
    `).join('');
  }

  const totalInwardUnits = stockMovements.filter(m => m.type === 'INWARD').reduce((a,b) => a + Math.abs(b.quantity), 0);
  const totalOutwardUnits = stockMovements.filter(m => m.type === 'OUTWARD').reduce((a,b) => a + Math.abs(b.quantity), 0);

  container.innerHTML = `
    <div class="page-container">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Stock Movement Audit Ledger (Inward & Outward)
            </div>
            <div class="card-subtitle">Real-time immutable stock intake and customer dispatch tracking</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm filter-mov-btn active" data-filter="ALL">All Movements</button>
            <button class="btn btn-secondary btn-sm filter-mov-btn" data-filter="INWARD">↓ Inward Stock Only</button>
            <button class="btn btn-secondary btn-sm filter-mov-btn" data-filter="OUTWARD">↑ Outward Stock Only</button>
          </div>
        </div>

        <!-- Ledger Summary KPI Bar -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;">
          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; padding: 16px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 11px; font-weight: 800; color: #047857; text-transform: uppercase;">Total Received (Inward)</div>
              <div style="font-size: 22px; font-weight: 800; color: #065f46;">+${totalInwardUnits} Units</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #10b981; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800;">↓</div>
          </div>

          <div style="background: #f3e8ff; border: 1px solid #e9d5ff; padding: 16px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 11px; font-weight: 800; color: #6b21a8; text-transform: uppercase;">Total Sold / Dispatched (Outward)</div>
              <div style="font-size: 22px; font-weight: 800; color: #581c87;">-${totalOutwardUnits} Units</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #8b5cf6; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800;">↑</div>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase;">Net Movement Ledger Count</div>
              <div style="font-size: 22px; font-weight: 800; color: #0f172a;">${stockMovements.length} Transactions</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #475569; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800;">📋</div>
          </div>
        </div>

        <!-- Stock Ledger Table -->
        <div class="table-container">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Product Name & ID</th>
                <th>Quantity</th>
                <th>Post-Stock Level</th>
                <th>Reference Code</th>
                <th>User / Action Reason</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody id="movement-table-body">
              <!-- Rendered dynamically -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('.filter-mov-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.filter-mov-btn').forEach(b => b.classList.remove('btn-primary'));
      container.querySelectorAll('.filter-mov-btn').forEach(b => b.classList.add('btn-secondary'));
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');

      activeFilter = btn.dataset.filter;
      renderLedger();
    });
  });

  renderLedger();
}
