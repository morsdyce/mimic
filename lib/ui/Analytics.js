import SettingsState from 'ui/states/SettingsState';

export function trackEvent(event, data) {
  if (!SettingsState.sendAnalytics) {
    return;
  }

  console.log(event, data)
}