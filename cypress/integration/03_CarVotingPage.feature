@E2E_Testing @Voting_Testing
Feature: Buggy Cars Racing Car Voting Page Feature

    This is to test the functionalities of the Individual Car Voting Page
    
    Scenario: A logged in user opens the website and accesses the overall ratings to vote
    Given A newly registered user opens the website
    When The user clicks on the current Popular Model on homepage
    And The user types a comment to vote 
    Then The user can see their comment and the vote count is incremented up
