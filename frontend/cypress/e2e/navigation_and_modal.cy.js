/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Navegação e Interações do Modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Seu nome"]').type('Navegador');
    cy.contains('button', 'Montar meu Café').click();
  });

  it('[E2E-05] Deve manter a seleção de base ao clicar em Voltar', () => {
    // Seleciona base
    cy.contains('.card-title', 'Espresso').click();
    cy.contains('.card-title', 'Leite').click();
    cy.contains('button', 'Próximo').click();

    // Na tela de extras, clica em Voltar
    cy.contains('h3', 'Adicione os Extras').should('be.visible');
    cy.contains('button', 'Voltar').click();

    // Verifica se a seleção de base foi mantida
    cy.contains('.card-title', 'Espresso').parents('.card').should('have.class', 'selected');
    cy.contains('.card-title', 'Leite').parents('.card').should('have.class', 'selected');
  });

  it('[E2E-06] Deve fechar o modal de confirmação ao clicar em Cancelar', () => {
    // Passa por todo o fluxo
    cy.contains('.card-title', 'Espresso').click();
    cy.contains('button', 'Próximo').click();
    cy.contains('button', 'Finalizar Pedido').click();

    // O modal deve estar visível
    cy.contains('.modal-title', 'Confirmar Pedido?').should('be.visible');

    // Clica em Cancelar
    cy.contains('.modal-footer button', 'Cancelar').click();

    // O modal não deve mais estar visível
    cy.get('.modal-title').should('not.exist');
    // E devemos continuar na tela de extras
    cy.contains('h3', 'Adicione os Extras').should('be.visible');
  });
});