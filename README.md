# sim.js
micro-library for simple user interaction simulation and testing in browsers (IE6+)

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

## Features

* Small library (~1.3 kb minified), no dependencies
* Wide browser coverage (even works in IE6)
* Useful for test-driven development of simple offline client-side user interfaces (when click/tap and text input are the only user actions)
* MIT-licensed

## API

### `sim([stepDelay])`

Create new simulation instance. Provide an optional `stepDelay` in milliseconds to slow down and watch the simulation.

### Instance methods

#### `.write(elementId, value)`

Adds a new step to the simulation: Sets value of element with id `elementId`. For use with text inputs. Note: Does not fire any events.

#### `.click(elementId)`

Adds a new step to the simulation: Simulates a click event on the element with id `elementId`. For use with buttons, radio buttons and checkboxes.

#### `.fire(elementId, eventType, eventProperties)`

Adds a new step to the simulation: Fires an event of type `eventType` on the element with id `elementId`. If `elementID` is falsy, the event is fired on `document.body`. The optional `eventProperties` argument is an object with properties to attach to the event object (such as `keyCode` or `charCode` for key events).

#### `.test(testFunction[, allowanceTime])`

Adds a new step to the simulation: Executes a testing function to test whether some condition is true or false. The test function has to return a truthy value in order for the simulation to continue to the next step. The optional `allowanceTime` argument specifies a time limit in milliseconds, where the test function is run at regular (100 ms) intervals until it returns true or until the limit is met and the test is considered failed. Useful for async operations. The `allowanceTime` argument defaults to `0`.

#### `.hash(fragment [, testFunction][, allowanceTime])`

Adds a new step to the simulation: Sets `window.location.hash` to `fragment`. An optional `testFunction` and `allowanceTime` argument may be provided (see the `.test()` method above). Useful for testing location hash-based single page app routing.

#### `.run([onComplete][, onFailure][, onProgress])`

Runs the simulation with all provided steps in sequence, until all steps complete or simulation fails. Optional callback functions can be provided:

* `onComplete` is called if the simulation completes without failure,
* `onFailure` is called if the simulation fails,
* `onProgress` is called after each successful simulation step.
 
All callback functions are called with the simulation instance object as the single argument.

#### `.fail(simInstance)`

The `onFailure` callback function. For internal use.

### Instance properties

#### `.index`

The current simluation step (0-based index), defaults to `-1` when simulation is not running. For internal use.

#### `.wait`

The `stepDelay` in milliseconds. For internal use.

#### `.steps`

An array of all simulation step arguments. For internal use.

#### `.msg`

The current failure message, if any. For use by `onFail` callback functions.
