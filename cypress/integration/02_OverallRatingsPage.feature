@E2E_Testing @RankingTable_Testing
Feature: Buggy Cars Racing Overall Ratings Feature

    This is to test the functionalities of the Overall Ratings Page
    
    Scenario: A user opens the website and accesses the overall ratings

    Given A logged in user opens the website
    When The user clicks on the image for Overall Rating
    Then The user can see the page with the table of rankings displayed

    Scenario: A user opens overall ratings and sorts by rank

    Given A logged in user opens the website
    When The user clicks on the image for Overall Rating
    And The user clicks on the table header rank to sort the table
    Then The user can see the rankings displayed in the correct order

    Scenario: A user opens overall ratings and sorts by Model

    Given A logged in user opens the website
    When The user clicks on the image for Overall Rating
    And The user clicks on the table header model to sort the table
    Then The user can see the models displayed in the correct order