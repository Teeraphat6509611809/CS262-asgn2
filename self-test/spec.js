// spec.js
describe('Assignment 2 Testing',  function() {
  it('should show total of caffeine and tar',async function(){
    browser.ignoreSynchronization = true;
    await browser.get('https://www.globalsqa.com/angularJs-protractor/ConsumptionCalculator/');
    await browser.wait(protractor.ExpectedConditions.urlContains('https://www.globalsqa.com/angularJs-protractor/ConsumptionCalculator/'), 5000, 'URL did not load within 5 seconds');
    
    
    await element.all(by.css("body.ng-scope form.ng-scope.ng-pristine.ng-valid p input.quantity.ng-pristine.ng-valid.ng-valid-number.ng-valid-min")).then(async function(value){
      console.log("\nTesting all in limits\nBefore Sending Keys\n");
      var caff = await value[0].getAttribute('value');
      var tar = await value[1].getAttribute('value');
      console.log("Value in caffeine box :",caff);
      await expect(caff).toEqual('0');
      console.log("Value in Tar box:",tar);
      await expect(tar).toEqual('0');
      value[0].clear();
      value[0].sendKeys(3);
      console.log("Sending 3 to coffee...\n");
      value[1].clear();
      console.log("Sending 2 to cigarette...\n");
      value[1].sendKeys(2);
      let Cofftotal,CigTotal;
      element.all(by.css("body.ng-scope form.ng-scope.ng-valid.ng-dirty div p input.total.ng-pristine.ng-valid.ng-valid-number.ng-valid-min")).getAttribute('value').then(function(out){
      // console.log(out);
      console.log("\nAfter Sending keys\n");
        Cofftotal = out[0];
        console.log("Caffeine total :",Cofftotal," mg");
        expect(Cofftotal).toEqual('323');
        CigTotal = out[1];
        console.log("Tar total :",CigTotal," mg");
        expect(CigTotal).toEqual('20');

      });
      element.all(by.css("html body.ng-scope form.ng-scope.ng-valid.ng-dirty div p.warn.ng-binding")).isDisplayed().then(function(showed){
        console.log("After send keys Caffeine warning text show up status :",showed[0]);
        expect(showed[0]).toBe(false);
        console.log("After send keys Tar warning text show up status :",showed[1]);
        expect(showed[1]).toBe(false);
    });

    });
  });

    it('should tell mg of caffeine, warning text and display [unable to load] picture after exceed 400 mg of caffeine', async function(){
      browser.ignoreSynchronization = true;
      await browser.get('https://www.globalsqa.com/angularJs-protractor/ConsumptionCalculator/');
      await browser.wait(protractor.ExpectedConditions.urlContains('https://www.globalsqa.com/angularJs-protractor/ConsumptionCalculator/'), 5000, 'URL did not load within 5 seconds');
      console.log("\nTesting Overdosing Coffee\nBefore Sending keys\n");

      await element(by.css("form.ng-scope:nth-child(2) > div:nth-child(2) > img:nth-child(4)")).isDisplayed().then(function(showed){
        console.log("Coffee Picture show status : " , showed);
        expect(showed).toBe(false);
      }); 
      await element(by.css("form.ng-scope:nth-child(2) > div:nth-child(2) > p:nth-child(3)")).isDisplayed().then(function(showed){
        console.log("Is Caffeine Warning text show up :",showed);
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
      let warn=false;
      await element(by.css("form.ng-scope:nth-child(2) > div:nth-child(2) > p:nth-child(3)")).isDisplayed().then(function(showed){
        console.log("Is Caffeine Warning text show up :",showed);
        warn = showed;
        expect(showed).toBe(true);
      });

      if(warn){
      await element(by.css("form.ng-scope:nth-child(2) > div:nth-child(2) > p:nth-child(3)")).getText().then(function(text){
        console.log("Warning text :",text);
        expect(text).toEqual("You have exceeded the daily maximum intake of 400mg.");
      });
    }
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
      await browser.wait(protractor.ExpectedConditions.urlContains('https://www.globalsqa.com/angularJs-protractor/ConsumptionCalculator/'), 5000, 'URL did not load within 5 seconds');

      console.log("\nTesting Overdosing Cigarette\nBefore Sendkeys\n");

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
      let warn = false;
      await element(by.css("form.ng-scope:nth-child(4) > div:nth-child(2) > p:nth-child(3)")).isDisplayed().then(function(showed){
        console.log("Is Cigarette Warning text show up :",showed);
        warn = showed;
        expect(showed).toBe(true);
      });
      
      if(warn){
        await element(by.css("form.ng-scope:nth-child(4) > div:nth-child(2) > p:nth-child(3)")).getText().then(function(text){
        console.log("Warning text :",text);
        expect(text).toEqual("You have exceeded the daily maximum intake of 30mg.");
      });
      }
      
      await element(by.css("#cigarette")).isDisplayed().then(function(showed){
        console.log("Cigarette Picture show status : " , showed);
        expect(showed).toBe(true);
      });//should show picture after tar >= 30 mg
      console.log("\n");
      browser.sleep(1500);
    });
   
  });
  