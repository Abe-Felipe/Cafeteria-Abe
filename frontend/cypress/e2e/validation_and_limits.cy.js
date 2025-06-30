/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Validação de Entradas e Limites', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('[E2E-02] Não deve permitir avançar sem nome de usuário', () => {
    // O botão deve estar desabilitado
    cy.contains('button', 'Montar meu Café').should('be.disabled');
  });

  it('[E2E-03] Não deve permitir avançar sem uma base válida (Espresso ou Leite)', () => {
    cy.get('input[placeholder="Seu nome"]').type('Tester');
    cy.contains('button', 'Montar meu Café').click();

    // Botão "Próximo" deve estar desabilitado inicialmente
    cy.contains('button', 'Próximo').should('be.disabled');
    
    // Seleciona uma base inválida (sozinha)
    cy.contains('.card-title', 'Chocolate').click();
    
    // Botão "Próximo" ainda deve estar desabilitado
    cy.contains('button', 'Próximo').should('be.disabled');
    cy.contains('Para um café, é obrigatório').should('be.visible');
  });

  it('[E2E-04] Deve desabilitar outras opções ao atingir o limite de ingredientes', () => {
    cy.get('input[placeholder="Seu nome"]').type('Limiter');
    cy.contains('button', 'Montar meu Café').click();

    // Seleciona o limite de 3 bases
    cy.contains('.card-title', 'Espresso').click();
    cy.contains('.card-title', 'Leite').click();
    cy.contains('.card-title', 'Chocolate').click();

    // A quarta opção (Sorvete) deve estar desabilitada
    cy.contains('.card-title', 'Sorvete').parents('.card').should('have.class', 'disabled');
  });
});