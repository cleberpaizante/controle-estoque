// CONFIGURAÇÃO DO SUPABASE
const SUPABASE_URL = 'https://wtsxkjdhdcfruseqoen.supabase.co';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_AQUI'sb_publishable_jkPNgNT7XL7FfwfQG6o5nw_0HVdKyiy';

// Inicializa o cliente do Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const TABELA_NOME = 'produtos'; 

// Elementos do HTML
const productForm = document.getElementById('product-form');
const productsList = document.getElementById('products-list');
const historyList = document.getElementById('history-list');
const cardTotalModels = document.getElementById('card-total-models');
const cardTotalItems = document.getElementById('card-total-items');
const cardTotalValue = document.getElementById('card-total-value');
const searchInput = document.getElementById('search-input');

let localProducts = [];

// Carrega os dados do banco na tela
async function loadDashboard() {
    try {
        const { data: produtos, error } = await supabase
            .from(TABELA_NOME)
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;
        localProducts = produtos || [];
        
        renderTable(localProducts);
        updateCards(localProducts);
        loadHistory();
    } catch (error) {
        console.error('Erro ao carregar dados:', error.message);
    }
}

// Salva ou atualiza a bateria ao enviar o formulário
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value.trim().toLowerCase();
    const quantity = parseInt(document.getElementById('quantity').value);
    const cost = parseFloat(document.getElementById('cost').value);
    const price = parseFloat(document.getElementById('price').value);

    try {
        const { data: existente, error: searchError } = await supabase
            .from(TABELA_NOME)
            .select('*')
            .eq('name', name)
            .maybeSingle();

        if (searchError) throw searchError;

        if (existente) {
            const novaQtd = existente.quantity + quantity;
            const { error: updateError } = await supabase
                .from(TABELA_NOME)
                .update({ quantity: novaQtd, cost, price })
                .eq('id', existente.id);

            if (updateError) throw updateError;
            await registrarHistorico('Entrada', name, quantity, novaQtd);
        } else {
            const { error: insertError } = await supabase
                .from(TABELA_NOME)
                .insert([{ name, category, quantity, cost, price }]);

            if (insertError) throw insertError;
            await registrarHistorico('Cadastro Inicial', name, quantity, quantity);
        }

        productForm.reset();
        loadDashboard();
        alert('Bateria salva com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar:', error.message);
        alert('Erro ao salvar. Verifique o banco de dados.');
    }
});

// Botões de somar (+) ou subtrair (-) estoque
window.alterarQuantidade = async (id, name, atualQtd, valorAlteracao, acaoNome) => {
    const novaQtd = atualQtd + valorAlteracao;
    if (novaQtd < 0) {
        alert('Quantidade insuficiente no estoque!');
        return;
    }

    try {
        const { error } = await supabase
            .from(TABELA_NOME)
            .update({ quantity: novaQtd })
            .eq('id', id);

        if (error) throw error;
        await registrarHistorico(acaoNome, name, Math.abs(valorAlteracao), novaQtd);
        loadDashboard();
    } catch (error) {
        console.error('Erro ao alterar quantidade:', error.message);
    }
};

// Botão de deletar bateria
window.deletarProduto = async (id, name) => {
    if (!confirm(`Remover permanentemente a bateria "${name}"?`)) return;

    try {
        const { error } = await supabase
            .from(TABELA_NOME)
            .delete()
            .eq('id', id);

        if (error) throw error;
        await registrarHistorico('Exclusão', name, 0, 0);
        loadDashboard();
    } catch (error) {
        console.error('Erro ao deletar produto:', error.message);
    }
};

// Mostra os produtos na tabela do HTML
function renderTable(products) {
    productsList.innerHTML = '';
    if (products.length === 0) {
        productsList.innerHTML = `<tr><td colspan="8" style="text-align:center;">Nenhuma bateria em estoque.</td></tr>`;
        return;
    }

    products.forEach(p => {
        const totalValue = p.quantity * p.price;
        const dataFormatada = p.created_at ? new Date(p.created_at).toLocaleString('pt-BR') : '---';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${p.name}</strong></td>
            <td><span class="badge">${p.category}</span></td>
            <td><strong style="font-size:16px;">${p.quantity}</strong></td>
            <td>R$ ${parseFloat(p.cost).toFixed(2)}</td>
            <td>R$ ${parseFloat(p.price).toFixed(2)}</td>
            <td><strong>R$ ${totalValue.toFixed(2)}</strong></td>
            <td style="font-size:12px; color:#94a3b8;">${dataFormatada}</td>
            <td>
                <div class="actions-cell">
                    <button class="btn-action btn-add" onclick="alterarQuantidade(${p.id}, '${p.name}', ${p.quantity}, 1, 'Entrada (+)')">➕</button>
                    <button class="btn-action btn-sub" onclick="alterarQuantidade(${p.id}, '${p.name}', ${p.quantity}, -1, 'Saída (-)')">➖</button>
                    <button class="btn-action btn-delete" onclick="deletarProduto(${p.id}, '${p.name}')">🗑️</button>
                </div>
            </td>
        `;
        productsList.appendChild(tr);
    });
}

// Atualiza os painéis informativos do topo
function updateCards(products) {
    const totalModels = products.length;
    const totalItems = products.reduce((acc, p) => acc + p.quantity, 0);
    const totalValueInvested = products.reduce((acc, p) => acc + (p.quantity * p.cost), 0);

    cardTotalModels.textContent = totalModels;
    cardTotalItems.textContent = `${totalItems} Qtd.`;
    cardTotalValue.textContent = `R$ ${totalValueInvested.toFixed(2)}`;
}

// Registra ações no histórico
async function registrarHistorico(acao, bateria, qtdAlterada, estoqueAtual) {
    try {
        await supabase
            .from('historico')
            .insert([{ acao, bateria, qtd_alterada: qtdAlterada, estoque_atual: estoqueAtual }]);
    } catch (e) {
        console.warn('Histórico indisponível.');
    }
}

// Carrega o histórico na tela
async function loadHistory() {
    try {
        const { data: historico } = await supabase
            .from('historico')
            .select('*')
            .order('id', { ascending: false })
            .limit(50);

        historyList.innerHTML = '';
        if (!historico || historico.length === 0) {
            historyList.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#64748b;">Nenhuma movimentação.</td></tr>`;
            return;
        }

        historico.forEach(h => {
            const dataH = new Date(h.created_at).toLocaleString('pt-BR');
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-size:12px; color:#94a3b8;">${dataH}</td>
                <td><strong>${h.acao}</strong></td>
                <td>${h.bateria}</td>
                <td>${h.qtd_alterada}</td>
                <td>${h.estoque_atual}</td>
            `;
            historyList.appendChild(tr);
        });
    } catch (e) {
        historyList.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#64748b;">Histórico indisponível.</td></tr>`;
    }
}

// Filtro de pesquisa digitada
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = localProducts.filter(p => 
        p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
    );
    renderTable(filtered);
});

// Filtros rápidos por botão
window.filterByPreset = (type) => {
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    if (event) event.target.classList.add('active');

    if (type === 'todos') {
        renderTable(localProducts);
    } else if (type === 'moura' || type === 'heliar') {
        renderTable(localProducts.filter(p => p.name.toLowerCase().includes(type)));
    } else if (type === 'pesada') {
        renderTable(localProducts.filter(p => p.category.includes('maquina') || p.name.toLowerCase().includes('100ah') || p.name.toLowerCase().includes('150ah')));
    } else {
        renderTable(localProducts.filter(p => p.category.includes(type)));
    }
};

window.addEventListener('DOMContentLoaded', loadDashboard);
