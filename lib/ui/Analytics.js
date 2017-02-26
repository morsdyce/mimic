import UIState from 'ui/UIState';

export function trackEvent(event, data) {
  if (!UIState.settings.sendAnalytics) {
    return;
  }

  console.log(event, data)
}