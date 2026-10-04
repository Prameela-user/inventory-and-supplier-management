// StockSync Global Application State Store

const STORAGE_KEY = 'stocksync_app_state_v1';

const initialData = {
  activeScreen: 'dashboard',
  searchQuery: '',
  aiDrawerOpen: false,
  mobileModalOpen: false,
  
  // Products Data
  products: [
    {
      id: 'PRD-1001',
      name: 'Laptop Bags (Pro Executive 15")',
      sku: 'SKU-LB-9921',
      category: 'Accessories',
      stock: 14,
      reorderPoint: 30,
      predictedReorderQty: 120,
      supplierId: 'SUP-001',
      supplierName: 'Global Tech Traders',
      costPrice: 45,
      sellingPrice: 89,
      fastMoving: true,
      status: 'low', // 'in', 'low', 'out'
      lastUpdated: '2026-09-29'
    },
    {
      id: 'PRD-1002',
      name: 'Wireless Ergonomic Mice',
      sku: 'SKU-WM-4412',
      category: 'Electronics',
      stock: 145,
      reorderPoint: 40,
      predictedReorderQty: 80,
      supplierId: 'SUP-001',
      supplierName: 'Global Tech Traders',
      costPrice: 18,
      sellingPrice: 39,
      fastMoving: true,
      status: 'in',
      lastUpdated: '2026-09-29'
    },
    {
      id: 'PRD-1003',
      name: 'UltraHD 27" Studio Monitors',
      sku: 'SKU-MON-2700',
      category: 'Electronics',
      stock: 4,
      reorderPoint: 15,
      predictedReorderQty: 40,
      supplierId: 'SUP-002',
      supplierName: 'Apex Logistics & Tech',
      costPrice: 210,
      sellingPrice: 349,
      fastMoving: false,
      status: 'low',
      lastUpdated: '2026-09-28'
    },
    {
      id: 'PRD-1004',
      name: 'Noise-Canceling ANC Headphones',
      sku: 'SKU-HP-8890',
      category: 'Audio',
      stock: 18,
      reorderPoint: 25,
      predictedReorderQty: 75,
      supplierId: 'SUP-003',
      supplierName: 'SoundWave Electronics',
      costPrice: 85,
      sellingPrice: 169,
      fastMoving: true,
      status: 'low',
      lastUpdated: '2026-09-29'
    },
    {
      id: 'PRD-1005',
      name: 'USB-C 10-in-1 Multi-Port Hubs',
      sku: 'SKU-HUB-1001',
      category: 'Accessories',
      stock: 230,
      reorderPoint: 50,
      predictedReorderQty: 100,
      supplierId: 'SUP-001',
      supplierName: 'Global Tech Traders',
      costPrice: 22,
      sellingPrice: 49,
      fastMoving: false,
      status: 'in',
      lastUpdated: '2026-09-27'
    },
    {
      id: 'PRD-1006',
      name: 'Smart Fitness Watches Pro',
      sku: 'SKU-WTC-5002',
      category: 'Wearables',
      stock: 0,
      reorderPoint: 20,
      predictedReorderQty: 60,
      supplierId: 'SUP-004',
      supplierName: 'Vanguard Supply Co.',
      costPrice: 110,
      sellingPrice: 229,
      fastMoving: true,
      status: 'out',
      lastUpdated: '2026-09-29'
    },
    {
      id: 'PRD-1007',
      name: 'Mechanical RGB Keyboards',
      sku: 'SKU-KB-3301',
      category: 'Electronics',
      stock: 92,
      reorderPoint: 30,
      predictedReorderQty: 50,
      supplierId: 'SUP-003',
      supplierName: 'SoundWave Electronics',
      costPrice: 60,
      sellingPrice: 119,
      fastMoving: false,
      status: 'in',
      lastUpdated: '2026-09-26'
    },
    {
      id: 'PRD-1008',
      name: 'Ergonomic Aluminum Laptop Stands',
      sku: 'SKU-STD-1100',
      category: 'Office',
      stock: 310,
      reorderPoint: 40,
      predictedReorderQty: 50,
      supplierId: 'SUP-002',
      supplierName: 'Apex Logistics & Tech',
      costPrice: 19,
      sellingPrice: 39,
      fastMoving: false,
      status: 'in',
      lastUpdated: '2026-09-25'
    }
  ],

  // Suppliers Data
  suppliers: [
    {
      id: 'SUP-001',
      name: 'Global Tech Traders',
      contactPerson: 'Sarah Jenkins',
      email: 'sarah@globaltech.com',
      phone: '+1 (555) 019-2834',
      address: '742 Tech Parkway, San Jose, CA',
      productsSupplied: ['Laptop Bags', 'Wireless Mice', 'USB-C Hubs'],
      deliveryPerformance: '98.4%',
      reliabilityScore: 98,
      avgDeliveryDays: 2.1,
      status: 'Preferred',
      rating: 4.9,
      totalOrders: 42
    },
    {
      id: 'SUP-002',
      name: 'Apex Logistics & Tech',
      contactPerson: 'Marcus Vance',
      email: 'marcus@apexlogistics.io',
      phone: '+1 (555) 034-1190',
      address: '109 Commerce Way, Austin, TX',
      productsSupplied: ['UltraHD Monitors', 'Laptop Stands'],
      deliveryPerformance: '94.2%',
      reliabilityScore: 94,
      avgDeliveryDays: 4.2,
      status: 'Active',
      rating: 4.6,
      totalOrders: 28
    },
    {
      id: 'SUP-003',
      name: 'SoundWave Electronics',
      contactPerson: 'Elena Rostova',
      email: 'elena@soundwave.net',
      phone: '+1 (555) 087-3321',
      address: '500 Innovation Blvd, Seattle, WA',
      productsSupplied: ['ANC Headphones', 'RGB Keyboards'],
      deliveryPerformance: '91.5%',
      reliabilityScore: 91,
      avgDeliveryDays: 3.5,
      status: 'Active',
      rating: 4.4,
      totalOrders: 35
    },
    {
      id: 'SUP-004',
      name: 'Vanguard Supply Co.',
      contactPerson: 'David Chen',
      email: 'dchen@vanguard.co',
      phone: '+1 (555) 045-9801',
      address: '88 Logistics Hub, Chicago, IL',
      productsSupplied: ['Smart Watches Pro'],
      deliveryPerformance: '88.0%',
      reliabilityScore: 88,
      avgDeliveryDays: 5.0,
      status: 'Under Review',
      rating: 4.1,
      totalOrders: 19
    }
  ],

  // Purchase Orders Data
  purchaseOrders: [
    {
      id: 'PO-2026-089',
      supplierId: 'SUP-001',
      supplierName: 'Global Tech Traders',
      productId: 'PRD-1001',
      productName: 'Laptop Bags (Pro Executive 15")',
      quantity: 120,
      unitCost: 45,
      totalAmount: 5400,
      orderDate: '2026-09-28',
      expectedDelivery: '2026-10-02',
      status: 'In Transit', // 'Pending', 'Processing', 'In Transit', 'Received', 'Cancelled'
      notes: 'AI predicted fast velocity replenishment order.'
    },
    {
      id: 'PO-2026-088',
      supplierId: 'SUP-003',
      supplierName: 'SoundWave Electronics',
      productId: 'PRD-1004',
      productName: 'Noise-Canceling ANC Headphones',
      quantity: 75,
      unitCost: 85,
      totalAmount: 6375,
      orderDate: '2026-09-27',
      expectedDelivery: '2026-10-05',
      status: 'Pending',
      notes: 'Weekly buffer replenishment.'
    },
    {
      id: 'PO-2026-087',
      supplierId: 'SUP-002',
      supplierName: 'Apex Logistics & Tech',
      productId: 'PRD-1003',
      productName: 'UltraHD 27" Studio Monitors',
      quantity: 40,
      unitCost: 210,
      totalAmount: 8400,
      orderDate: '2026-09-24',
      expectedDelivery: '2026-09-28',
      status: 'Received',
      notes: 'Emergency reorder for low stock.'
    },
    {
      id: 'PO-2026-086',
      supplierId: 'SUP-004',
      supplierName: 'Vanguard Supply Co.',
      productId: 'PRD-1006',
      productName: 'Smart Fitness Watches Pro',
      quantity: 60,
      unitCost: 110,
      totalAmount: 6600,
      orderDate: '2026-09-26',
      expectedDelivery: '2026-10-08',
      status: 'Processing',
      notes: 'Stockout resolution PO.'
    }
  ],

  // Sales / Invoices Data
  sales: [
    {
      id: 'INV-8842',
      customer: 'Metro Digital Retail',
      productId: 'PRD-1001',
      productName: 'Laptop Bags (Pro Executive 15")',
      quantity: 10,
      unitPrice: 89,
      amount: 890,
      date: '2026-09-29 14:20',
      status: 'Paid'
    },
    {
      id: 'INV-8841',
      customer: 'TechCorp Solutions',
      productId: 'PRD-1002',
      productName: 'Wireless Ergonomic Mice',
      quantity: 25,
      unitPrice: 39,
      amount: 975,
      date: '2026-09-29 11:05',
      status: 'Paid'
    },
    {
      id: 'INV-8840',
      customer: 'Horizon College IT',
      productId: 'PRD-1005',
      productName: 'USB-C 10-in-1 Multi-Port Hubs',
      quantity: 15,
      unitPrice: 49,
      amount: 735,
      date: '2026-09-28 16:45',
      status: 'Paid'
    },
    {
      id: 'INV-8839',
      customer: 'Studio Nine Labs',
      productId: 'PRD-1007',
      productName: 'Mechanical RGB Keyboards',
      quantity: 8,
      unitPrice: 119,
      amount: 952,
      date: '2026-09-28 09:30',
      status: 'Paid'
    },
    {
      id: 'INV-8838',
      customer: 'Apex Creative Studio',
      productId: 'PRD-1004',
      productName: 'Noise-Canceling ANC Headphones',
      quantity: 12,
      unitPrice: 169,
      amount: 2028,
      date: '2026-09-27 15:10',
      status: 'Paid'
    }
  ],

  // Stock Movement Ledger (Inward & Outward)
  stockMovements: [
    {
      id: 'MOV-1042',
      type: 'OUTWARD', // 'INWARD' or 'OUTWARD'
      productId: 'PRD-1001',
      productName: 'Laptop Bags (Pro Executive 15")',
      quantity: -10,
      stockAfter: 14,
      reference: 'INV-8842',
      user: 'Sales Terminal #1',
      timestamp: '2026-09-29 14:20',
      reason: 'Retail Customer Purchase'
    },
    {
      id: 'MOV-1041',
      type: 'OUTWARD',
      productId: 'PRD-1002',
      productName: 'Wireless Ergonomic Mice',
      quantity: -25,
      stockAfter: 145,
      reference: 'INV-8841',
      user: 'Sales Terminal #2',
      timestamp: '2026-09-29 11:05',
      reason: 'B2B Wholesale Order'
    },
    {
      id: 'MOV-1040',
      type: 'INWARD',
      productId: 'PRD-1003',
      productName: 'UltraHD 27" Studio Monitors',
      quantity: +40,
      stockAfter: 4, // Prior to recent sales
      reference: 'PO-2026-087',
      user: 'Stock Receiver John D.',
      timestamp: '2026-09-28 16:00',
      reason: 'PO Shipment Delivered'
    },
    {
      id: 'MOV-1039',
      type: 'OUTWARD',
      productId: 'PRD-1004',
      productName: 'Noise-Canceling ANC Headphones',
      quantity: -12,
      stockAfter: 18,
      reference: 'INV-8838',
      user: 'E-Commerce Sync',
      timestamp: '2026-09-27 15:10',
      reason: 'Online Store Dispatch'
    },
    {
      id: 'MOV-1038',
      type: 'INWARD',
      productId: 'PRD-1005',
      productName: 'USB-C 10-in-1 Multi-Port Hubs',
      quantity: +100,
      stockAfter: 245,
      reference: 'PO-2026-081',
      user: 'Inventory Lead Mark K.',
      timestamp: '2026-09-26 10:15',
      reason: 'Supplier Batch Restock'
    }
  ],

  // AI Reorder Insights & Recommendations
  aiInsights: [
    {
      id: 'AI-101',
      type: 'reorder',
      priority: 'high',
      title: 'Urgent Reorder Required',
      productName: 'Laptop Bags (Pro Executive 15")',
      productId: 'PRD-1001',
      recommendedQty: 120,
      recommendedSupplierId: 'SUP-001',
      recommendedSupplierName: 'Global Tech Traders',
      message: 'Stock is down to 14 units (Threshold: 30). Expected stockout in 3.5 days based on 14-day velocity. Preferred supplier Global Tech Traders has 2.1 days lead time.',
      actionLabel: '1-Click Create PO'
    },
    {
      id: 'AI-102',
      type: 'stockout',
      priority: 'critical',
      title: 'Critical Out-of-Stock Alert',
      productName: 'Smart Fitness Watches Pro',
      productId: 'PRD-1006',
      recommendedQty: 60,
      recommendedSupplierId: 'SUP-004',
      recommendedSupplierName: 'Vanguard Supply Co.',
      message: 'Stock reached 0 units! Active PO-2026-086 is in processing. Expedite with Vanguard Supply Co. to capture estimated $1,374 lost sales.',
      actionLabel: 'Track Expedite PO'
    },
    {
      id: 'AI-103',
      type: 'supplier',
      priority: 'medium',
      title: 'Supplier Efficiency Optimal',
      productName: 'Wireless Ergonomic Mice',
      productId: 'PRD-1002',
      recommendedQty: 80,
      recommendedSupplierId: 'SUP-001',
      recommendedSupplierName: 'Global Tech Traders',
      message: 'Global Tech Traders achieved 98.4% delivery SLA compliance across last 10 POs. Recommended for all upcoming tech accessory procurements.',
      actionLabel: 'View Supplier Metrics'
    },
    {
      id: 'AI-104',
      type: 'bundle',
      priority: 'low',
      title: 'Freight Cost Optimization',
      productName: 'Accessories & Audio',
      productId: null,
      recommendedQty: 0,
      recommendedSupplierId: 'SUP-003',
      recommendedSupplierName: 'SoundWave Electronics',
      message: 'Combining pending reorders for Noise-Canceling Headphones & RGB Keyboards will qualify for free freight logistics ($380 cost reduction).',
      actionLabel: 'Bundle Reorders'
    }
  ],

  // System Settings
  settings: {
    businessName: 'StockSync Enterprise Chain',
    taxId: 'TX-998823-A',
    currency: 'USD ($)',
    warehouseLocation: 'Main Distribution Hub - Hub #4, San Jose',
    safetyStockMultiplier: '1.5x (Optimal)',
    autoPoDraft: true,
    btreeIndexing: true,
    emailAlerts: true,
    pushNotifications: true,
    lowStockThresholdGlobal: 25,
    userRole: 'Administrator (Operations Lead)'
  },

  // Current User Profile & Auth
  currentUser: {
    email: 'admin@stocksync.ai',
    name: 'Alex Morgan',
    role: 'Operations Lead',
    isLoggedIn: false
  }
};

