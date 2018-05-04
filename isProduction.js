if (process && process.env && process.env.NODE_ENV === 'production') {
  console.warn([
  'You are running Mimic in production mode,',
  'in most cases you only want to run Mimic in development environments.\r\n',
  'For more information on how to load Mimic in development environments only please see:',
  'https://github.com/500tech/mimic#loading-mimic-only-in-development-environments'
  ].join(' '));
}
