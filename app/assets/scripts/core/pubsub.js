
var events = {};

var subscribe = function (eventName, fn) {  
    // if events[eventName] is not Null, Undefined nor empty, sets to himself
    // if it is undefined (not existed yet) it gets created.
    events[eventName] = events[eventName] || [];  
    events[eventName].push(fn);
};

var unsubscribe = function(eventName, fn) {
    if (events[eventName]) {
      for (var i = 0; i < events[eventName].length; i++) {
        if (events[eventName][i] === fn) {
          events[eventName].splice(i, 1);
          break;
        }
      };
    }
};

var trigger = function (eventName, data) {
    if (events[eventName]) {
      events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
}


module.exports = {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    trigger: trigger
}
