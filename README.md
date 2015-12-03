# sim.js
micro-library for simple user interaction simulation

```javascript

sim()
  //set value of element with id `searchfield_1` to `What is sim.js?`
  .value('searchfield_1', 'What is sim.js?')
  //click button with id `button 1`, then wait 250 ms
  .click('button_1', 250)
  //wait at most 3000 ms for element with id `result_div` to exist
  .wait(3000, function(){
    return document.getElementById('result_div');
  })
  //click element with id `checkbox_1`
  .click('checkbox_1')
  .run();
```
