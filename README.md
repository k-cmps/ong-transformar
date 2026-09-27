# ONG Transformar — projeto acadêmico

Site demonstrativo de uma ONG fictícia, desenvolvido para praticar HTML5, CSS3 e JavaScript. **Não representa uma organização real e não recebe doações ou cadastros.**

## Funcionalidades
- Três páginas: Início, Projetos e Cadastro.
- HTML semântico, navegação por teclado, rótulos de formulário e mensagens de erro.
- Layout com Grid de 12 colunas, Flexbox e cinco breakpoints: 1100, 900, 700, 520 e 380 px.
- Menu móvel e alternância de tema claro/escuro, com preferência salva no `localStorage`.
- Cartões de projetos gerados via DOM a partir de dados JavaScript.
- Validação de formulário e modal de confirmação **sem envio ou armazenamento de dados pessoais**.

## Estrutura
```
ong-transformar-final/
├── index.html
├── projetos.html
├── cadastro.html
├── css/style.css
├── js/main.js
├── imagens/ong-social.jpg
└── README.md
```

## Executar localmente
Abra `index.html` no navegador. Para desenvolvimento, você também pode abrir a pasta no VS Code e usar Live Server. Não há dependências, bundler ou etapa de build.

## Publicação
Envie o conteúdo da pasta ao repositório GitHub e configure **Settings > Pages > Deploy from a branch > main > / (root)**. Os links são relativos para funcionar em um endereço de projeto do GitHub Pages. A publicação não foi realizada automaticamente.

## Validação
Os arquivos devem ser submetidos individualmente ao [Nu HTML Checker](https://validator.w3.org/nu/). Faça também testes manuais de teclado, formulário e viewport. Não há alegação de aprovação W3C ou de auditoria WCAG sem teste externo.

## Limitações
Este projeto é **multipágina**, não SPA. CPF, telefone e CEP são validados quanto ao formato, não à existência real; o formulário não transmite nem persiste dados. O endereço e a ONG são fictícios. Não foi feita medição de minificação, desempenho ou CI/CD. O arquivo de imagem é JPEG otimizado para demonstração.
