import { store } from '../state.js';

export function renderSettings(container) {
  const { settings } = store.data;

  container.innerHTML = `
    <div class="page-container">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              StockSync System Settings & Preferences
            </div>
            <div class="card-subtitle">Manage company profile, AI automation triggers, user roles, and system backups</div>
          </div>
          <button class="btn btn-primary" id="btn-save-settings">
            💾 Save Settings
          </button>
        </div>

        <!-- Settings Section Tabs -->
        <div style="display: flex; gap: 12px; margin-bottom: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; overflow-x: auto;">
          <button class="btn btn-primary btn-sm settings-nav-btn active" data-sec="business">Business Info</button>
          <button class="btn btn-secondary btn-sm settings-nav-btn" data-sec="automation">AI & Reorder Automation</button>
          <button class="btn btn-secondary btn-sm settings-nav-btn" data-sec="users">Users & Roles</button>
          <button class="btn btn-secondary btn-sm settings-nav-btn" data-sec="integrations">Integrations</button>
          <button class="btn btn-secondary btn-sm settings-nav-btn" data-sec="backup">Data Backup & Restore</button>
          <button class="btn btn-secondary btn-sm settings-nav-btn" data-sec="security">Security & Password</button>
        </div>

        <!-- Form Fields -->
        <form id="settings-form" style="display: flex; flex-direction: column; gap: 20px;">
          <!-- 1. Business Info -->
          <div class="settings-sec-content" id="sec-business">
            <h4 style="font-size: 15px; font-weight: 800; margin-bottom: 16px;">Organization & Warehouse Profile</h4>
            <div class="form-grid">
              <div class="form-group">
                <label>Company / Chain Name</label>
                <input type="text" name="businessName" class="input-custom" value="${settings.businessName}">
              </div>

              <div class="form-group">
                <label>Tax & Business Registration ID</label>
                <input type="text" name="taxId" class="input-custom" value="${settings.taxId}">
              </div>

              <div class="form-group">
                <label>Operating Currency</label>
                <select name="currency" class="select-custom">
                  <option value="USD ($)" selected>USD ($) - US Dollar</option>
                  <option value="EUR (€)">EUR (€) - Euro</option>
                  <option value="GBP (£)">GBP (£) - British Pound</option>
                </select>
              </div>

              <div class="form-group">
                <label>Primary Distribution Hub / Warehouse</label>
                <input type="text" name="warehouseLocation" class="input-custom" value="${settings.warehouseLocation}">
              </div>
            </div>
          </div>

          <!-- 2. AI & Automation -->
          <div class="settings-sec-content" id="sec-automation" style="display: none;">
            <h4 style="font-size: 15px; font-weight: 800; margin-bottom: 16px;">AI Reorder Algorithm Parameters</h4>
            <div class="form-grid">
              <div class="form-group">
                <label>Safety Stock Multiplier Buffer</label>
                <select name="safetyStockMultiplier" class="select-custom">
                  <option value="1.2x">1.2x (Lean Inventory)</option>
                  <option value="1.5x (Optimal)" selected>1.5x (Recommended Balanced)</option>
                  <option value="2.0x">2.0x (High Buffer Protection)</option>
                </select>
              </div>

              <div class="form-group">
                <label>Global Default Reorder Point Threshold</label>
                <input type="number" name="lowStockThresholdGlobal" class="input-custom" value="${settings.lowStockThresholdGlobal}">
              </div>

              <div class="form-group full" style="display: flex; align-items: center; gap: 12px; margin-top: 10px;">
                <input type="checkbox" id="autoPoDraft" name="autoPoDraft" ${settings.autoPoDraft ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: #4f46e5;">
                <label for="autoPoDraft" style="font-size: 13px; font-weight: 700; cursor: pointer;">Automatically generate PO draft when product stock drops below reorder point</label>
              </div>

              <div class="form-group full" style="display: flex; align-items: center; gap: 12px;">
                <input type="checkbox" id="btreeIndexing" name="btreeIndexing" ${settings.btreeIndexing ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: #4f46e5;">
                <label for="btreeIndexing" style="font-size: 13px; font-weight: 700; cursor: pointer;">Enable B-Tree Indexing in DBMS memory for ultra-fast stock query speeds (<1ms)</label>
              </div>
            </div>
          </div>

          <!-- 3. Users & Roles -->
          <div class="settings-sec-content" id="sec-users" style="display: none;">
            <h4 style="font-size: 15px; font-weight: 800; margin-bottom: 16px;">User Team Members & Access Control</h4>
            <div class="table-container">
              <table class="custom-table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="font-weight: 700;">Alex Morgan (You)</td>
                    <td>alex@stocksync.io</td>
                    <td><span class="badge badge-purple">System Admin</span></td>
                    <td><span class="badge badge-in">Active</span></td>
                  </tr>
                  <tr>
                    <td style="font-weight: 700;">Sarah Miller</td>
                    <td>sarah.m@stocksync.io</td>
                    <td><span class="badge badge-blue">Purchasing Lead</span></td>
                    <td><span class="badge badge-in">Active</span></td>
                  </tr>
                  <tr>
                    <td style="font-weight: 700;">David Ross</td>
                    <td>david.r@stocksync.io</td>
                    <td><span class="badge badge-low">Warehouse Manager</span></td>
                    <td><span class="badge badge-in">Active</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 4. Integrations -->
          <div class="settings-sec-content" id="sec-integrations" style="display: none;">
            <h4 style="font-size: 15px; font-weight: 800; margin-bottom: 16px;">Connected Ecosystem Integrations</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div style="padding: 16px; border: 1px solid #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-weight: 800;">Shopify POS & Storefront</div>
                  <div style="font-size: 11px; color: #64748b;">Auto-sync online sales into stock ledger</div>
                </div>
                <span class="badge badge-in">Connected ✓</span>
              </div>

              <div style="padding: 16px; border: 1px solid #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-weight: 800;">SAP ERP System</div>
                  <div style="font-size: 11px; color: #64748b;">Enterprise General Ledger Sync</div>
                </div>
                <span class="badge badge-in">Connected ✓</span>
              </div>

              <div style="padding: 16px; border: 1px solid #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-weight: 800;">QuickBooks Accounting</div>
                  <div style="font-size: 11px; color: #64748b;">Automated invoice export</div>
                </div>
                <button class="btn btn-secondary btn-sm">Connect</button>
              </div>

              <div style="padding: 16px; border: 1px solid #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-weight: 800;">Slack & Teams Notifications</div>
                  <div style="font-size: 11px; color: #64748b;">Instant low-stock channel alerts</div>
                </div>
                <span class="badge badge-in">Connected ✓</span>
              </div>
            </div>
          </div>

          <!-- 5. Backup -->
          <div class="settings-sec-content" id="sec-backup" style="display: none;">
            <h4 style="font-size: 15px; font-weight: 800; margin-bottom: 16px;">Database Backup & State Restore</h4>
            <div style="display: flex; gap: 12px;">
              <button class="btn btn-primary" type="button" id="btn-export-backup">
                📥 Backup System State (JSON)
              </button>
              <button class="btn btn-danger" type="button" id="btn-reset-factory">
                ⚠️ Reset All Data to Initial Seed State
              </button>
            </div>
          </div>

          <!-- 6. Security -->
          <div class="settings-sec-content" id="sec-security" style="display: none;">
            <h4 style="font-size: 15px; font-weight: 800; margin-bottom: 16px;">Security Credentials</h4>
            <div class="form-grid">
              <div class="form-group">
                <label>Current Password</label>
                <input type="password" class="input-custom" value="••••••••••••">
              </div>
              <div class="form-group">
                <label>New Password</label>
                <input type="password" class="input-custom" placeholder="Enter new strong password">
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  // Navigation tab switcher
  const navBtns = container.querySelectorAll('.settings-nav-btn');
  const sections = container.querySelectorAll('.settings-sec-content');

  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navBtns.forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-secondary');
      });
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');

      const targetSec = btn.dataset.sec;
      sections.forEach(sec => {
        sec.style.display = sec.id === `sec-${targetSec}` ? 'block' : 'none';
      });
    });
  });

  // Save Settings
  container.querySelector('#btn-save-settings').addEventListener('click', (e) => {
    e.preventDefault();
    const form = container.querySelector('#settings-form');
    const formData = new FormData(form);

    const updated = {
      businessName: formData.get('businessName') || settings.businessName,
      taxId: formData.get('taxId') || settings.taxId,
      currency: formData.get('currency') || settings.currency,
      warehouseLocation: formData.get('warehouseLocation') || settings.warehouseLocation,
      safetyStockMultiplier: formData.get('safetyStockMultiplier') || settings.safetyStockMultiplier,
      lowStockThresholdGlobal: parseInt(formData.get('lowStockThresholdGlobal')) || settings.lowStockThresholdGlobal,
      autoPoDraft: formData.get('autoPoDraft') === 'on',
      btreeIndexing: formData.get('btreeIndexing') === 'on'
    };

    store.updateSettings(updated);
    showNotification('System settings updated successfully!');
  });

  // Export Backup
  container.querySelector('#btn-export-backup')?.addEventListener('click', () => {
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store.data, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download', `StockSync_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Database snapshot downloaded successfully!');
  });

  // Reset Factory
  container.querySelector('#btn-reset-factory')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all data back to original seed demonstration values?')) {
      store.resetToInitial();
      showNotification('System data reset to initial prototype state.');
      store.setActiveScreen('dashboard');
    }
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
