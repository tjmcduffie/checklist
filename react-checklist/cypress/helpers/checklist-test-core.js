import createItems, {itemTextPrefix} from '../helpers/checklist-create-item';
import 'cypress-jest-adapter';


export default function test(URIPath) {
  describe(`Core functionality`, () => {
    beforeEach(() => {
      cy.visit(URIPath);
    })
    afterEach(() => {
      indexedDB.deleteDatabase("react-checklist");
    });

    it('can load the checklist in a default state', async () => {
      cy.get('.app').should('have.length', 1);
      cy.get('.item').should('have.length', 0);
    });

    it('can create new items', () => {
      createItems(1);

      cy.get('.item')
        .should('have.length', 1)
        .should('contain', itemTextPrefix);
    });

    it('can complete and uncomplete items via click', () => {
      createItems(1);

      cy.get('.item-checkbox-ui')
        .click()
        .should('have.class', 'item-checkbox-ui-complete')
        .nextAll('.item-description-complete')
        .should('have.length', 1);

      cy.get('.item-checkbox-ui-complete')
        .click()
        .should('not.have.class', 'item-checkbox-ui-complete')
        .nextAll('.item-description-complete')
        .should('have.length', 0);
    });

    it('can complete and uncomplete items via checkbox check', () => {
      createItems(1);

      cy.get('input[type="checkbox"]')
        .check({force: true})
        .siblings('.item-checkbox-ui-complete, .item-description-complete')
        .should('have.length', 2);

      cy.get('input[type="checkbox"]')
        .uncheck({force: true})
        .siblings('.item-checkbox-ui-complete, .item-description-complete')
        .should('have.length', 0);
    });

    it('can complete and uncomplete items via SPACE keypress', () => {
      createItems(1);

      cy.get('.item-checkbox-ui')
        .focus()
        .type(' ', {force: true})
        .should('have.class', 'item-checkbox-ui-complete')
        .nextAll('.item-description-complete')
        .should('have.length', 1);

      cy.get('.item-checkbox-ui-complete')
        .focus()
        .type(' ', {force: true})
        .should('not.have.class', 'item-checkbox-ui-complete')
        .nextAll('.item-description-complete')
        .should('have.length', 0);
    });

    it('can complete and uncomplete items via ENTER keypress', () => {
      createItems(1);

      cy.get('.item-checkbox-ui')
        .focus()
        .type('{enter}', {force: true})
        .should('have.class', 'item-checkbox-ui-complete')
        .nextAll('.item-description-complete')
        .should('have.length', 1);

      cy.get('.item-checkbox-ui-complete')
        .focus()
        .type('{enter}', {force: true})
        .should('not.have.class', 'item-checkbox-ui-complete')
        .nextAll('.item-description-complete')
        .should('have.length', 0);
    });

    it('supports persistent data in the browser', () => {
      createItems(2);
      cy.get('.item').should('have.length', 2);

      cy.reload();
      cy.get('.item').should('have.length', 2);
    });
  });
}
