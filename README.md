# 🎨 Lumina Art - E-commerce & Galeria Premium

Uma aplicação web completa e sofisticada desenvolvida em **React.js** para a venda de quadros decorativos premium. O projeto atua como uma Landing Page de alta conversão acoplada a um mini E-commerce, possuindo um funil de vendas interativo e uma **Área Administrativa oculta** para gestão do catálogo.

[➡️ Ver Projeto Online](https://https://react-canva-admin.vercel.app/) *(Substitua pelo link real do Vercel/Pages)*

---

## 💻 Sobre o Projeto

O Lumina Art foi projetado para transmitir elegância e exclusividade. A interface utiliza uma paleta de cores sofisticada (Terracota, Oliva e tons pastéis), animações fluidas e uma experiência de usuário (UX) focada em conversão, simulando um fluxo completo de checkout.

### 🌟 Principais Funcionalidades

#### 🛒 Visão do Cliente (E-commerce):
* **Vitrine Dinâmica (Carrossel):** Galeria de quadros com slider de imagens por produto e tags promocionais.
* **Oferta Irresistível:** Seção com gatilho de escassez (Timer de contagem regressiva) e listagem de benefícios.
* **Carrinho de Compras Interativo:** Sistema de adição/remoção de itens com cálculo de estoque.
* **Checkout Simulado em 3 Etapas:** Fluxo de carrinho ➡️ Pagamento Seguro (Pix/Cartão) ➡️ Confirmação de Pedido.
* **Modal Institucional e Vídeo:** Apresentação da marca (Sobre Mim) e modal imersivo de vídeo demonstrativo.
* **Provas Sociais & FAQ:** Carrossel de depoimentos de clientes e seção de perguntas frequentes expansível (Accordion).

#### ⚙️ Visão do Administrador (Painel de Controle):
* **Acesso Restrito:** Tela de login protegida por senha.
* **Upload via Drag & Drop:** Adição de novas obras arrastando imagens do computador, convertidas via `FileReader`.
* **Gerenciamento de Catálogo (CRUD):** Edição em tempo real de Nome, Preço, Estoque e Tags de cada quadro, além da opção de exclusão.
* **Persistência de Dados:** Todo o catálogo e as edições feitas pelo painel são salvas no `localStorage` do navegador.

---

## 🛠️ Tecnologias Utilizadas

* **React.js:** Componentização avançada, gerenciamento de estados (`useState`), efeitos (`useEffect`) e referências (`useRef`).
* **JavaScript (ES6+):** Lógica de carrinho, validação de estoque e manipulação de arquivos (Base64).
* **Lucide React:** Ícones modernos e consistentes.
* **CSS Customizado:** Estilização in-component utilizando variáveis CSS, Flexbox, Grid e animações (`@keyframes`) sem dependência de bibliotecas externas.
* **LocalStorage:** Armazenamento do catálogo de produtos para simular um banco de dados.

---

## 🚀 Como Executar Localmente

Siga os passos abaixo para rodar o projeto na sua máquina:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/MarcosSoftwareEngineering/NOME-DO-REPOSITORIO.git](https://github.com/MarcosSoftwareEngineering/NOME-DO-REPOSITORIO.git)
