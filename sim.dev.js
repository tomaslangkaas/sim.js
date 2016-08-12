var sim = (function(doc) {

  function elm(id) {
    return id ? doc.getElementById(id) : doc.body;
  }

  function trigger(elm, type, propObj) {
    var i, d = doc,
      eventObj = d.createEventObject ?
      d.createEventObject() : d.createEvent("Events");
    if (eventObj.initEvent)
      eventObj.initEvent(type, true, true);
    for (i in propObj)
      eventObj[i] = propObj[i];
    elm.dispatchEvent ?
      elm.dispatchEvent(eventObj) : elm.fireEvent("on" + type, eventObj);
  }
  var defer = setTimeout,
    pollInterval = 100,
    runners = {
      //.hash(fragmentString [,testFunction] [,maxWaitms])
      'hash': function(item, done) {
        window.location.hash = item[1];
        done(item[2], item[3]);
      },
      //.test(testFunction [,maxWaitms])
      'test': function(item, done) {
        done(item[1], item[2]);
      },
      //.fire(elementId, eventTypeString, eventPropertyObject)
      'fire': function(item, done) {
        trigger(elm(item[1]), item[2], item[3]);
        done();
      },
      //.click(elementId)
      'click': function(item, done) {
        var domElm = elm(item[1]);
        if ('checked' in domElm) domElm['checked'] = domElm['type'] == 'radio' ? true : !domElm['checked'];
        trigger(elm(item[1]), 'click');
        done();
      },
      //.value(elementId, value)
      'write': function(item, done) {
        elm(item[1])['value'] = item[2];
        done();
      }
    };

  function methodFactory(name) {
    return function() {
      this['steps'].push([name].concat([].slice.call(arguments)));
      return this;
    }
  }
  //async call
  function async(fn, argsArray, onsuccess, onfail, waitMs, limit) {
    defer(function() {
      var success = false,
        msg = '';
      try {
        success = fn.apply({}, argsArray) || !limit;
        success && onsuccess && onsuccess();
      } catch (err) {
        msg = err.message;
      }
      if (!success) {
        if (limit > +new Date) {
          async(fn, argsArray, onsuccess, onfail, pollInterval, limit);
        } else {
          onfail(msg);
        }
      }
    }, waitMs);
  }
  //runner
  function runner(oncomplete, onfail, onprogress) {
    var obj = this;
    if (onfail) obj['fail'] = onfail;

    function fail(msg) {
      obj.msg = 'sim failed at step ' + (obj['index'] + 1) + ': ' + msg;
      obj['fail'] && obj['fail'](obj);
    }

    function run(check, maxWait) {
      if (check) {
        async(check, [], run, fail, 0, (+new Date) + (maxWait || -1));
      } else {
        if (onprogress && obj['index'] > -1) onprogress(obj);
        var item = obj['steps'][++obj['index']];
        if (obj['index'] < obj['steps'].length) {
          async(runners[item[0]], [item, run], false, fail, obj['wait']);
        } else {
          obj['index'] = -1;
          oncomplete && oncomplete(obj);
        }
      }
    }
    run();
  }
  return function(minWait) {
    var i, obj = {
      'wait': minWait || 0,
      'steps': [],
      'index': -1,
      'run': runner,
      'fail': function(sim) {
        console && console.log && console.log(sim.msg);
      }
    };
    for (i in runners) {
      obj[i] = methodFactory(i);
    }
    return obj;
  }
})(document);
