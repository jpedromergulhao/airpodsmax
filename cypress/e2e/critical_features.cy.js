describe('Checkout Flow', () => {
  it('should complete the entire checkout process', () => {
    cy.visit('https://airpodsmax-five.vercel.app/')

    // 1 Add product to bag
    cy.get('.btn[data-color="green"]').click();
    cy.get('.addBtn').click();

    // 2 Go to the bag and verify the product
    cy.get('.bag').click();
    cy.get('.products').should('include.text', 'AirPod Max');

    // 3 Increase the quantity 
    cy.get('.add').click({ force: true });

    // 4 Decrease the quantity
    cy.get('.remove').click();

    // 5 Detele the product
    cy.get('.delete').click();
    cy.get('.products').should('not.exist');

    // 6 back to add again
    cy.get('.shoppingCta').click();
    cy.get('.btn[data-color="blue"]').click();
    cy.get('.addBtn').click();
    cy.get('.bag').click();

    // 7 Go to checkout
    cy.get('.buyBtn').click();

    // 8 Zip code test
    cy.intercept('GET', '**/api/geocode*').as('getLocation'); //alias

    cy.get('#zipCode').type('51020250');
    cy.get('.applyButton').click();
    cy.wait('@getLocation');
    cy.contains('Recife');
    cy.get('.img').should('have.attr', 'src').and('include', 'airpods');
    cy.get('.productName').should('include.text', 'AirPod Max');

    // 9 Continue to adrress section
    cy.get('.deliveryBtn').click();

    // 10 Address section
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#street').type('xzy street, 1212');
    cy.get('#country').should('have.value', 'Brazil');
    cy.get('#zipCode').should('have.value', '51020-250');
    cy.get('#city').should('have.value', 'Recife');
    cy.get('#state').should('have.value', 'Pernambuco');
    cy.get('#email').type('john@gmail.com');
    cy.get('.iti__country-container').click();
    cy.get('.iti__search-input').type('United States');
    cy.get('#iti-0__item-us').click();
    cy.get("#phone").type('9999999999');

    // 11 Continue to payment method section
    cy.get('.contactBtn').click();

    // 12 Insert the card and check the logo
    cy.intercept('GET', '**/api/cardLookup*').as('cardLogo'); //alias

    cy.get('#card').type('4111111111111111'); // Visa
    cy.wait('@cardLogo');
    cy.get('#card').should('have.css', 'background-image').and('match', /Visa-logo\.png/);
    cy.get('#expiration').type('1232');
    cy.get('#cvv').type('121');
    cy.get('#shipAddress').click();
    cy.get('#zipCode').should('have.value', '51020-250');
    
    // 13 Continue to review
    cy.get('.paymentBtn').click();

    // 14 pay
    cy.get('.reviewProdct').should('include.text', 'AirPod Max');
    cy.get('.shipInfo').should('include.text', '51020-250');
    cy.get('.bilInfo').should('include.text', '51020-250');
    cy.get('.payBtn').click();
    cy.get('.popup').should('include.text', '549');
    cy.get('.close').click();

    // 15 Back to main page;
    cy.contains('Pro‑level Active Noise Cancellation with Transparency Mode');
  })
})