let products = JSON.parse(localStorage.getItem('sorriso_estoque')) || [];
let inventoryHistory = JSON.parse(localStorage.getItem('sorriso_historico')) || [];

const productForm = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const categoryInput = document.getElementById('category');
const quantityInput = document.getElementById('quantity');
const costInput = document.getElementById('cost'); 
const priceInput = document.getElementById('price');
const searchInput = document.getElementById('search-input');
const productsList = document.getElementById('products-list');
const historyList = document.getElementById('history-list');

function getFormattedDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function addHistoryLog(actionType, productName, quantityChanged, finalQuantity) {
    const log = {
        timestamp: getFormattedDateTime(),
        action: actionType,
        name: productName,
        change: quantityChanged,
        final: finalQuantity
    };
    
    inventoryHistory.unshift(log);
    localStorage.setItem('sorriso_historico', JSON.stringify(inventoryHistory));
    renderHistory();
}

function renderHistory() {
    if (!historyList) return;
    historyList.innerHTML = '';

    if (inventoryHistory.length === 0) {
        historyList.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #64748b;">
                    Nenhuma movimentação registrada ainda.
                </td>
            </tr>
        `;
        return;
    }

    inventoryHistory.forEach(log => {
        let actionBadge = '';
        let changeText = '';
        
        if (log.action === 'Cadastro') {
            actionBadge = `<span style="background: #2563eb; padding: 2px 6px; border-radius: 4px; font-size: 11px;">🆕 CADASTRO</span>`;
            changeText = `<span style="color: #2563eb;">+${log.change}</span>`;
        } else if (log.action === 'Entrada') {
            actionBadge = `<span style="background: #16a34a; padding: 2px 6px; border-radius: 4px; font-size: 11px;">📥 ENTRADA</span>`;
            changeText = `<span style="color: #4ade80;">+${log.change}</span>`;
        } else if (log.action === 'Venda') {
            actionBadge = `<span style="background: #ea580c; padding: 2px 6px; border-radius: 4px; font-size: 11px;">💰 VENDA</span>`;
            changeText = `<span style="color: #f97316;">-${log.change}</span>`;
        } else if (log.action === 'Exclusão') {
            actionBadge = `<span style="background: #dc2626; padding: 2px 6px; border-radius: 4px; font-size: 11px;">❌ EXCLUSÃO</span>`;
            changeText = `<span style="color: #ef4444;">Removido</span>`;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="color: #94a3b8; font-size: 13px;">${log.timestamp}</td>
            <td>${actionBadge}</td>
            <td><strong>${log.name}</strong></td>
            <td style="font-weight: bold;">${changeText}</td>
            <td style="color: #ffcc00;">${log.final} un.</td>
        `;
        historyList.appendChild(row);
    });
}

function clearHistory() {
    const SENHA_ADM = "cleber765"; 
    const senhaDigitada = prompt("Digite a senha de ADMINISTRADOR para limpar o histórico:");

    if (senhaDigitada === null) return;

    if (senhaDigitada === SENHA_ADM) {
        if (confirm("Senha correta! Tem certeza que deseja apagar TODO o histórico permanente? Essa ação não pode ser desfeita.")) {
            inventoryHistory = [];
            localStorage.setItem('sorriso_historico', JSON.stringify(inventoryHistory));
            renderHistory();
        }
    } else {
        alert("❌ Senha incorreta! Acesso negado.");
    }
}

