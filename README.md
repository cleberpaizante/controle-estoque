# 😁 Sorriso das Baterias — Controle de Estoque

Sistema web para auxiliar o controle de estoque de baterias automotivas, motocicletas, caminhões e outros veículos. Foi desenvolvido para uso em um comércio local, com foco em simplicidade e consulta rápida.

## 🌐 Acesso direto

**[Abrir o sistema](https://cleberpaizante.github.io/controle-estoque/)**

Também é possível acessar o [código-fonte no GitHub](https://github.com/cleberpaizante/controle-estoque).

> **Projeto acadêmico:** demonstra o uso de HTML, CSS, JavaScript, formulários, tabelas, filtros e armazenamento de dados no navegador.

## 🎯 Objetivos

- Reduzir anotações manuais no controle do estoque.
- Cadastrar baterias por modelo e categoria.
- Registrar quantidade, custo e preço de venda.
- Controlar entradas e saídas.
- Exibir indicadores resumidos.
- Pesquisar e filtrar produtos.
- Manter histórico das movimentações.
- Exportar o histórico para Excel.

## ✨ Funcionalidades

### Painel de indicadores

Exibe o total de modelos, a soma das baterias em estoque e o valor total investido, calculado pela quantidade multiplicada pelo custo de cada produto.

### Cadastro

Permite selecionar o modelo, informar categoria, quantidade inicial, preço de custo e preço de venda. Os modelos são organizados em grupos de linha leve, 60 Ah, linha pesada, motocicletas e Start-Stop (EFB/AGM).

### Entradas, vendas e exclusão

Cada produto possui ações para acrescentar unidades (**Entrada**), retirar unidades (**Venda**) e excluir o cadastro após confirmação. As alterações são registradas automaticamente.

### Pesquisa e filtros

O campo de busca localiza produtos pelo nome ou categoria. Os filtros predefinidos facilitam a consulta por grupo ou marca.

### Histórico e exportação

O histórico registra data e hora, ação, modelo, quantidade alterada e estoque final. O botão **Exportar Excel** gera o arquivo `historico_estoque_sorriso.xls`.

A limpeza do histórico solicita senha de administrador e confirmação antes da exclusão definitiva.

> Em um sistema real, a senha não deve ficar exposta no código-fonte. Esta proteção é adequada apenas para uma versão local/demonstrativa.

## 🧰 Tecnologias

- **HTML5:** estrutura da interface.
- **CSS3:** aparência visual e layout responsivo.
- **JavaScript:** regras, cálculos, filtros e exportação.
- **LocalStorage:** persistência dos produtos e do histórico.
- **GitHub Pages:** publicação online.

## ▶️ Como abrir e executar

### Acesso online — recomendado

1. Clique em **[Abrir o sistema](https://cleberpaizante.github.io/controle-estoque/)**.
2. Aguarde o carregamento.
3. Use o formulário **Cadastrar Nova Bateria**.

Não é necessário instalar nada na versão online.

### Acesso local

1. No GitHub, clique em **Code** e escolha **Download ZIP**.
2. Extraia a pasta baixada.
3. Abra o arquivo `index.html` em um navegador.

A aplicação é estática e não exige servidor ou banco de dados para funcionar localmente.

## 🧭 Como utilizar

1. Selecione o modelo e informe a categoria.
2. Preencha quantidade, custo e preço de venda.
3. Clique em **Salvar no Estoque**.
4. Use **Entrada** para acrescentar unidades e **Venda** para retirar unidades.
5. Pesquise ou filtre produtos na tabela.
6. Consulte o histórico e use **Exportar Excel** quando necessário.

## 🗂️ Organização dos arquivos

```text
controle-estoque/
├── index.html   # Interface
├── style.css    # Estilos
├── script.js    # Funcionalidades
└── README.md    # Documentação
```

## 💾 Armazenamento dos dados

O sistema usa o `localStorage` do navegador:

- `sorriso_estoque`: produtos cadastrados.
- `sorriso_historico`: movimentações realizadas.

Os dados ficam salvos no navegador e no dispositivo utilizado. Não são sincronizados automaticamente com outros computadores.

## 🖼️ Imagens da aplicação

### Tela inicial e formulário

![Tela inicial e formulário](Imagem%20Colada.png)

Mostra o título, os indicadores e o cadastro de uma nova bateria.

### Estoque, filtros e histórico

![Estoque, filtros e histórico](Imagem%20Colada%202.png)

Mostra a tabela de estoque, os filtros e a área de histórico de movimentações.

> Outras imagens serão adicionadas após os testes de cadastro, entrada, venda, pesquisa e exportação.

## ⚠️ Regras e limitações

- Não registre venda maior que o estoque disponível.
- Informe os valores corretamente para manter os indicadores confiáveis.
- A exclusão e a limpeza do histórico são ações permanentes.
- O `localStorage` é específico do navegador e do dispositivo.
- Não existe banco de dados centralizado ou login individual.

## 🚀 Melhorias futuras

- Criar uma API e um banco de dados.
- Adicionar autenticação e níveis de acesso.
- Implementar backup e restauração em JSON.
- Criar relatórios e alertas de estoque baixo.
- Adicionar edição de produtos.
- Registrar o usuário responsável por cada movimentação.

## 👤 Autor

Projeto desenvolvido por **Cleber Paizante** para auxiliar o controle de estoque do comércio local.

Repositório: [github.com/cleberpaizante/controle-estoque](https://github.com/cleberpaizante/controle-estoque)
