// spec.js
describe('Assignment 2 Testing',  function() {
    it('should have a title',  async function() {
      browser.ignoreSynchronization = true;
      await browser.get('https://www.globalsqa.com/angularJs-protractor/ConsumptionCalculator/');
      expect(browser.getTitle()).toEqual('Consumption Calculator');
    });
    it('should tell mg of caffeine, warning text and display [unable to load] picture after exceed 400 mg of caffeine', async function(){
      browser.ignoreSynchronization = true;
      await browser.get('https://www.globalsqa.com/angularJs-protractor/ConsumptionCalculator/');
      console.log("\nBefore Sending keys\n");

      await element(by.css("form.ng-scope:nth-child(2) > div:nth-child(2) > img:nth-child(4)")).isDisplayed().then(function(showed){
        console.log("Coffee Picture show status : " , showed);
        expect(showed).toBe(false);
      }); 
      await element(by.css("form.ng-scope:nth-child(2) > div:nth-child(2) > p:nth-child(3)")).isDisplayed().then(function(showed){
        console.log("Is Coffee Warning text show up :",showed);
        expect(showed).toBe(false);
      }); //Both should not show if value <= 0

      await element(by.css("form.ng-scope:nth-child(2) > p:nth-child(1) > input:nth-child(2)")).clear();
      await element(by.css("form.ng-scope:nth-child(2) > p:nth-child(1) > input:nth-child(2)")).sendKeys(4);
      await element(by.css("body > form.ng-scope.ng-valid.ng-dirty > div > p:nth-child(1) > input")).clear();
      await element(by.css("body > form.ng-scope.ng-valid.ng-dirty > div > p:nth-child(1) > input")).sendKeys(101);

      console.log("\nAfter Sending keys\n");

      await element(by.css("form.ng-scope:nth-child(2) > div:nth-child(2) > p:nth-child(2) > input:nth-child(2)")).getAttribute('value').then(function(text){
        console.log("Caffeine total :",text);
        expect(text).toEqual('404');
      });
      await element(by.css("form.ng-scope:nth-child(2) > div:nth-child(2) > p:nth-child(3)")).isDisplayed().then(function(showed){
        console.log("Is Warning text show up :",showed);
        expect(showed).toBe(true);
      });
      await element(by.css("form.ng-scope:nth-child(2) > div:nth-child(2) > p:nth-child(3)")).getText().then(function(text){
        console.log("Warning text :",text);
        expect(text).toEqual("You have exceeded the daily maximum intake of 400mg.");
      });
      await element(by.css("form.ng-scope:nth-child(2) > div:nth-child(2) > img:nth-child(4)")).isDisplayed().then(function(showed){
        console.log("Coffee Picture show status : " , showed);
        expect(showed).toBe(true);
      });
      console.log("\n");
      browser.sleep(1500);
    });
    
    it('should tell mg of tar, warning text and display no smoking picture after exceed 30 mg of tar',async function(){
      browser.ignoreSynchronization = true;
      await browser.get('https://www.globalsqa.com/angularJs-protractor/ConsumptionCalculator/');

      console.log("\nBefore Sendkeys\n");

      await element(by.css("#cigarette")).isDisplayed().then(function(showed){
        console.log("Cigarette Picture show status : " , showed);
        expect(showed).toBe(false);
      });
      await element(by.css("form.ng-scope:nth-child(4) > div:nth-child(2) > p:nth-child(3)")).isDisplayed().then(function(showed){
        console.log("Is Cigarette Warning text show up :",showed);
        expect(showed).toBe(false);
      });
      //Both should not show if tar < 30 mg

      await element(by.css("form.ng-scope:nth-child(4) > p:nth-child(1) > input:nth-child(2)")).clear();
      await element(by.css("form.ng-scope:nth-child(4) > p:nth-child(1) > input:nth-child(2)")).sendKeys(3);

      console.log("\nAfter Sendkeys\n");

      await element(by.css("form.ng-scope:nth-child(4) > div:nth-child(2) > p:nth-child(2) > input:nth-child(2)")).getAttribute('value').then(function(text){
        console.log("Tar total :",text);
        expect(text).toEqual('30');
      });
      await element(by.css("form.ng-scope:nth-child(4) > div:nth-child(2) > p:nth-child(3)")).isDisplayed().then(function(showed){
        console.log("Is Cigarette Warning text show up :",showed);
        expect(showed).toBe(true);
      });
      await element(by.css("form.ng-scope:nth-child(4) > div:nth-child(2) > p:nth-child(3)")).getText().then(function(text){
        console.log("Warning text :",text);
        expect(text).toEqual("You have exceeded the daily maximum intake of 30mg.");
      });
      await element(by.css("#cigarette")).isDisplayed().then(function(showed){
        console.log("Cigarette Picture show status : " , showed);
        expect(showed).toBe(true);
      });//should show picture after tar >= 30 mg
      console.log("\n");

      // await element(by.xpath("/html/body/form[2]/div/p[3]")).getText().then(function(text){
      //   console.log("Testing XPath method text ",text);
      // });
      browser.sleep(1500);
    });

  });
  