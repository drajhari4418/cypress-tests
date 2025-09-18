const users = require('../fixtures/users.json');

describe('ERP Multi-User Workflow', () => {
  it('Logs in and navigates Purchase Order with multiple users', () => {
    users.forEach((user) => {
      cy.log(`Testing login for: ${user.username}`);

      // Step 1: Login
      cy.loginERP(user.username, user.password);

        // ✅ Wait for login to complete and page to load
  // ✅ Confirm login success by footer text
  cy.contains('footer', 'Tanaashi', { timeout: 15000 }).should('be.visible');

  cy.get('body').should('be.visible'); 

      // Step 2: Expand sidebar if collapsed
      cy.expandSidebar();

      // Step 3: Navigate Purchase → Purchase Order → Generate PO / Job Work
      cy.contains('PURCHASE', { timeout: 10000 }).click();
      cy.contains('PURCHASE ORDER', { timeout: 10000 }).click();
      cy.contains('GENERATE PO / JOB WORK', { timeout: 10000 }).click();

      // Step 4: Verify + Add New button
cy.contains('+ Add New', { timeout: 10000 }).should('be.visible');


      // Step 5: Logout
      cy.get('#logoutBtn', { timeout: 10000 }).should('be.visible').click();
      cy.wait(1000);
    });
  });
});