class AppState {
  constructor() {
    this.listeners = [];
    this.loadState();
  }

  loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        this.data = JSON.parse(saved);
        // Ensure structure matches
        this.data = { ...initialData, ...this.data };
      } catch (e) {
        console.error('Failed to parse saved state, using initial state:', e);
        this.data = JSON.parse(JSON.stringify(initialData));
      }
    } else {
      this.data = JSON.parse(JSON.stringify(initialData));
    }
  }

  saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this.data));
  }

  // Action Methods
  setActiveScreen(screenName) {
    this.data.activeScreen = screenName;
    this.saveState();
  }

  setSearchQuery(query, silent = false) {
    this.data.searchQuery = query;
    if (!silent) {
      this.notify();
    }
  }

  toggleAiDrawer(open) {
    this.data.aiDrawerOpen = open !== undefined ? open : !this.data.aiDrawerOpen;
    this.notify();
  }

  toggleMobileModal(open) {
    this.data.mobileModalOpen = open !== undefined ? open : !this.data.mobileModalOpen;
    this.notify();
  }

  // --- WORKFLOW HELPERS ---

  // 1. Add Product
  addProduct(product) {
    const id = 'PRD-' + Math.floor(1000 + Math.random() * 9000);
    const newProd = {
      id,
      sku: product.sku || 'SKU-' + Math.floor(1000 + Math.random() * 9000),
      name: product.name,
      category: product.category || 'General',
      stock: parseInt(product.stock) || 0,
      reorderPoint: parseInt(product.reorderPoint) || 20,
      predictedReorderQty: Math.max(50, (parseInt(product.reorderPoint) || 20) * 3),
      supplierId: product.supplierId || 'SUP-001',
      supplierName: product.supplierName || 'Global Tech Traders',
      costPrice: parseFloat(product.costPrice) || 10,
      sellingPrice: parseFloat(product.sellingPrice) || 25,
      fastMoving: product.fastMoving || false,
      status: parseInt(product.stock) === 0 ? 'out' : (parseInt(product.stock) <= parseInt(product.reorderPoint) ? 'low' : 'in'),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    this.data.products.unshift(newProd);

    // If initial stock added, record INWARD stock movement
    if (newProd.stock > 0) {
      this.addStockMovement({
        type: 'INWARD',
        productId: newProd.id,
        productName: newProd.name,
        quantity: newProd.stock,
        stockAfter: newProd.stock,
        reference: 'INIT-STOCK',
        user: 'System Admin',
        reason: 'Initial Product Inventory Intake'
      });
    }

    this.reevaluateAiInsights();
    this.saveState();
    return newProd;
  }

  // Edit / Update Product
  updateProduct(id, updatedFields) {
    const index = this.data.products.findIndex(p => p.id === id);
    if (index !== -1) {
      const p = this.data.products[index];
      const newStock = updatedFields.stock !== undefined ? parseInt(updatedFields.stock) : p.stock;
      const newReorder = updatedFields.reorderPoint !== undefined ? parseInt(updatedFields.reorderPoint) : p.reorderPoint;
      
      let status = 'in';
      if (newStock === 0) status = 'out';
      else if (newStock <= newReorder) status = 'low';

      this.data.products[index] = {
        ...p,
        ...updatedFields,
        stock: newStock,
        reorderPoint: newReorder,
        status,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      this.reevaluateAiInsights();
      this.saveState();
    }
  }

  deleteProduct(id) {
    this.data.products = this.data.products.filter(p => p.id !== id);
    this.reevaluateAiInsights();
    this.saveState();
  }

  // 2. Add Supplier
  addSupplier(supplier) {
    const id = 'SUP-' + String(this.data.suppliers.length + 1).padStart(3, '0');
    const newSup = {
      id,
      name: supplier.name,
      contactPerson: supplier.contactPerson || 'Account Lead',
      email: supplier.email || 'contact@supplier.com',
      phone: supplier.phone || '+1 (555) 000-0000',
      address: supplier.address || 'Industrial Hub',
      productsSupplied: supplier.productsSupplied || ['Electronics'],
      deliveryPerformance: '95.0%',
      reliabilityScore: 95,
      avgDeliveryDays: parseFloat(supplier.avgDeliveryDays) || 3.0,
      status: supplier.status || 'Active',
      rating: 4.5,
      totalOrders: 0
    };
    this.data.suppliers.unshift(newSup);
    this.saveState();
    return newSup;
  }

  // 3. Create Purchase Order
  createPurchaseOrder(poData) {
    const id = 'PO-2026-' + Math.floor(100 + Math.random() * 900);
    const prod = this.data.products.find(p => p.id === poData.productId);
    const sup = this.data.suppliers.find(s => s.id === poData.supplierId);

    const qty = parseInt(poData.quantity) || 50;
    const unitCost = parseFloat(poData.unitCost) || (prod ? prod.costPrice : 20);
    const totalAmount = qty * unitCost;

    const newPo = {
      id,
      supplierId: poData.supplierId,
      supplierName: sup ? sup.name : poData.supplierName || 'Global Supplier',
      productId: poData.productId,
      productName: prod ? prod.name : poData.productName || 'Product Unit',
      quantity: qty,
      unitCost: unitCost,
      totalAmount: totalAmount,
      orderDate: new Date().toISOString().split('T')[0],
      expectedDelivery: poData.expectedDelivery || new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
      status: 'Pending',
      notes: poData.notes || 'Manually created purchase order.'
    };

    this.data.purchaseOrders.unshift(newPo);
    this.saveState();
    return newPo;
  }

  // 4. Receive Purchase Order -> INWARD Stock & Inventory Increase!
  receivePurchaseOrder(poId) {
    const poIndex = this.data.purchaseOrders.findIndex(p => p.id === poId);
    if (poIndex === -1) return;

    const po = this.data.purchaseOrders[poIndex];
    if (po.status === 'Received') return; // Already received

    // Mark PO as Received
    po.status = 'Received';

    // Increase product inventory stock
    const prodIndex = this.data.products.findIndex(p => p.id === po.productId);
    let stockAfter = po.quantity;
    if (prodIndex !== -1) {
      const prod = this.data.products[prodIndex];
      prod.stock += po.quantity;
      if (prod.stock > prod.reorderPoint) {
        prod.status = 'in';
      } else if (prod.stock > 0) {
        prod.status = 'low';
      }
      stockAfter = prod.stock;
    }

    // Record INWARD Stock Movement
    this.addStockMovement({
      type: 'INWARD',
      productId: po.productId,
      productName: po.productName,
      quantity: po.quantity,
      stockAfter: stockAfter,
      reference: po.id,
      user: 'Stock Receiver',
      reason: `PO #${po.id} Delivery Intake`
    });

    this.reevaluateAiInsights();
    this.saveState();
  }

  // Cancel Purchase Order
  cancelPurchaseOrder(poId) {
    const po = this.data.purchaseOrders.find(p => p.id === poId);
    if (po && po.status !== 'Received') {
      po.status = 'Cancelled';
      this.saveState();
    }
  }

  // 5. Create Sale -> OUTWARD Stock & Inventory Decrease!
  createSale(saleData) {
    const id = 'INV-' + Math.floor(8000 + Math.random() * 1000);
    const prod = this.data.products.find(p => p.id === saleData.productId);

    if (!prod) {
      throw new Error('Product not found');
    }

    const qty = parseInt(saleData.quantity) || 1;
    if (prod.stock < qty) {
      throw new Error(`Insufficient stock available! Current stock: ${prod.stock} units.`);
    }

    const unitPrice = parseFloat(saleData.unitPrice) || prod.sellingPrice;
    const totalAmount = qty * unitPrice;

    // Deduct stock
    prod.stock -= qty;
    if (prod.stock === 0) {
      prod.status = 'out';
    } else if (prod.stock <= prod.reorderPoint) {
      prod.status = 'low';
    }

    // Create Sale record
    const now = new Date();
    const timeStr = now.toISOString().split('T')[0] + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    
    const newSale = {
      id,
      customer: saleData.customer || 'Walk-in Retail Client',
      productId: prod.id,
      productName: prod.name,
      quantity: qty,
      unitPrice,
      amount: totalAmount,
      date: timeStr,
      status: 'Paid'
    };

    this.data.sales.unshift(newSale);

    // Record OUTWARD Stock Movement
    this.addStockMovement({
      type: 'OUTWARD',
      productId: prod.id,
      productName: prod.name,
      quantity: -qty,
      stockAfter: prod.stock,
      reference: newSale.id,
      user: 'POS Terminal',
      reason: `Customer Purchase Invoice #${newSale.id}`
    });

    this.reevaluateAiInsights();
    this.saveState();
    return newSale;
  }

  // 6. Record Stock Movement Helper
  addStockMovement(movData) {
    const id = 'MOV-' + Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const timeStr = now.toISOString().split('T')[0] + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');

    const newMov = {
      id,
      type: movData.type, // 'INWARD' or 'OUTWARD'
      productId: movData.productId,
      productName: movData.productName,
      quantity: movData.quantity,
      stockAfter: movData.stockAfter,
      reference: movData.reference || 'SYS-ADJ',
      user: movData.user || 'System User',
      timestamp: timeStr,
      reason: movData.reason || 'Inventory Movement'
    };

    this.data.stockMovements.unshift(newMov);
  }

  // Re-evaluate AI Insights based on current state
  reevaluateAiInsights() {
    const lowStockProds = this.data.products.filter(p => p.stock <= p.reorderPoint);
    const outStockProds = this.data.products.filter(p => p.stock === 0);

    let insights = [];

    outStockProds.forEach(p => {
      insights.push({
        id: 'AI-' + p.id + '-OUT',
        type: 'stockout',
        priority: 'critical',
        title: 'Critical Out-of-Stock',
        productName: p.name,
        productId: p.id,
        recommendedQty: p.predictedReorderQty || 60,
        recommendedSupplierId: p.supplierId,
        recommendedSupplierName: p.supplierName,
        message: `Stock level for "${p.name}" is 0! Urgent reorder of ${p.predictedReorderQty || 60} units from ${p.supplierName} recommended immediately.`,
        actionLabel: '1-Click Create PO'
      });
    });

    lowStockProds.filter(p => p.stock > 0).forEach(p => {
      insights.push({
        id: 'AI-' + p.id + '-LOW',
        type: 'reorder',
        priority: 'high',
        title: 'Low Stock Prediction Alert',
        productName: p.name,
        productId: p.id,
        recommendedQty: p.predictedReorderQty || 100,
        recommendedSupplierId: p.supplierId,
        recommendedSupplierName: p.supplierName,
        message: `Current stock of ${p.stock} is below reorder threshold (${p.reorderPoint}). Sales rate indicates potential stockout in 3-4 days.`,
        actionLabel: '1-Click Create PO'
      });
    });

    // Supplier optimization
    insights.push({
      id: 'AI-SUP-BEST',
      type: 'supplier',
      priority: 'medium',
      title: 'Top Supplier Reliability',
      productName: 'Global Tech Traders',
      productId: null,
      recommendedQty: 0,
      recommendedSupplierId: 'SUP-001',
      recommendedSupplierName: 'Global Tech Traders',
      message: 'Global Tech Traders leads performance metrics with 98.4% on-time fulfillment and 2.1-day average lead time.',
      actionLabel: 'View Suppliers'
    });

    this.data.aiInsights = insights;
  }

  loginUser(email, password, customName) {
    let name = customName;
    if (!name) {
      if (email && email.includes('@')) {
        const prefix = email.split('@')[0];
        name = prefix.replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      } else if (email) {
        name = email.replace(/\b\w/g, c => c.toUpperCase());
      } else {
        name = 'Admin Operator';
      }
    }
    this.data.currentUser = {
      email: email || 'admin@stocksync.ai',
      name: name || 'Operator',
      role: this.data.settings?.userRole || 'Operations Lead',
      isLoggedIn: true
    };
    this.saveState();
    return this.data.currentUser;
  }

  logoutUser() {
    if (!this.data.currentUser) {
      this.data.currentUser = { ...initialData.currentUser };
    }
    this.data.currentUser.isLoggedIn = false;
    this.saveState();
  }

  updateSettings(newSettings) {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.saveState();
  }

  resetToInitial() {
    this.data = JSON.parse(JSON.stringify(initialData));
    this.saveState();
  }
}

export const store = new AppState();
