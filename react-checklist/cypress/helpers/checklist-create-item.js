
export const itemTextPrefix = 'this is a test';

export default function createItems(n = 1, text) {
  let i = 0;
  while (i < n) {
    cy.get('.create-item-input').type(text || `${itemTextPrefix} ${i}`);
    cy.get('button[type="submit"]').click();
    i++;
  }
}
