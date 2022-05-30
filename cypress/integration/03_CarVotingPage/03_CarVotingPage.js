import {Given, When, Then, And, Before, After} from "cypress-cucumber-preprocessor/steps";

Before(()=>{
    cy.visit('/')
})

Given ('A newly registered user opens the website', () =>{
    cy.fixture('userProfiles').then(userProfile=>{
        userProfile.forEach(user => {
            if (user.name=="newUser"){
                cy.wrap(user.username).as("username")
                cy.wrap(user.password).as("password")
                cy.wrap(user.firstName).as("firstName")
                cy.wrap(user.lastName).as("lastName")
            }
        }
    )
    })
    
    //click register button
    cy.get('a[href*="/register"]').click()

    //create a  new user to vote
    const ranId = () => Cypress._.random(0, 1e6)
    const id = ranId()
    var newUsername 
    cy.get('@username').then((username) => {
        newUsername = username+id
        cy.get('input[name=username]').type(newUsername)
        cy.wrap(newUsername).as("username")
    })
    cy.get('@firstName').then((firstName) => {
        cy.get('input[name=firstName]').type(firstName)
    })
    cy.get('@lastName').then((lastName) => {
        cy.get('input[name=lastName]').type(lastName)
    })
    var newPassword = "Ab"+id+"!"
    cy.wrap(newPassword).as("password")
    cy.contains("Register with Buggy Cars Rating").parent('div')
    .within(() => {
        cy.get('input[name=password]').type(newPassword)
        cy.get('input[name=confirmPassword]').type(newPassword)
        cy.get('button').contains("Register").click()
    })
    
    //login with new user
    cy.get('div').contains("Registration is successful")
    cy.get('div').contains("Buggy Rating").click()
    cy.get("@username").then((username) => {
        cy.get('input[name=login]').type(username)
    })
    cy.get("@password").then((password) => {
        cy.get('input[name=password]').type(password)
    })
    
    //click the login button
    cy.get('button[type="submit"]').click()
})

When ('The user clicks on the current Popular Model on homepage', () => {
    cy.contains("Popular Model").parent('div')
    .within(() => {
        cy.get('img').click()
    })
})

And ('The user types a comment to vote', () => {
    //store number of votes to verify count after comment added
    cy.intercept('GET', '/prod/models/*').as('route');
    cy.wait(['@route'])
    cy.contains("Specification").parent('div').parent('div').parent('div')
    .within(() => {
        cy.get('h4').contains("Votes: ").then(($h4) => {
            var voteCountStr = $h4.text().replace("Votes: ", "")
            cy.wrap(voteCountStr).as("oldVoteCountStr")
        })
    })
    const ranId = () => Cypress._.random(0, 1e3)
    const id = ranId()
    var messageString = "This car is the most popular model today." + id
    cy.wrap(messageString).as("messageString")
    cy.get('textarea').type(messageString)
    cy.get('button').contains("Vote!").click()
})

Then ('The user can see their comment and the vote count is incremented up',()=>{
    cy.get('@messageString').then((messageString) => {
        cy.contains(messageString)
    })

    cy.intercept('GET', '/prod/models/*').as('route');
    cy.wait(['@route'])
    cy.contains("Specification").parent('div').parent('div').parent('div')
    .within(() => {
        cy.get('h4').contains("Votes: ").then(($h4) => {
            var voteCountStr = $h4.text().replace("Votes: ", "")
            cy.get('@oldVoteCountStr').then((oldVoteCountStr) => {
                expect(parseInt(voteCountStr)).to.be.greaterThan(parseInt(oldVoteCountStr))
            })
        })
    })
})
    
