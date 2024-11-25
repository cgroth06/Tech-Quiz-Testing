

describe('Quiz Application', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/questions/random', { fixture: 'mockQuestions.json' }).as('getQuestions');
      cy.visit('/');
    });
  
    it('displays the start button initially', () => {
      cy.contains('Start Quiz').should('exist');
    });
  
    it('starts the quiz and fetches questions', () => {
      cy.contains('Start Quiz').click();
      cy.wait('@getQuestions');
      cy.get('.card').should('contain.text', 'What is 2 + 2?');
    });
  
    it('allows answering questions', () => {
      cy.contains('Start Quiz').click();
      cy.wait('@getQuestions');
  
      // Select the correct answer for the first question
      cy.contains('4').click();

      // Select the correct answer for the second question
    // Here is Where I am stuck...
    //   cy.get('.card').should('contain.text', 'What is python?');
    //   cy.contains('A Programming Language').click();

    });
  
    it('completes the quiz and displays the final score', () => {
      cy.contains('Start Quiz').click();
      cy.wait('@getQuestions');
  
      // Finished the quiz
      cy.get('.btn-primary').each(($btn, index) => {
        if (index % 2 === 0) cy.wrap($btn).click(); // Select the first answer for each question
      });
  
      // Verify completion screen
      cy.get('.card').should('contain.text', 'Quiz Completed');
      cy.get('.alert-success').should('contain.text', 'Your score:');
    });

  });
  