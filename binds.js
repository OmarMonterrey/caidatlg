var defaultBinds = {};
require('fs').readdirSync(__dirname + '/events/').forEach(function(file) {
	if (file.match(/\.js$/) !== null && file !== 'index.js') {
		var name = file.replace('.js', '');
		defaultBinds[name] = require('./events/' + file);
	}
});
function bindEvents(P, ctx){
	Object.entries(defaultBinds).forEach(singleBind => {
		if(typeof singleBind[1] !== 'function') return;
		P.on(singleBind[0], (...args) => singleBind[1](P, ctx, ...args))
	})
}
module.exports = bindEvents;