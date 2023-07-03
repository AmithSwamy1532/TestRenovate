Terra.describeViewports('MessageJournal', ['tiny', 'small', 'medium', 'large', 'huge', 'enormous'], () => {
    describe('When load Application', () => {
     
      it('Should find edit-item button',  () => {
        browser.url('/orion-dev-site/components/message-journal-js/message-journala');
        let pageElement =  $('#edit-item')
        expect(pageElement).toExist()
        expect(pageElement).toBeDisplayed()
        pageElement.saveScreenshot('title-screesnhot.png')
       });

       it('should find collapsable-items',  () => {
        let editElement =  $('#edit-item')
        let coll_button = $('#collapsable-items')
        browser.url('/orion-dev-site/components/message-journal-js/message-journala')
        const result = browser.call(async () => {
          await editElement.click()
        })
        expect(coll_button).toExist()   
       });
  

    });
  
    
  });
  