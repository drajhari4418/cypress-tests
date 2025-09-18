// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('loginERP', (username, password) => {
  cy.visit('https://test-utsah.digisecerp.com/TEST-UTSAH/index.jsp');

  // Ensure login form is visible before typing
  cy.get('#userName', { timeout: 10000 }).should('be.visible').type(username);
  cy.get('#password', { timeout: 10000 }).should('be.visible').type(password);
  cy.get('#submitLogin').should('be.visible').click();

  // Wait for redirect after login
  cy.url({ timeout: 15000 }).should('include', '/welcome.action');
});

Cypress.Commands.add('expandSidebar', () => {
  cy.get('#sidebarToggle').then(($toggle) => {
    if ($toggle.is(':visible')) {
      $toggle.click();
    }
  });
});

