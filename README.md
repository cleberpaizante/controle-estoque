# 😁 Sorriso das Baterias — Controle de Estoque

Sistema web para auxiliar o controle de estoque de baterias automotivas, motocicletas, caminhões e outros veículos. O projeto foi desenvolvido para uso em um comércio local, com foco em simplicidade, rapidez e facilidade de consulta.

## 🌐 Acesso direto

A aplicação está disponível em: **[Abrir o sistema](https://cleberpaizante.github.io/controle-estoque/)**

Também é possível acessar o código-fonte pelo [repositório no GitHub](https://github.com/cleberpaizante/controle-estoque).

> **Projeto acadêmico:** demonstra o uso de HTML, CSS, JavaScript, formulários, tabelas, filtros e armazenamento de dados no navegador.

## 📌 Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Objetivos](#objetivos)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Como abrir e executar](#como-abrir-e-executar)
- [Como utilizar](#como-utilizar)
- [Armazenamento dos dados](#armazenamento-dos-dados)
- [Imagens](#imagens-da-aplicação)
- [Limitações e melhorias](#limitações-e-melhorias)

## 📖 Sobre o projeto

O sistema permite cadastrar modelos de bateria, controlar entradas e vendas, consultar quantidades atuais e acompanhar o histórico das movimentações. As informações são atualizadas na tela e ficam salvas no navegador utilizado.

## 🎯 Objetivos

- Reduzir anotações manuais no controle do estoque.
- Cadastrar baterias por modelo e categoria.
- Registrar quantidade, custo de aquisição e preço de venda.
- Controlar entradas e saídas.
- Exibir indicadores resumidos do estoque.
- Pesquisar e filtrar produtos.
- Manter histórico das movimentações.
- Exportar o histórico para uma planilha compatível com Excel.

## ✨ Funcionalidades

### Painel de indicadores

Exibe o total de modelos, a soma das baterias em estoque e o valor total investido, calculado pela quantidade multiplicada pelo custo de cada produto.

### Cadastro de baterias

Permite selecionar o modelo, informar a categoria, a quantidade inicial, o preço de custo e o preço de venda. Os modelos são organizados em grupos de linha leve, 60 Ah, linha pesada, motocicletas e Start-Stop (EFB/AGM).

### Entradas, vendas e exclusão

Cada produto possui ações para acrescentar unidades (**Entrada**), retirar unidades (**Venda**) e excluir o cadastro após confirmação. As alterações são registradas automaticamente.

### Pesquisa e filtros

O campo de busca localiza produtos pelo nome ou categoria. Os filtros predefinidos ajudam a consultar grupos de produtos rapidamente.

### Histórico permanente

Registra data e hora, ação realizada, modelo, quantidade alterada e estoque final. As ações identificadas são cadastro, entrada, venda e exclusão.

### Exportação e limpeza

**Exportar Excel** gera o arquivo `historico_estoque_sorriso.xls`. A limpeza do histórico solicita senha de administrador e confirmação antes da exclusão definitiva.

> Em um sistema real, a senha não deve ficar exposta no código-fonte. Esta proteção é adequada apenas para uma versão local/demonstrativa.

## 🧰 Tecnologias

- **HTML5:** estrutura da interface e dos formulários.
- **CSS3:** aparência visual e layout responsivo.
- **JavaScript:** regras de negócio, cálculos, filtros e exportação.
- **LocalStorage:** persistência dos produtos e do histórico.
- **GitHub Pages:** publicação da aplicação online.

## ▶️ Como abrir e executar

### Acesso online — recomendado

1. Clique em **[Abrir o sistema](https://cleberpaizante.github.io/controle-estoque/)**.
2. Aguarde a página carregar.
3. Use o formulário **Cadastrar Nova Bateria** para começar.

Não é necessário instalar nada para usar a versão online.

### Acesso local

1. Clique em **Code** no GitHub.
2. Escolha **Download ZIP** e extraia o arquivo, ou clone o repositório.
3. Abra a pasta extraída.
4. Abra o arquivo `index.html` em um navegador.
5. O sistema será carregado localmente.

A aplicação é estática e não exige servidor ou banco de dados para funcionar localmente.

## 🧭 Como utilizar

### Cadastrar um produto

1. Acesse **Cadastrar Nova Bateria**.
2. Selecione o modelo e informe a categoria.
3. Preencha quantidade, custo e preço de venda.
4. Clique em **Salvar no Estoque**.
5. Confirme o produto na tabela e no histórico.

### Registrar entrada ou venda

1. Localize o produto na tabela.
2. Clique em **Entrada** ou **Venda**.
3. Informe a quantidade e confirme.
4. Verifique o novo saldo e o histórico.

### Pesquisar e exportar

Digite um nome ou categoria na busca, ou selecione um filtro. Para exportar, role até **Histórico Permanente de Movimentações** e clique em **Exportar Excel**.

## 🗂️ Organização dos arquivos

```text
controle-estoque/
├── index.html   # Estrutura da interface
├── style.css    # Estilos e responsividade
├── script.js    # Regras e funcionalidades
└── README.md    # Documentação do projeto
```

## 💾 Armazenamento dos dados

O sistema usa o `localStorage` do navegador:

- `sorriso_estoque`: produtos cadastrados.
- `sorriso_historico`: movimentações realizadas.

Os dados ficam salvos no navegador e no dispositivo utilizado. Por isso, não são sincronizados automaticamente com outros computadores. Para evitar perdas, mantenha os arquivos exportados e use sempre o mesmo navegador e perfil.

## 🖼️ Imagens da aplicação

As capturas serão adicionadas em `docs/screenshots/` conforme o sistema for documentado:

- `01-tela-inicial.png` — painel e indicadores.
- `02-cadastro-bateria.png` — formulário preenchido.
- `03-produto-cadastrado.png` — produto na tabela.
- `04-movimentacoes.png` — entrada e venda.
- `05-pesquisa-filtros.png` — busca e filtros.
- `06-historico-exportacao.png` — histórico e exportação.

## ⚠️ Regras e cuidados

- Não registre uma venda maior que o estoque disponível.
- Informe os valores corretamente para manter os indicadores confiáveis.
- A exclusão de um produto e a limpeza do histórico são ações permanentes.
- O `localStorage` é específico do navegador e do dispositivo.

## 🚧 Limitações e melhorias

### Limitações atuais

- Não existe banco de dados centralizado.
- Não há login individual.
- Os dados não são sincronizados entre dispositivos.
- A senha de administrador está no código e não deve ser usada como segurança em produção.

### Melhorias futuras

- Criar uma API e um banco de dados.
- Adicionar autenticação e níveis de acesso.
- Implementar backup e restauração em JSON.
- Criar relatórios e alertas de estoque baixo.
- Adicionar edição de produtos.
- Registrar o usuário responsável por cada movimentação.
- Publicar a aplicação com HTTPS.

## 👤 Autor

Projeto desenvolvido por **Cleber Paizante** para auxiliar o controle de estoque do comércio local.

Repositório: [github.com/cleberpaizante/controle-estoque](https://github.com/cleberpaizante/controle-estoque)
