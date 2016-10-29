module.exports = {
  "src_folders": ["test/integration"],
  "output_folder": "reports",
  "custom_commands_path": "",
  "custom_assertions_path": "",
  "page_objects_path": "",
  "globals_path": "",

  "selenium": {
    "start_process": false,
    "log_path": "",
    "host": "127.0.0.1",
    "port": 4445
  },

  "test_settings": {
    "default": {
      "launch_url": 'http://ondemand.saucelabs.com:80',
      "selenium_port": 80,
      "selenium_host": 'ondemand.saucelabs.com',
      "silent": true,
      "username": process.env.SAUCE_USERNAME,
      "access_key": process.env.SAUCE_ACCESS_KEY,
      "screenshots": {
        "enabled": false,
        "path": '',
      },
      "globals": {
        "waitForConditionTimeout": 10000,
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        platform: 'OS X 10.11',
        version: '54',
      },
    },
  }
};
