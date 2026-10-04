import { store } from '../state.js';

export function renderSales(container) {
  const { sales, products } = store.data;

  // Compute metrics dynamically
  const totalSalesRevenue = sales.reduce((acc, s) => acc + s.amount, 0);
  const invoiceCount = sales.length;
  const avgOrderVal = invoiceCount > 0 ? (totalSalesRevenue / invoiceCount) : 0;
  const pendingInvoices = sales.filter(s => s.status === 'Pending').length;

  container.innerHTML = `
    <div class="page-container">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Sales Invoices & Revenue Terminal
            </div>
            <div class="card-subtitle">Complete sales transactions with real-time automated stock deduction</div>
          </div>
          <button class="btn btn-success" id="btn-open-sale-modal-page">
            + Record New Sale
          </button>
        </div>

        <!-- Sales KPI Cards -->
        <div class="kpi-grid" style="margin-bottom: 24px;">
          <div class="kpi-card" style="--card-accent: #10b981; --icon-bg: #d1fae5; --icon-color: #047857;">
            <div class="kpi-info">
              <h4>Total Revenue</h4>
              <div class="kpi-value">$${totalSalesRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <div class="kpi-subtext positive">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                +18.4% vs last month
              </div>
            </div>
            <div class="kpi-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
          </div>

          <div class="kpi-card" style="--card-accent: #4f46e5; --icon-bg: #e0e7ff; --icon-color: #4338ca;">
            <div class="kpi-info">
              <h4>Total Invoices</h4>
              <div class="kpi-value">${invoiceCount}</div>
              <div class="kpi-subtext positive">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Completed & Verified
              </div>
            </div>
            <div class="kpi-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
          </div>

          <div class="kpi-card" style="--card-accent: #3b82f6; --icon-bg: #dbeafe; --icon-color: #1d4ed8;">
            <div class="kpi-info">
              <h4>Average Order Value</h4>
              <div class="kpi-value">$${avgOrderVal.toFixed(2)}</div>
              <div class="kpi-subtext positive">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                High-margin tech mix
              </div>
            </div>
            <div class="kpi-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M8 12h8"/><path d="M6 16h12"/></svg>
            </div>
          </div>

          <div class="kpi-card" style="--card-accent: #f59e0b; --icon-bg: #fef3c7; --icon-color: #b45309;">
            <div class="kpi-info">
              <h4>Pending Invoices</h4>
              <div class="kpi-value">${pendingInvoices}</div>
              <div class="kpi-subtext warning">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Awaiting B2B clearance
              </div>
            </div>
            <div class="kpi-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
          </div>
        </div>

        <!-- Sales Table -->
        <div class="table-container">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Invoice # & Date</th>
                <th>Customer / Channel</th>
                <th>Product Sold</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${sales.map(s => `
                <tr>
                  <td>
                    <div style="font-weight: 800; color: #10b981;">${s.id}</div>
                    <div style="font-size: 11px; color: #64748b;">${s.date}</div>
                  </td>
                  <td>
                    <div style="font-weight: 700;">${s.customer}</div>
                  </td>
                  <td>
                    <div style="font-weight: 700;">${s.productName}</div>
                  </td>
                  <td style="font-weight: 800; color: #4f46e5;">
                    ${s.quantity} units
                  </td>
                  <td style="font-weight: 800; font-size: 14px; color: #0f172a;">
                    $${s.amount.toFixed(2)}
                  </td>
                  <td>
                    <span class="badge ${s.status === 'Paid' ? 'badge-in' : 'badge-low'}">
                      <span class="badge-dot"></span>${s.status}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-sm btn-view-invoice" data-invid="${s.id}">
                      View Receipt
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="invoice-modal-wrapper"></div>
  `;

  // Attach Action Handlers
  container.querySelector('#btn-open-sale-modal-page').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-modal', { detail: { modal: 'sale' } }));
  });

  container.querySelectorAll('.btn-view-invoice').forEach(btn => {
    btn.addEventListener('click', () => {
      showInvoiceModal(btn.dataset.invid);
    });
  });
}

function showInvoiceModal(invId) {
  const sale = store.data.sales.find(s => s.id === invId);
  if (!sale) return;

  const wrapper = document.getElementById('invoice-modal-wrapper');
  wrapper.innerHTML = `
    <div class="modal-overlay open">
      <div class="modal-card" style="max-width: 480px;">
        <div class="modal-header">
          <div>
            <h3>Receipt #${sale.id}</h3>
            <span style="font-size: 12px; color: #64748b;">Date: ${sale.date}</span>
          </div>
          <button class="btn-close-drawer" id="close-inv-modal">✕</button>
        </div>
        <div class="modal-body">
          <div style="border-bottom: 2px dashed #cbd5e1; padding-bottom: 16px; display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b; font-size: 12px;">Customer:</span>
              <span style="font-weight: 700;">${sale.customer}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b; font-size: 12px;">Payment Status:</span>
              <span class="badge badge-in">${sale.status}</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">
            <div style="display: flex; justify-content: space-between; font-weight: 700;">
              <span>${sale.productName} (x${sale.quantity})</span>
              <span>$${sale.amount.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: #64748b;">
              <span>Unit Price:</span>
              <span>$${sale.unitPrice.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: #64748b;">
              <span>Tax (Included):</span>
              <span>$0.00</span>
            </div>
          </div>

          <div style="background: #f8fafc; padding: 14px; border-radius: 12px; margin-top: 16px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 800; font-size: 15px;">Total Paid:</span>
            <span style="font-weight: 800; font-size: 20px; color: #10b981;">$${sale.amount.toFixed(2)}</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="close-inv-btn">Close</button>
          <button class="btn btn-primary" onclick="window.print()">Print Receipt 🖨️</button>
        </div>
      </div>
    </div>
  `;

  const closeFn = () => { wrapper.innerHTML = ''; };
  wrapper.querySelector('#close-inv-modal').addEventListener('click', closeFn);
  wrapper.querySelector('#close-inv-btn').addEventListener('click', closeFn);
}
