import {Given, When, Then, And, Before, After} from "cypress-cucumber-preprocessor/steps";

Before(()=>{
    cy.visit('/')

})

Given('A new user opens the website', ()=>{
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
})})

When('The user types username and password and clicks Login', () =>{
    //type in username and password
    cy.get("@username").then((username) => {
        cy.get('input[name=login]').type(username)
    })
    cy.get("@password").then((password) => {
        cy.get('input[name=password]').type(password)
    })
    //click the login button
    cy.get('button[type="submit"]').click()
})

Then('The user can see a message that the account does not exist', () =>{
    //verify that the new user can see that their account does not exist
    cy.get('span').contains("Invalid username/password")
})

Given('A registered user opens the website', ()=>{
    cy.wrap(Cypress.env('username')).as("username")
    cy.wrap(Cypress.env('password')).as("password")
    cy.wrap(Cypress.env('firstName')).as("firstName")
})

Then ('The user can see that they are logged in',() =>{
    cy.get('@firstName').then((firstName) => {
        cy.get('span').contains(firstName)
    })
})

When ('The user clicks on the Register button', () => {
    cy.get('a[href*="/register"]').click()
})

And  ('The user enters all the details required and clicks Submit', () => {
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
    
})

And ('The user logs in and in Profile edits the details', () => {
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
    cy.get('@firstName').then((firstName) => {
        cy.get('span').contains(firstName)
    })
    cy.get('a[href="/profile"]').click()
})

Then('The user can successfully change their details', () => {
    cy.get("@password").then((password) => {
        cy.get('input[name=currentPassword]').type(password)
    })
    const ranId = () => Cypress._.random(0, 1e6)
    const id = ranId()
    var newPassword = "Ab"+id+"!"
    cy.get('input[name=newPassword]').type(newPassword)
    cy.get('input[name=newPasswordConfirmation]').type(newPassword)
    cy.get('button').contains("Save").click()
    cy.get('div').contains("The profile has been saved successful")
})