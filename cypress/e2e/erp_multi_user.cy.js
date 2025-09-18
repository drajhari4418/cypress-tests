describe('ERP Multi-User Workflow', () => {
  let users;

  before(() => {
    // Load users once before tests
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  users?.forEach((user) => {
    it(`Logs in and navigates Purchase Order as ${user.username}`, () => {
      // Step 1: Login
      cy.loginERP(user.username, user.password);

      // Step 2: Expand sidebar if collapsed
      cy.expandSidebar();

      // Step 3: Navigate Purchase → Purchase Order → Generate PO / Job Work
      cy.contains('PURCHASE', { timeout: 10000 }).click();
      cy.contains('PURCHASE ORDER', { timeout: 10000 }).click();
      cy.contains('GENERATE PO / JOB WORK', { timeout: 10000 }).click();

      // Step 4: Verify + Add New button
      cy.contains('+ Add New Generate Po', { timeout: 10000 }).should('be.visible');

      // Step 5: Logout
      cy.get('#logoutBtn', { timeout: 10000 }).should('be.visible').click();
      cy.wait(1000); // give ERP time to return to login
    });
  });
});
