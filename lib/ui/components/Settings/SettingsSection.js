import React from 'react';
import RedButton from 'ui/components/common/RedButton';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';
import {
  SettingsSectionContainer,
  SettingsSectionTitle,
  SettingsInput,
  SettingsBlock,
} from 'ui/components/Settings/styled';

class SettingsSection extends React.Component {

  wipeOut = () => {
    if (UIState.allowWipeout) {
      API.clearStorage();
      UIState.update({ allowWipeout: false })
    }
  };

  componentWillUnmount() {
    UIState.update({ allowWipeout: false })
  }

  render() {
    return (
      <SettingsSectionContainer>
        <SettingsSectionTitle>Settings</SettingsSectionTitle>

        <SettingsBlock>
          <label htmlFor="always-show">
            <input id="always-show"
                   type="checkbox"
                   checked={ UIState.settings.alwaysShowMimicButtons }
                   onChange={ (event) => UIState.updateSetting({ alwaysShowMimicButtons: event.target.checked }) }/>
            Always show Mimic buttons
          </label>
        </SettingsBlock>

        <SettingsBlock>
          Hotkey to show and hide Mimic
          <SettingsInput type="text" defaultValue={ UIState.settings.mimicHotkey }/>
        </SettingsBlock>

        <SettingsBlock>
          <label htmlFor="analytics">
            <input id="analytics"
                   type="checkbox"
                   checked={ UIState.settings.sendAnalytics }
                   onChange={ (event) => UIState.updateSetting({ sendAnalytics: event.target.checked }) }/>
            Send anonymous usage stats
          </label>
        </SettingsBlock>

        <SettingsBlock>
          <input type="checkbox"
                 checked={ UIState.allowWipeout }
                 onChange={ (event) => UIState.update({ allowWipeout: event.target.checked }) }/>
          &nbsp;
          <RedButton onClick={ this.wipeOut } disabled={ !UIState.allowWipeout }>
            Remove all mimic data
          </RedButton>
        </SettingsBlock>
      </SettingsSectionContainer>
    );
  }
}

export default UIStateListener(SettingsSection);
