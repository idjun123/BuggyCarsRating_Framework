@E2E_Testing @UserProfile_Testing
Feature: Buggy Cars Racing UserProfile Feature

    This is to test the functionalities of the User Login/Register/Profile.
    @Login_Testing
    Scenario: An unregistered user tries to login

    Given A new user opens the website
    When The user types username and password and clicks Login
    Then The user can see a message that the account does not exist
    
    @Login_Testing
    Scenario: A registered user tries to login

    Given A registered user opens the website
    When The user types username and password and clicks Login
    Then The user can see that they are logged in

    @Registration_Testing
    Scenario: A new user registers a new account and edits account details
    
    Given A new user opens the website
    When The user clicks on the Register button
    And The user enters all the details required and clicks Submit
    And The user logs in and in Profile edits the details
    Then The user can successfully change their details