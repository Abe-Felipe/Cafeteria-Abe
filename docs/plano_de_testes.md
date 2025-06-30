# Plano de Testes - Projeto Cafeteria

## 1. Estratégia de Testes

Dada a natureza da aplicação e o prazo, a estratégia adotada prioriza a automação dos fluxos críticos do usuário e a garantia da integridade das regras de negócio principais. A abordagem será a seguinte:

1.  **Testes E2E (Caixa-Preta):** Focar no "caminho feliz" principal: um usuário que monta um café com sucesso. Isso garante que a integração entre frontend e backend está funcionando no fluxo de maior valor.
2.  **Testes de API (Caixa-Preta/Cinza):** Garantir que os contratos do backend estão estáveis, principalmente o endpoint de busca de ingredientes, que é a base para o funcionamento do frontend.
3.  **Testes Unitários (Caixa-Branca):** Focar nas regras de negócio mais complexas e críticas, como a função que identifica o nome do café a partir dos ingredientes.
4.  **Testes Manuais Exploratórios:** Executar testes manuais para identificar bugs de usabilidade e visuais não cobertos pela automação.

## 2. Categorias de Testes Executadas (RQNF16)

- **Testes Funcionais:**
  - Testes de Unidade
  - Testes de API (Integração de Componentes)
  - Testes End-to-End (E2E)
- **Testes Não Funcionais:**
  - Testes de Usabilidade (Manuais)

## 3. Casos de Teste (Exemplos)

| ID      | Título do Teste                                                   | Categoria | Tipo de Teste (RQNF15) | Prioridade |
| :------ | :---------------------------------------------------------------- | :-------- | :--------------------- | :--------- |
| E2E-01  | Montar um café clássico (Latte) com um adicional                  | E2E       | Caixa-Preta            | Alta       |
| API-01  | Obter a lista de todos os ingredientes com sucesso (200 OK)       | API       | Caixa-Preta            | Alta       |
| UNIT-01 | Identificar corretamente o nome "Latte" a partir dos ingredientes | Unitário  | Caixa-Branca           | Alta       |
| UNIT-02 | Retornar "Café Personalizado" para combinações não clássicas      | Unitário  | Caixa-Branca           | Média      |
| MAN-01  | Validar visualmente o estado de seleção dos cards                 | Manual    | Caixa-Preta            | Média      |
