# BUGGYCARSRATING_FRAMEWORK
## _Andrew Jun_

This framework is to test the functionalities of https://buggy.justtestit.org/
The tools used for this framework include:
- Javascript
- NodeJS
- Visual Studio Code
The installed packages in node module are:
- Cypress
- Cucumber
- cypress-mochawesome-reporter
## Setup
#### Prerequisites
-- Must have NodeJS installed.
-- Must have Visual Studio Code installed.

## Installation
Install the node modules through the VS Code Terminal
```sh
npm install
npm update
```

To run the tests there are two ways. To run the tests through the terminal use
```sh
npx cypress run
```
To run the tests through Cypress test runner use
```sh
npm run test
```
## Framework Structure

📦BUGGYCARSRATING_FRAMEWORK
 ┣ 📂Cypress
 ┃ ┗ 📂fixtures
 ┃ ┗ 📂integration
 ┣ 📂plugins
 ┣ 📂reports
 ┣ 📂screenshots
 ┣ 📂node_modules
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┗ 📜package.json

All the tests are included in the integration folder as feature files.
The 3 different functionalities of the website has been included as a separate feature file.
The folders with the same names as the feature file will contain all the step definitions.

## Reports
The cypress test runner will have an interactive report after the tests are completed with states and screenshots saved for each step.
The test run through the terminal will display the results in the terminal as well as provide a html report with screenshots of failures in .../reports/index.html. 
There are currently 7 tests written, with 6 pass, 1 fail. The failing test is an identified bug detailed below.

## Improvements/TODO
-- The feature files have tags included with the scenarios/features but currently do not have the capacity to run selectively. To do so we can install cypress-select with the line below.
```sh
npm install --save-dev cypress-select-tests
```
-- To have the html reports save a different html file for each run, to have traceability between different runs/days.
-- The tests are mainly end to end to show my competence in different areas of automation, as the simpler navigation test scenarios would be good for regression but not fit for showcasing purposes.
## Test Approach
The main test approach I have used was to timebox 30 minutes to learn the website and its functions. 
After identifying the main functionalities, with the time allowed I performed some exploratory manual testing to identify what tests are fit for automation.
From the manual testing, bugs were discovered and documented (see below)
After identifying the main functions, I split them into different feature files and identified some end to end test scenarios to automate.

## Bugs Identified
__Bug 1__
__Title:__ Overall Rankings Table: rank sort is alphabetical, not numerical.
__Date identified:__ 31/05/2022
__Priority:__ Medium
__Steps to Reproduce:__
1. Open the website and navigate to the "Overall Rankings" page via clicking the image on the homepage.
2. When the table is visible, click on the header "Ranks" to sort the table.
3. Verify that the ranks displayed for each car model is in the correct order.

__Expected Result:__ The table is sorted in ascending numerical order e.g 1,2,3,4,5...
__Actual Result:__ The table is sorted in alphabetical order: 1,10,11,12...

__Bug 2__
__Title:__ Profile details are still displayed when logged out.
__Date identified:__ 31/05/2022
__Priority:__ High
__Steps to Reproduce:__
1. Open the website and login to an existing user. (Alternatively: create a new user, open the Profile page and fill in the details)
2. Open the user's profile page. 
3. Press the log out button in the banner.

__Expected Result:__ Once logged out, the sensitive details of the previously logged in user should not be displayed.
__Actual Result:__ The account is logged out, but the details of the user are still visible and not censored/redirected off the page.

__Bug 3__
__Title:__ Popular Make Page: Banner home page button does not work
__Date identified:__ 31/05/2022
__Priority:__ Medium
__Steps to Reproduce:__
1. Open the website and navigate to the "Popular Model" page via clicking the image on the homepage.
2. Click the Buggy Ratings title on the top banner of the page to return to the home page.

__Expected Result:__ The user is taken back to the home page.
__Actual Result:__ The user is not taken back to the home page.