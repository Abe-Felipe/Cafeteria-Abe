/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Fluxo de Pedido de Café', () => {
  it('[E2E-01] Deve permitir que um usuário monte um Affogato com Caramelo', () => {
    cy.visit('http://localhost:5173');

    // Etapa 0
    cy.get('input[placeholder="Seu nome"]').type('Felipe');
    cy.contains('button', 'Montar meu Café').click();

    // Etapa 1
    cy.contains('h3', 'Escolha a Base, Felipe').should('be.visible');
    cy.contains('.card-title', 'Espresso').click();
    cy.contains('.card-title', 'Sorvete').click();

    // Valida o resumo (AGORA COM O SELETOR CORRETO)
    cy.get('[data-testid="summary-column"]').contains('Affogato').should('be.visible');
    
    cy.contains('button', 'Próximo').click();

    // Etapa 2
    cy.contains('h3', 'Adicione os Extras').should('be.visible');
    cy.contains('.card-title', 'Caramelo').click();

    // Valida o resumo final (AGORA COM O SELETOR CORRETO)
    cy.get('[data-testid="summary-column"]').contains('Affogato').should('be.visible');
    cy.get('[data-testid="summary-column"]').contains('Caramelo').should('be.visible');

    cy.contains('button', 'Finalizar Pedido').click();

    // Etapa 3
    cy.contains('.modal-title', 'Confirmar Pedido?').should('be.visible');
    cy.get('.modal-body').contains('Affogato').should('be.visible');
    cy.contains('.modal-footer button', 'Confirmar e Fazer Outro').click();
    
    cy.get('h2').contains('Bem-vindo à Cafeteria').should('be.visible');
  });
});