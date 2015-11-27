var sim = (function(doc){
	var defer = setTimeout;
	function elm(id){
		return id? (doc.getElementById(id) || {}): doc.body;
	}
	function trigger(elm, type, propObj){
		var i, d = doc,
		eventObj = d.createEventObject ?
			d.createEventObject() : d.createEvent("Events");
		if(eventObj.initEvent)
			eventObj.initEvent(type, true, true);
		for(i in propObj)
			eventObj[i] = propObj[i];
		elm.dispatchEvent?
			elm.dispatchEvent(eventObj) : elm.fireEvent("on"+type, eventObj);
	}
	var runners = {
		'event': function(item, done){
			trigger(elm(item[1]), item[2], item[3]);
			defer(done, item[4]);
		},
		'click': function(item, done){
			var domElm = elm(item[1]);
			if('checked' in domElm) domElm['checked'] = domElm['type'] == 'radio'? true: !domElm['checked'];
			trigger(elm(item[1]), 'click');
			defer(done, item[2]);
		},
		'value': function(item, done){
			elm(item[1])['value'] = item[2];
			defer(done, item[3]);
		},
		'wait': function(item, done){
			if(item[2] && item[2].call){
				var limit = +(new Date) + item[1],
				pollID = setInterval(function(){
					if(item[2]() || +(new Date) > limit){
						clearInterval(pollID);
						done();
					}
				}, 50);
			}else{
				defer(done, item[1]);
			}
		},
		'key': function(item, done){
			trigger(elm(item[1]), item[2], {
				'keyCode': item[3], 
				'charCode': item[3],
				'shiftKey': !!item[4],
				'ctrlKey': !!item[5],
				'altKey': !!item[6]
				});
			defer(done, item[7]);
		}
	};
	function addActionFactory(name){
		return function(){
			this['actions'].push([name].concat([].slice.call(arguments)));
			return this;
		}
	}
	//runner
	function runner(callback){
		var obj = this;
		function run(){
			var item = obj['actions'][++obj['index']];
			if(obj['index'] < obj['actions'].length){
				runners[item[0]](item, run);
			}else{
				obj['index'] = -1;
				callback && callback(obj);
			}
		}
		run();
	}
	return function(){
		var i, obj = {
			'actions': [],
			'index': -1,
			'run': runner
		};
		for(i in runners){
			obj[i] = addActionFactory(i);
		}
		return obj;
	}
})(document);
