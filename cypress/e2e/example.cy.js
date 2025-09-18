/* describe('ERP Login Test', () => {
  it('Should open login page and submit credentials', () => {
    // Visit the login page
    cy.visit('https://test-utsah.digisecerp.com/TEST-UTSAH/index.jsp');

    // Enter username and password
    cy.get('#userName').type('HITESH.TYAGI');
    cy.get('#password').type('ADMIN');

    // Click the login button
    cy.get('#submitLogin').click();

    // Wait for ERP page to load and check for confirmation
    cy.contains('PURCHASE ORDER').click({ force: true });

  });
}); */

describe('ERP Multi-User Workflow', () => {
  before(() => {
    // Load user credentials from fixture
    cy.fixture('users').as('users');
  });

  it('Logs in with multiple users and navigates Purchase Order', function() {
    this.users.forEach((user) => {
      // Step 1: Login
      cy.loginERP(user.username, user.password);

      // Step 2: Expand sidebar if collapsed
      cy.expandSidebar();

      // Step 3: Navigate Purchase → Purchase Order → Generate PO / Job Work
      cy.contains('PURCHASE', { timeout: 10000 }).click();
      cy.contains('PURCHASE ORDER', { timeout: 10000 }).click();
      cy.contains('GENERATE PO / JOB WORK', { timeout: 10000 }).click();

      // Step 4: Check + Add New button
      cy.contains('+ Add New', { timeout: 10000 }).then(($btn) => {
        if ($btn.is(':visible')) {
          cy.wrap($btn).click();
          cy.log('Clicked + Add New for user:', user.username);
        } else {
          cy.log('+ Add New not visible for user:', user.username);
        }
      });

      // Step 5: Logout for next user
      cy.get('#logoutBtn').click();
      cy.wait(1000); // give time for logout to complete
    });
  });
});

