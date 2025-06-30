# Processo seletivo - QA - Resolução Final

Abaixo estão as instruções para execução e avaliação do projeto desenvolvido, que implementa todos os requisitos funcionais e não funcionais solicitados no desafio.

## 📋 Tabela de Conteúdos

1. [✨ Funcionalidades Implementadas](#1--funcionalidades-implementadas)
2. [🛠️ Tecnologias e Arquitetura](#2--tecnologias-e-arquitetura)
3. [🚀 Como Executar o Projeto](#3--como-executar-o-projeto)
4. [✅ Qualidade e Processo de Testes](#4--qualidade-e-processo-de-testes)
5. [📄 Documentação de Qualidade Adicional](#5--documentação-de-qualidade-adicional)

---

## 1. ✨ Funcionalidades Implementadas

- **Seleção de Ingredientes:** Interface intuitiva para seleção de ingredientes base e extras.
- **Validação de Limites:** O sistema impõe limites de seleção (máx. 3 bases, máx. 2 extras) em tempo real.
- **Identificação de Receitas:** Reconhecimento automático de 7 receitas de cafés clássicos com base na combinação de ingredientes.
- **Cálculo de Preço:** O preço total do pedido é calculado e atualizado dinamicamente na tela.
- **Segurança da API:** O acesso ao backend é protegido por uma chave de API (`API Key`), impedindo acesso público não autorizado.
- **Fluxo de Múltiplas Etapas:** O processo de montagem é dividido em etapas claras (Base → Extras → Confirmação) guiadas por um indicador de progresso visual (Stepper).
- **Opção de Limpar Seleção:** Botões para limpar as seleções em cada etapa, melhorando a usabilidade.
- **Ambiente Containerizado:** Aplicação 100% containerizada com Docker, garantindo portabilidade e um ambiente de execução consistente.

_Observação: Todos os requisitos **indispensáveis** (funcionais e não funcionais) do desafio foram implementados. O único item **diferencial** não abordado foi o relatório SonarQube (RQNF12)._

---

## 2. 🛠️ Tecnologias e Arquitetura

O projeto segue uma arquitetura de microsserviços desacoplada com três componentes principais:

- **Frontend:** Construído com **React** e **Vite** para uma interface reativa e de rápido desenvolvimento. A biblioteca **React-Bootstrap** foi utilizada para componentização visual e o **Axios** para comunicação com o backend.
- **Backend:** Uma API RESTful desenvolvida em **Node.js** com o framework **Express**. As interações com o banco de dados são gerenciadas pelo Query Builder **Knex.js**, que também controla as _migrations_ e _seeds_.
- **Banco de Dados:** **PostgreSQL**, executado em seu próprio contêiner Docker para isolamento e consistência.
- **Testes:**
  - **Cypress:** Para testes **E2E**, simulando o fluxo real do usuário no navegador de ponta a ponta.
  - **Jest** & **Supertest**: Para testes de **API** e **Unitários** no backend.
- **Versionamento:**
  - **Git** & **GitHub**: Para controle de versão e entrega do código-fonte.

---

## 3. 🚀 Como Executar o Projeto

### **Método 1: Docker (Recomendado)**

Este é o método mais simples e garante que o ambiente seja idêntico ao de desenvolvimento.

**Pré-requisitos:**

- Docker
- Docker Compose

**Execução:**

1.  Clone o repositório.
2.  Na pasta `backend`, crie um arquivo `.env` a partir do `.env.example`, preenchendo a `DB_PASSWORD`.
3.  Na pasta raiz do projeto, execute o seguinte comando:
    ```bash
    docker-compose up --build
    ```
4.  A aplicação frontend estará disponível em **`http://localhost:8080`**.

### **Método 2: Localmente (Sem Docker)**

<details>
<summary>Clique para expandir as instruções de execução local</summary>

#### **Backend**

1.  **Navegue até a pasta `backend`**: `cd backend`
2.  **Instale as dependências**: `npm install`
3.  **Configure o banco de dados**:
    - Garanta que o PostgreSQL esteja rodando localmente.
    - Crie um banco de dados chamado `cafeteria_db`.
    - Crie o arquivo `.env` a partir do `.env.example` com suas credenciais.
4.  **Rode as Migrations e Seeds**:
    ```bash
    npx knex migrate:latest
    npx knex seed:run
    ```
5.  **Inicie o servidor**: `npm run dev`. O servidor rodará em `http://localhost:4000`.

#### **Frontend**

1.  **Navegue até a pasta `frontend`**: `cd frontend`
2.  **Instale as dependências**: `npm install`
3.  **Inicie a aplicação**: `npm run dev`. A aplicação rodará em `http://localhost:5173`.
</details>

---

## 4. ✅ Qualidade e Processo de Testes

A qualidade foi um pilar central neste projeto, com uma estratégia de testes multifacetada para garantir a robustez.

### **Estratégia de Testes**

A abordagem de testes foi focada em cobrir as camadas mais críticas da aplicação:

- **Testes Unitários (Caixa-Branca):** Para validar as regras de negócio puras e isoladas.
- **Testes de API (Caixa-Preta/Cinza):** Para garantir a estabilidade e o contrato dos endpoints do backend.
- **Testes E2E (End-to-End, Caixa-Preta):** Para validar os fluxos críticos do usuário do início ao fim.

### **Executando os Testes Automatizados**

- **Backend (Jest & Supertest):**
  - Na pasta `backend`, rode o comando:
    ```bash
    npm test
    ```
- **Frontend (Cypress):**
  - Garanta que a aplicação frontend esteja rodando.
  - Na pasta `frontend`, rode o comando `npx cypress open` e selecione os testes na interface.

---

## 5. 📄 Documentação de Qualidade Adicional

Para complementar o processo de QA, os seguintes artefatos foram produzidos:

- **Plano de Testes:** Detalha a estratégia, escopo e casos de teste.
  - **Localização:** [`./docs/PLANO_DE_TESTES.md`](./docs/PLANO_DE_TESTES.md)
- **Especificações Gherkin:** Descreve o comportamento esperado da aplicação em linguagem natural.
  - **Localização:** [`./docs/gherkin/montar_cafe.feature`](./docs/gherkin/montar_cafe.feature)
- **Relatório de Bug (Exemplo):** Um exemplo de bug identificado durante os testes manuais.
  - **ID:** BUG-001
  - **Título:** A mensagem de validação de base não desaparece após a correção do usuário.
  - **Status:** Identificado. A correção envolveria adicionar um `useEffect` para limpar a mensagem de erro quando a condição de validação mudasse.
- **Revisão de Código (Melhorias Futuras):**
  - **Gerenciamento de Estado:** Para aplicações mais complexas, a migração do estado do `App.jsx` para uma biblioteca como **Zustand** ou **Redux Toolkit** é recomendada.
  - **Estilização:** Adoção de **Módulos CSS** para escopar os estilos por componente e evitar conflitos.
