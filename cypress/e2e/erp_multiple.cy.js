// cypress/e2e/erp_multiple.cy.js
const users = require('../fixtures/users.json');

describe('ERP Multi-User Workflow', () => {

  users.forEach((user) => {
    it(`Logs in and navigates Purchase Order as ${user.username}`, () => {

      // Step 1: Login
      cy.loginERP(user.username, user.password);

      // ✅ Confirm login by checking footer text
      cy.contains('footer', 'Tanaashi', { timeout: 15000 }).should('be.visible');

      // Step 2: Expand sidebar if collapsed (safe version)
      cy.get('body').then(($body) => {
        if ($body.find('#sidebarToggle').length > 0) {
          cy.get('#sidebarToggle', { timeout: 5000 }).then(($toggle) => {
            if ($toggle.is(':visible')) {
              cy.wrap($toggle).click();
            } else {
              cy.log('Sidebar already expanded');
            }
          });
        } else {
          cy.log('Sidebar toggle not found – skipping');
        }
      });

      // Step 3: Navigate Purchase → Purchase Order → Generate PO / Job Work
      cy.contains('PURCHASE', { timeout: 10000 }).click();
      cy.contains('PURCHASE ORDER', { timeout: 10000 }).click();
      cy.contains('GENERATE PO / JOB WORK', { timeout: 10000 }).click();

      // Step 4: Wait for the container that holds the + Add New button
      // Replace '#addDetails' with the actual container ID or class
      cy.get('#addDetails', { timeout: 15000 }).should('be.visible');

      // Step 5: Find and click + Add New button
      // Using regex to match dynamically rendered button text
      cy.get('#addDetails', { timeout: 15000 })
        .find('button, a, span') // search common elements that may contain the button
        .contains(/\+ Add New/i)
        .should('be.visible')
        .click();

      cy.log(`Clicked + Add New for user: ${user.username}`);

      // Step 6: Logout
      cy.get('#logoutBtn', { timeout: 10000 }).should('be.visible').click();
      cy.wait(1000); // give ERP time to return to login page
    });
  });

});
