import { store } from '../state.js';
import { renderSupplierChart } from '../charts.js';

export function renderSuppliers(container) {
  const { suppliers, products, purchaseOrders } = store.data;

  container.innerHTML = `
    <div class="page-container">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Supplier Network & Performance Analytics
            </div>
            <div class="card-subtitle">Track fulfillment lead times, reliability scores, and AI supplier matching</div>
          </div>
          <button class="btn btn-primary" id="btn-add-supplier-modal">
            + Add New Supplier
          </button>
        </div>

        <!-- Supplier KPI & Performance Chart Section -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 24px;">
          <div style="height: 220px; position: relative;">
            <canvas id="supplier-perf-chart"></canvas>
          </div>

          <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: white; padding: 20px; border-radius: 16px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 11px; font-weight: 800; color: #818cf8; text-transform: uppercase;">🏆 AI Supplier Matching Engine</div>
              <div style="font-size: 15px; font-weight: 800; margin-top: 6px;">Global Tech Traders</div>
              <p style="font-size: 12px; color: #cbd5e1; margin-top: 6px; line-height: 1.4;">
                Ranked #1 for high-velocity electronics with 98.4% SLA compliance and fastest delivery speed (2.1 days average).
              </p>
            </div>
            <button class="btn btn-primary btn-sm" id="btn-po-preferred-sup" style="background: #6366f1; border: none; width: 100%;">
              Create PO with Preferred Supplier →
            </button>
          </div>
        </div>

        <!-- Suppliers Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
          ${suppliers.map(sup => {
            const supOrders = purchaseOrders.filter(po => po.supplierId === sup.id);
            const supProducts = products.filter(p => p.supplierId === sup.id);

            return `
              <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; border-left: 4px solid ${sup.reliabilityScore >= 95 ? '#10b981' : (sup.reliabilityScore >= 90 ? '#3b82f6' : '#f59e0b')};">
                <div>
                  <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px;">
                    <div>
                      <h4 style="font-size: 16px; font-weight: 800; color: #0f172a;">${sup.name}</h4>
                      <span style="font-size: 11px; color: #64748b;">${sup.id} • ${sup.contactPerson}</span>
                    </div>
                    <span class="badge ${sup.status === 'Preferred' ? 'badge-in' : (sup.status === 'Active' ? 'badge-blue' : 'badge-low')}">
                      ${sup.status}
                    </span>
                  </div>

                  <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #475569; margin-bottom: 16px;">
                    <div>📧 <strong>Email:</strong> ${sup.email}</div>
                    <div>📞 <strong>Phone:</strong> ${sup.phone}</div>
                    <div>📍 <strong>Address:</strong> ${sup.address}</div>
                    <div>📦 <strong>Supplied Items:</strong> ${sup.productsSupplied.join(', ')}</div>
                  </div>

                  <div style="background: #f8fafc; padding: 12px; border-radius: 12px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; text-align: center;">
                    <div>
                      <div style="font-size: 10px; color: #64748b; font-weight: 700;">RELIABILITY</div>
                      <div style="font-size: 15px; font-weight: 800; color: #10b981;">${sup.reliabilityScore}%</div>
                    </div>
                    <div>
                      <div style="font-size: 10px; color: #64748b; font-weight: 700;">AVG LEAD TIME</div>
                      <div style="font-size: 15px; font-weight: 800; color: #3b82f6;">${sup.avgDeliveryDays} Days</div>
                    </div>
                    <div>
                      <div style="font-size: 10px; color: #64748b; font-weight: 700;">TOTAL POS</div>
                      <div style="font-size: 15px; font-weight: 800; color: #4f46e5;">${supOrders.length + sup.totalOrders}</div>
                    </div>
                  </div>
                </div>

                <div style="display: flex; gap: 8px; margin-top: 16px;">
                  <button class="btn btn-primary btn-sm btn-create-po-sup" data-supid="${sup.id}" style="flex: 1;">
                    + New PO
                  </button>
                  <button class="btn btn-secondary btn-sm btn-sup-details" data-supid="${sup.id}">
                    History
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <div id="supplier-details-wrapper"></div>
  `;

  // Render chart
  renderSupplierChart('supplier-perf-chart', suppliers);

  // Handlers
  container.querySelector('#btn-add-supplier-modal').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-modal', { detail: { modal: 'supplier' } }));
  });

  const preferredBtn = container.querySelector('#btn-po-preferred-sup');
  if (preferredBtn) {
    preferredBtn.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('open-modal', { detail: { modal: 'po', prefill: { supplierId: 'SUP-001' } } }));
    });
  }

  container.querySelectorAll('.btn-create-po-sup').forEach(btn => {
    btn.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('open-modal', {
        detail: { modal: 'po', prefill: { supplierId: btn.dataset.supid } }
      }));
    });
  });

  container.querySelectorAll('.btn-sup-details').forEach(btn => {
    btn.addEventListener('click', () => {
      showSupplierHistoryModal(btn.dataset.supid);
    });
  });
}

function showSupplierHistoryModal(supplierId) {
  const sup = store.data.suppliers.find(s => s.id === supplierId);
  const pos = store.data.purchaseOrders.filter(po => po.supplierId === supplierId);

  const wrapper = document.getElementById('supplier-details-wrapper');
  wrapper.innerHTML = `
    <div class="modal-overlay open">
      <div class="modal-card" style="max-width: 650px;">
        <div class="modal-header">
          <div>
            <h3>${sup.name} - Fulfillment History</h3>
            <span style="font-size: 12px; color: #64748b;">${sup.id} • ${sup.contactPerson}</span>
          </div>
          <button class="btn-close-drawer" id="close-sup-hist">✕</button>
        </div>
        <div class="modal-body">
          <div class="table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>PO Ref</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${pos.length > 0 ? pos.map(po => `
                  <tr>
                    <td style="font-weight: 700;">${po.id}</td>
                    <td>${po.productName}</td>
                    <td>${po.quantity}</td>
                    <td style="font-weight: 700;">$${po.totalAmount.toLocaleString()}</td>
                    <td style="font-size: 11px;">${po.orderDate}</td>
                    <td><span class="badge ${po.status === 'Received' ? 'badge-in' : 'badge-low'}">${po.status}</span></td>
                  </tr>
                `).join('') : '<tr><td colspan="6" style="text-align:center;">No recent purchase orders logged for this supplier.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="close-sup-hist-btn">Close</button>
        </div>
      </div>
    </div>
  `;

  const closeFn = () => { wrapper.innerHTML = ''; };
  wrapper.querySelector('#close-sup-hist').addEventListener('click', closeFn);
  wrapper.querySelector('#close-sup-hist-btn').addEventListener('click', closeFn);
}
