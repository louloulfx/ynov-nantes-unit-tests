Feature('Workshop 4 Test e2e');

Scenario('Test todo home page', ({I}) => {
    I.amOnPage('http://localhost:5000/');
});

Scenario('Test create todo', ({I}) => {
    I.amOnPage('http://localhost:5000/');
    I.fillField('#newTODO', 'Test To-Do2');
    I.click('Create');
    locate('#todo-body')
        .inside(locate('td').withText('Test To-Do'))
});

Scenario('Test Done todo', ({I}) => {
    I.amOnPage('http://localhost:5000/');
    I.fillField('#newTODO', 'Test To-Do2');
    I.click('Create');
    locate('#todo-body')
        .inside(locate('td').withText('Test To-Do'))
    I.click('Done');
    locate('#done-body')
        .inside(locate('td').withText('Test To-Do'))
});
