# sim.js
micro-library for simple ui simulation

```javascript

sim()
  .click('button_1', 250)
  .value('searchfield_1', 'What is sim.js?')
  .click('button_2')
  .wait(3000, function(){
    return document.getElementById('result_div');
  })
  .click('checkbox_1)
  .run();
```
