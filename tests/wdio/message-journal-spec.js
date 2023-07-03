
Terra.describeViewports('MessageJournal', [ 'medium', 'large', 'huge'], () => {
    describe('No Data available', () => {
      it('validates when no data is available', () => {
        // browser.url('/orion-dev-site/raw/tests/message-journal-js/message-journal-no-data');
        // Terra.validates.element('no data available');
      });
    
    it('should demonstrate the date page', () => {
      browser.url('/orion-dev-site/components/message-journal-js/message-journal');
      let pageTitle = $('#date')
      expect(pageTitle).toExist()
      expect(pageTitle).toBeDisplayed()
      //expect(pageTitle).toHaveTextContaining('Inbox')
      pageTitle.saveScreenshot('date-screesnhot.png')
    });

    it('should demonstrate the title header of page', () => {
      browser.url('/orion-dev-site/components/message-journal-js/message-journal');
      let pageTitle = $('#title')
      expect(pageTitle).toExist()
      expect(pageTitle).toBeDisplayed()
      expect(pageTitle).toHaveTextContaining('Inbox')
      pageTitle.saveScreenshot('inbox-screesnhot.png')
    });

    it('should demonstrate To check the table Elements', () => {
      browser.url('/orion-dev-site/components/message-journal-js/message-journal')
      // browser.pause(2000)
      let tableHeader =  $('#table-container')
      let tableId =  $('#table')
       browser.pause(2000)
      //tableHeader.saveScreenshot('tableHeader-screesnhot.png')
      browser.saveScreenshot('Browser-screesnhot.png')
      //let tableElement =  $('#table-body')
      // let tableElement1 =  $('#item1') 
       expect(tableHeader).toExist()
       expect(tableId).toExist()
       browser.pause(2000)
      // tableElement.waitForDisplayed({ timeout: 20000 })
      //await expect(tableElement).isExisting()
      // await expect(tableElement).waitForDisplayed({ timeout: 3000 })
      //browser.debug();
      //expect(tableElement).toHaveTextContaining('item1')
      // tableElement1.click()  
      // tableElement.saveScreenshot('table-screesnhot.png')
    });

    //    it('should demonstrate Forms and Inputs', () => {
    //    browser.url('/orion-dev-site/components/message-journal-js/message-journal')
    //    let from =  $('#from')
    //    let to =  $('#to')
    //    let timeSent =  $('#sent-Time')
    //    let subject =  $('#subject')
    //    let messageContent =  $('#message')
    //    let save =  $('#save')

    //     from.setValue('standard_user')
    //     to.setValue('secret_sauce')
    //     timeSent.setValue('standard_user')
    //     subject.setValue('secret_sauce')
    //     messageContent.setValue('standard_user')
    //     save.click()

    //    let inventoryContainer =  $('#inventory_container')
    //     expect(inventoryContainer).toBeDisplayed()
    // })

    // it('using async function in sync mode', async () => {
    //   await browser.pause(2000)

    //   const response = await axios.get('http://localhost:3000/journal_items')
    //   console.log(response) // outputs: "cat"

    //  // const el = await $('#table-iddd')
    //  // await expect(el).toExist()
    //  // await el.click()

  });
});
