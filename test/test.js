var Nightmare = require("nightmare");

// STORY: As a developer nerd, I want to be able to take courses on web tech.
new Nightmare({ show: true })
  // Visit home page and make that clicking the logo brings you to the correct link (just back to home page)
  .viewport(800, 600)
  .goto("https://innovata.herokuapp.com/")
  .click("#logo-space")
  .screenshot("homepage.png")

  //check to make you can get to the create page from home page and then input values. Take screenshot.
  .click("a[href='/create']")
  .type("#viz-user-input", "billy bob")
  .type("#viz-name-input", "nightmare test viz")
  .click("input[class='select-dropdown']")
  .type("#viz-data-input", "this is a nightmare test")
  .screenshot("createPage.png")

  //go back to  the home page through return button
  .click("button[id='return-btn']")
  .screenshot('homepage2.png')

  //then hover over logo and take screen shot
  .mouseover("#logo-img")
  .screenshot('imagehover.png')

  //click on one of viz's and travel to page, take screen shot
  .click("a[href='/display']")
  .screenshot('avizpage.png')

  // End test
  .end()
  // Execute commands
  .then(function() {
    console.log("Done!");
  })
  // Catch errors
  .catch(function(err) {
    console.log(err);
  });
