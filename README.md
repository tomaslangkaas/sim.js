# sim.js
micro-library for simple user interaction simulation and testing in browsers

```javascript
//create new simulation instance
sim()

  //set value of element with id `searchfield_1` to `What is sim.js?`
  .write('searchfield_1', 'What is sim.js?')

  //then, simulate keydown event with enter key on element with id 'searchButton'
  .fire('searchButton', 'keydown', {'keyCode': 13})

  //then, test if element with id `result_div` exists,
  //if it does not, repeat testing for at most 3000 ms,
  .test(function () {
    return document.getElementById('result_div');
  }, 3000)

  //click element with id `checkbox_1`
  .click('checkbox_1')

  //run the simulation with one (optional) callback for successful simulation,
  //and one (optional) callback for failed simulation
  .run(function (sim) {
      alert('sim complete');
    },
    function (sim) {
      alert('sim failed');
    }
  );
```

## API

### `sim([stepPause])`

Create new simulation instance. Provide an optional `stepPause` in milliseconds to slow down and watch the simulation.

### Instance methods

#### `.write(elementId, value)`
#### `.click(elementId)`
#### `.fire(elementId, eventType, eventProperties)`
#### `.test(testFunction[, allowanceTime])`
#### `.hash(fragment [, testFunction][, allowanceTime])`
#### `.run([onComplete][, onFailure][, onProgress])`

### Instance properties

#### `.index`
#### `.steps`
