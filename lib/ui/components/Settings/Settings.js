import React from 'react';
import Frame from 'ui/components/common/Frame';
import { trackEvent } from 'ui/Analytics';
import SettingsState from 'ui/states/SettingsState';
import { connectToState } from 'ui/states/connector';
import ImportSection from 'ui/components/Settings/ImportSection';
import ExportSection from 'ui/components/Settings/ExportSection';
import SettingsSection from 'ui/components/Settings/SettingsSection';
import { SettingsContainer } from 'ui/components/Settings/styled';

class Settings extends React.Component {

  componentDidMount() {
    trackEvent('open settings');
  }

  render() {
    return (
      <Frame>
        <SettingsContainer>
          <ImportSection
            importSuccess={ SettingsState.importSuccess }
            importFailed={ SettingsState.importFailed }
            error={ SettingsState.error }/>
          <ExportSection/>
          <SettingsSection/>
        </SettingsContainer>
      </Frame>
    );
  }
}

export default connectToState(SettingsState, Settings);
