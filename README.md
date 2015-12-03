# sim.js
micro-library for simple user interaction simulation

```javascript

sim()
  //set value of element with id `searchfield_1` to `What is sim.js?`
  .value('searchfield_1', 'What is sim.js?')
  //click button with id `button 1`
  .click('button_1')
  //wait at most 3000 ms for element with id `result_div` to exist,
  //continue when it exists or continue anyway after 3000 ms
  .wait(3000, function(){
    return document.getElementById('result_div');
  })
  //click element with id `checkbox_1`
  .click('checkbox_1')
  //run the simulation
  .run();
```
