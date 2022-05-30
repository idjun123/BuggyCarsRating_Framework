import {Given, When, Then, And, Before, After} from "cypress-cucumber-preprocessor/steps";

Before(()=>{
    cy.visit('/')
})

Given ('A logged in user opens the website', () =>{
    cy.fixture('userProfiles').then(userProfile=>{
        userProfile.forEach(user => {
            if (user.name=="validUser"){
                cy.wrap(user.username).as("username")
                cy.wrap(user.password).as("password")
            }
        }
    )
    })
    cy.get("@username").then((username) => {
        cy.get('input[name=login]').type(username)
    })
    cy.get("@password").then((password) => {
        cy.get('input[name=password]').type(password)
    })
    //click the login button
    cy.get('button[type="submit"]').click()
})

When ('The user clicks on the image for Overall Rating', () =>{
    cy.get('a[href*="/overall"]').click()
})

Then ('The user can see the page with the table of rankings displayed', () =>{
    cy.get('.table').should('be.visible')
})

And ('The user clicks on the table header rank to sort the table', () => {
    cy.intercept('GET', '/prod/models*').as('route');
    cy.get('thead').get("th:nth-child(4)").contains('Rank').click()
    cy.wait(['@route'])
})

Then('The user can see the rankings displayed in the correct order', ()=> {
    
    var i = 1;
    cy.get('table tbody td:nth-child(4)').each(($el) => {
        assert.equal($el.text(), i.toString())
        i += 1
    })
})

And ('The user clicks on the table header model to sort the table', () => {
    cy.intercept('GET', '/prod/models*').as('route');
    cy.get('thead').get("th:nth-child(3)").contains('Model').click()
    cy.wait(['@route'])
})

Then('The user can see the models displayed in the correct order', ()=> {
    var modelArr = [];
    cy.get('table tbody td:nth-child(3)').each(($el, index) => {
        modelArr[index] = $el.text()
    })
    .then(() => {
        expect(modelArr).to.deep.equal(modelArr.sort())
    })
})