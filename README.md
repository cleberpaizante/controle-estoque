
## 🗂️ Organização dos arquivos

```text
controle-estoque/
├── index.html   # Estrutura da interface
├── style.css    # Estilos e responsividade
├── script.js    # Regras e funcionalidades
└── README.md    # Documentação do projeto
```

## 💾 Armazenamento dos dados

O sistema utiliza o `localStorage` do navegador:

- `sorriso_estoque`: armazena os produtos cadastrados.
- `sorriso_historico`: armazena as movimentações realizadas.

Os dados ficam salvos no navegador e no dispositivo utilizado. Eles não são compartilhados automaticamente com outros computadores ou usuários.

Para evitar perda de informações, mantenha o arquivo exportado do histórico, use sempre o mesmo navegador e faça backups periódicos.

## 🖼️ Imagens da aplicação

As imagens devem ser adicionadas ao repositório na pasta `docs/screenshots/`.

### Tela inicial e indicadores

![Tela inicial do sistema](docs/screenshots/01-tela-inicial.png)

Mostra o título, os indicadores de modelos, unidades e valor investido.

### Cadastro de uma bateria

![Formulário de cadastro](docs/screenshots/02-cadastro-bateria.png)

Mostra o formulário preenchido antes de cadastrar um produto.

### Produto cadastrado

![Produto cadastrado](docs/screenshots/03-produto-cadastrado.png)

Mostra a bateria cadastrada e os botões de entrada, venda e exclusão.

### Entrada e venda

![Movimentações do estoque](docs/screenshots/04-movimentacoes.png)

Mostra o estoque após acrescentar unidades e registrar uma venda.

### Pesquisa e filtros

![Pesquisa e filtros](docs/screenshots/05-pesquisa-filtros.png)

Mostra uma consulta utilizando o campo de pesquisa ou um filtro predefinido.

### Histórico e exportação

![Histórico de movimentações](docs/screenshots/06-historico-exportacao.png)

Mostra os registros de cadastro, entrada e venda e a opção de exportar para Excel.

## ⚠️ Regras e cuidados

- A quantidade de venda não deve ser maior que o estoque disponível.
- Informe os valores corretamente para que os indicadores sejam confiáveis.
- A exclusão deve ser realizada somente quando não houver necessidade de manter o cadastro.
- A limpeza do histórico é permanente.
- O `localStorage` é específico do navegador e do dispositivo.

## 🚧 Limitações e melhorias

### Limitações atuais

- Não existe banco de dados centralizado.
- Não há login individual para usuários.
- Os dados não são sincronizados entre dispositivos.
- A aplicação depende do navegador para manter o armazenamento local.
- A senha de administrador está no código e não deve ser usada como segurança em produção.

### Melhorias futuras

- Criar uma API e um banco de dados.
- Adicionar autenticação e níveis de acesso.
- Sincronizar dados entre computadores e celulares.
- Implementar backup e restauração em JSON.
- Criar relatórios de vendas e produtos com estoque baixo.
- Adicionar edição de produtos cadastrados.
- Registrar o usuário responsável por cada movimentação.
- Publicar a aplicação em servidor com HTTPS.

## 👤 Autor

Projeto desenvolvido por **Cleber Paizante** para auxiliar o controle de estoque do comércio local.

Repositório: [github.com/cleberpaizante/controle-estoque](https://github.com/cleberpaizante/controle-estoque)
