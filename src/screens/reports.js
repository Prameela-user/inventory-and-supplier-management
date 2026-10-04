import { store } from '../state.js';
import { renderSalesVsPurchaseChart } from '../charts.js';

export function renderReports(container) {
  const { products, suppliers, sales, purchaseOrders } = store.data;

  const totalInvValue = products.reduce((acc, p) => acc + (p.stock * p.costPrice), 0);
  const fastMovingCount = products.filter(p => p.fastMoving).length;
  const slowMovingCount = products.filter(p => !p.fastMoving).length;

  container.innerHTML = `
    <div class="page-container">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              Executive Reports & Inventory Intelligence
            </div>
            <div class="card-subtitle">Comprehensive stock turnover, revenue vs expense comparison, and AI operational insights</div>
          </div>
          <div style="display: flex; gap: 10px;">
            <select id="reports-date-filter" class="select-custom">
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Year to Date (2026)</option>
            </select>
            <button class="btn btn-primary" id="btn-export-report">
              📥 Export Report (CSV / PDF)
            </button>
          </div>
        </div>

        <!-- AI Executive Insights Grid -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); color: white; padding: 20px; border-radius: 16px; border: 1px solid rgba(99, 102, 241, 0.4);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
              <span style="font-size: 11px; font-weight: 800; background: #6366f1; color: white; padding: 2px 8px; border-radius: 999px;">AI DEMAND INSIGHT</span>
            </div>
            <h4 style="font-size: 15px; font-weight: 800; color: #a5b4fc;">"Laptop Bags (Pro Executive 15") are selling 42% faster than current replenishment speed."</h4>
            <p style="font-size: 12px; color: #cbd5e1; margin-top: 6px; line-height: 1.4;">
              Weekly sales velocity has escalated to 18 units/week. Recommended action: Increase safety reorder point buffer from 30 to 45 units.
            </p>
          </div>

          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); color: white; padding: 20px; border-radius: 16px; border: 1px solid rgba(16, 185, 129, 0.4);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
              <span style="font-size: 11px; font-weight: 800; background: #10b981; color: white; padding: 2px 8px; border-radius: 999px;">AI SUPPLIER INSIGHT</span>
            </div>
            <h4 style="font-size: 15px; font-weight: 800; color: #6ee7b7;">"Supplier 'Global Tech Traders' maintains the shortest avg delivery time (2.1 days)."</h4>
            <p style="font-size: 12px; color: #cbd5e1; margin-top: 6px; line-height: 1.4;">
              Procuring high-demand accessories through Global Tech Traders yields 98.4% on-time delivery rate vs industry benchmark of 91.2%.
            </p>
          </div>
        </div>

        <!-- Sales vs Purchase Chart -->
        <div style="margin-bottom: 28px;">
          <div style="font-size: 15px; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Monthly Sales Revenue vs Purchase Expense Comparison ($ USD)
          </div>
          <div style="height: 280px; position: relative;">
            <canvas id="reports-sales-purchase-chart"></canvas>
          </div>
        </div>

        <!-- Split Grid: Fast/Slow Moving & Inventory Valuation -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <!-- Velocity Breakdown -->
          <div style="background: #f8fafc; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0;">
            <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Fast-Moving vs Slow-Moving SKUs</h4>
            <div style="display: flex; gap: 16px; margin-bottom: 16px;">
              <div style="flex: 1; background: white; padding: 14px; border-radius: 12px; border: 1px solid #cbd5e1;">
                <div style="font-size: 11px; color: #c2410c; font-weight: 700;">🔥 FAST MOVING</div>
                <div style="font-size: 20px; font-weight: 800; color: #0f172a;">${fastMovingCount} Products</div>
              </div>
              <div style="flex: 1; background: white; padding: 14px; border-radius: 12px; border: 1px solid #cbd5e1;">
                <div style="font-size: 11px; color: #475569; font-weight: 700;">🐢 SLOW MOVING</div>
                <div style="font-size: 20px; font-weight: 800; color: #0f172a;">${slowMovingCount} Products</div>
              </div>
            </div>

            <div style="font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 8px;">Top High-Velocity Products:</div>
            <ul style="font-size: 12px; color: #334155; padding-left: 18px; display: flex; flex-direction: column; gap: 4px;">
              ${products.filter(p => p.fastMoving).map(p => `
                <li><strong>${p.name}</strong> — Stock: ${p.stock} units (AI Reorder: ${p.predictedReorderQty})</li>
              `).join('')}
            </ul>
          </div>

          <!-- Total Inventory Valuation Summary -->
          <div style="background: #f8fafc; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0;">
            <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Inventory Holding & Value Metrics</h4>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; justify-content: space-between; font-size: 13px;">
                <span style="color: #64748b;">Total Warehouse Asset Value:</span>
                <span style="font-weight: 800; color: #10b981; font-size: 16px;">$${totalInvValue.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px;">
                <span style="color: #64748b;">Inventory Turnover Ratio:</span>
                <span style="font-weight: 800; color: #4f46e5;">6.4x / year</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px;">
                <span style="color: #64748b;">Avg Holding Period:</span>
                <span style="font-weight: 800; color: #3b82f6;">24.5 Days</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px;">
                <span style="color: #64748b;">B-Tree Index Lookup Speed:</span>
                <span style="font-weight: 800; color: #8b5cf6;">0.42 ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  renderSalesVsPurchaseChart('reports-sales-purchase-chart');

  container.querySelector('#btn-export-report').addEventListener('click', () => {
    // Generate CSV data from products & sales
    const csvRows = [
      ['Product ID', 'Name', 'Category', 'Stock', 'Reorder Point', 'Supplier', 'Cost Price', 'Selling Price'],
      ...products.map(p => [p.id, `"${p.name}"`, p.category, p.stock, p.reorderPoint, `"${p.supplierName}"`, p.costPrice, p.sellingPrice])
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `StockSync_Inventory_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Report CSV file generated and downloaded successfully!');
  });
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