// FUNÇÃO NOVA: CRIA E BAIXA O ARQUIVO EXCEL DO SEU HISTÓRICO
function exportToExcel() {
    if (inventoryHistory.length === 0) {
        alert("Não há dados no histórico para exportar!");
        return;
    }

    // Cria a estrutura HTML que o Excel consegue ler como planilha
    let excelTemplate = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Histórico Sorriso</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>
        <body>
        <table border="1">
            <tr style="background-color: #2563eb; color: white; font-weight: bold;">
                <th>Data / Hora</th>
                <th>Ação</th>
                <th>Bateria / Modelo</th>
                <th>Quantidade Alterada</th>
                <th>Estoque Final</th>
            </tr>
    `;

    // Preenche as linhas da planilha com as informações salvas
    inventoryHistory.forEach(log => {
        excelTemplate += `
            <tr>
                <td>${log.timestamp}</td>
                <td>${log.action.toUpperCase()}</td>
                <td>${log.name}</td>
                <td>${log.action === 'Venda' ? '-' : '+'}${log.change}</td>
                <td>${log.final} un.</td>
            </tr>
        `;
    });

    excelTemplate += `</table></body></html>`;

    // Cria o arquivo virtual e força o download no computador ou celular
    const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historico_estoque_sorriso.xls';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function renderProducts(productsToDisplay = products) {
    if (!productsList) return;
    productsList.innerHTML = '';

    let totalModels = products.length;
    let totalItems = 0;
    let totalValue = 0;

    products.forEach(p => {
        const qty = parseInt(p.quantity) || 0;
        const cost = parseFloat(p.cost) !== undefined ? parseFloat(p.cost) : parseFloat(p.price || 0);
        totalItems += qty;
        totalValue += (qty * cost);
    });

    document.getElementById('card-total-models').innerText = totalModels;
    document.getElementById('card-total-items').innerText = totalItems + " un.";
    document.getElementById('card-total-value').innerText = "R$ " + totalValue.toFixed(2);

    if (productsToDisplay.length === 0) {
        productsList.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; color: #64748b;">
                    Nenhuma bateria encontrada no filtro selecionado.
                </td>
            </tr>
        `;
        return;
    }

    productsToDisplay.forEach((product) => {
        const globalIndex = products.indexOf(product);
        const qty = parseInt(product.quantity) || 0;
        const price = parseFloat(product.price) || 0;
        const cost = product.cost !== undefined ? parseFloat(product.cost) : 0;
        const totalProductValue = qty * price;
        
        const lastUpdate = product.lastModified || '--/--/---- --:--';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${product.name}</strong></td>
            <td><span style="background: rgba(255,255,255,0.1); padding: 3px 8px; border-radius: 4px;">${product.category}</span></td>
            <td>${qty}</td>
            <td style="color: #f87171;">R$ ${cost.toFixed(2)}</td>
            <td style="color: #4ade80;">R$ ${price.toFixed(2)}</td>
            <td style="color: #ffcc00; font-weight: bold;">R$ ${totalProductValue.toFixed(2)}</td>
            <td style="color: #94a3b8; font-size: 13px;">${lastUpdate}</td>
            <td>
                <button class="btn-action btn-in" onclick="changeQuantity(${globalIndex}, 1)">+ Entrada</button>
                <button class="btn-action btn-out" onclick="changeQuantity(${globalIndex}, -1)">- Venda</button>
                <button class="btn-action btn-delete" onclick="deleteProduct(${globalIndex})">Excluir</button>
            </td>
        `;
        productsList.appendChild(row);
    });
}

function saveToLocalStorage() {
    localStorage.setItem('sorriso_estoque', JSON.stringify(products));
}

productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const qtyValue = parseInt(quantityInput.value) || 0;
    const currentDateTime = getFormattedDateTime();

    const newProduct = {
        name: nameValue,
        category: nameValue.toLowerCase().includes('moto') ? 'moto' : categoryInput.value.trim().toLowerCase(),
        quantity: qtyValue,
        cost: parseFloat(costInput.value) || 0, 
        price: parseFloat(priceInput.value) || 0,
        lastModified: currentDateTime
    };

    products.push(newProduct);
    saveToLocalStorage();
    
    addHistoryLog('Cadastro', newProduct.name, qtyValue, qtyValue);
    
    resetFilters();
    renderProducts();

    productForm.reset();
    nameInput.focus();
});

function changeQuantity(index, amount) {
    const product = products[index];
    const originalQty = parseInt(product.quantity) || 0;
    
    if (amount === -1) {
        const confirmarVenda = confirm(`Confirmar a venda de 1 unidade de: "${product.name}"?`);
        if (!confirmarVenda) {
            return; 
        }
    }
    
    product.quantity = originalQty + amount;
    if (product.quantity < 0) product.quantity = 0;

    const finalQty = product.quantity;
    product.lastModified = getFormattedDateTime();

    saveToLocalStorage();
    
    const type = amount > 0 ? 'Entrada' : 'Venda';
    addHistoryLog(type, product.name, 1, finalQty);

    applyCurrentActiveFilter();
}

function deleteProduct(index) {
    const productName = products[index].name;
    const qtyCurrent = products[index].quantity || 0;
    
    if (confirm(`Remover do estoque permanente: "${productName}"?`)) {
        addHistoryLog('Exclusão', productName, qtyCurrent, 0);
        
        products.splice(index, 1);
        saveToLocalStorage();
        
        resetFilters();
        renderProducts();
    }
}

searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.btn-filter[onclick*="todos"]').classList.add('active');

    const filtered = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) || 
               product.category.toLowerCase().includes(searchTerm);
    });
    renderProducts(filtered);
});

function filterByPreset(preset) {
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if(window.event && window.event.target && window.event.target.classList.contains('btn-filter')) {
        window.event.target.classList.add('active');
    } else {
        const btn = Array.from(buttons).find(b => b.getAttribute('onclick').includes(preset));
        if (btn) btn.classList.add('active');
    }

    if (preset === 'todos') {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(product => {
        const name = product.name.toLowerCase();
        const category = product.category.toLowerCase();

        if (preset === 'carro') {
            return category.includes('carro') || name.includes('60ah') || name.includes('70ah') || name.includes('45ah');
        }
        if (preset === 'moto') {
            return category.includes('moto') || name.includes('5ah') || name.includes('7ah') || name.includes('6ah');
        }
        if (preset === 'pesada') {
            return category.includes('maquina') || category.includes('caminhao') || name.includes('150ah') || name.includes('100ah') || name.includes('180ah');
        }
        if (preset === 'moura') {
            return name.includes('moura');
        }
        if (preset === 'heliar') {
            return name.includes('heliar');
        }
    });

    renderProducts(filtered);
}

function resetFilters() {
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
    const btnTodos = document.querySelector('.btn-filter[onclick*="todos"]');
    if(btnTodos) btnTodos.classList.add('active');
    searchInput.value = '';
}

function applyCurrentActiveFilter() {
    const activeBtn = document.querySelector('.btn-filter.active');
    if (activeBtn) {
        const presetMatch = activeBtn.getAttribute('onclick').match(/'([^']+)'/);
        if (presetMatch) {
            filterByPreset(presetMatch[1]);
            return;
        }
    }
    renderProducts();
}

renderProducts();
renderHistory();
