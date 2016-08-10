# sim.js
micro-library for simple user interaction simulation and testing in browsers

```javascript
//create new simulation instance
sim()
  //set value of element with id `searchfield_1` to `What is sim.js?`
  .write('searchfield_1', 'What is sim.js?')
  //simulate keydown event with enter key on element with id 'searchButton'
  .fire('searchButton', 'keydown', {'keyCode': 13})
  //test if element with id `result_div` exists,
  //if it does not, keep checking for 3000 ms
  .test(function(){
    return document.getElementById('result_div');
  }, 3000)
  //click element with id `checkbox_1`
  .click('checkbox_1')
  //run the simulation
  .run();
```
