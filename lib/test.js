require('./api');
require('./ui');

const context = require.context('../test', true, /\.spec\./);

context.keys().forEach(context);
