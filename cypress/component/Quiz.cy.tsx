
import Quiz from '../../client/src/components/Quiz'
import { mount } from 'cypress/react18'


describe('<Quiz />', () => {
  it('renders the start button initially', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').should('exist');
  });

  it('fetches and displays questions when started', () => {
    cy.fixture('mockQuestions').then((mockQuestions) => {
      cy.intercept('GET', '/api/questions/random', { body: mockQuestions }).as('getQuestions');
    });
    mount(<Quiz />);
  
    // Start the quiz
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
  
    // Verify first question is displayed
    cy.contains('What is 2 + 2?').should('exist');
    cy.contains('4').should('exist');
  });

});
