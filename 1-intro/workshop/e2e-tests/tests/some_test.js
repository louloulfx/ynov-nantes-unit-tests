Feature('Ynov Nantes');

Scenario('Test Ynov Nantes Check Bachelor Informatique', ({ I }) => {
    I.amOnPage('https://www.ynov-nantes.com/');
    I.click('a[href="/recherche/"]');
    I.appendField('input[name="s"]', 'info');
    I.wait(2);
    I.see('Bachelor Informatique');
});
