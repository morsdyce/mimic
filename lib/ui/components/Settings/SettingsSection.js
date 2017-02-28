import React from 'react';
import RedButton from 'ui/components/common/RedButton';
import API from 'api';
import SettingsState from 'ui/states/SettingsState';
import {
  SettingsSectionContainer,
  SettingsSectionTitle,
  SettingsInput,
  SettingsBlock,
} from 'ui/components/Settings/styled';

class SettingsSection extends React.Component {

  wipeOut = () => {
    if (SettingsState.allowWipeout) {
      API.clearStorage();
      SettingsState.set('allowWipeout', false);
    }
  };

  componentWillUnmount() {
    SettingsState.set('allowWipeout', false);
  }

  render() {
    return (
      <SettingsSectionContainer>
        <SettingsSectionTitle>Settings</SettingsSectionTitle>

        <SettingsBlock>
          <label htmlFor="always-show">
            <input id="always-show"
                   type="checkbox"
                   checked={ SettingsState.alwaysShowMimicButtons }
                   onChange={ (event) => SettingsState.set('alwaysShowMimicButtons', event.target.checked) }/>
            Always show Mimic buttons
          </label>
        </SettingsBlock>

        <SettingsBlock>
          Hotkey to show and hide Mimic
          <SettingsInput type="text" defaultValue={ SettingsState.mimicHotkey }/>
        </SettingsBlock>

        <SettingsBlock>
          <label htmlFor="analytics">
            <input id="analytics"
                   type="checkbox"
                   checked={ SettingsState.sendAnalytics }
                   onChange={ (event) => SettingsState.set('sendAnalytics', event.target.checked) }/>
            Send anonymous usage stats
          </label>
        </SettingsBlock>

        <SettingsBlock>
          <input type="checkbox"
                 checked={ SettingsState.allowWipeout }
                 onChange={ (event) => SettingsState.set('allowWipeout', event.target.checked) }/>
          &nbsp;
          <RedButton onClick={ this.wipeOut } disabled={ !SettingsState.allowWipeout }>
            Remove all mimic data
          </RedButton>
        </SettingsBlock>
      </SettingsSectionContainer>
    );
  }
}

export default SettingsSection;
