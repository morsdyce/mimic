import API from 'api';
import BaseState from 'ui/states/BaseState';

const MIN_HEIGHT = 400;
const MAX_HEIGHT = window.innerHeight;

class UIState extends BaseState {

  mimicEnabled = true;
  viewMode = 'closed';
  latestRequest = null;
  editorHeight = API.mode === 'remote' ? window.innerHeight : 400;

  toggleMimic(newState) {
    this.mimicEnabled = newState;

    this.triggerUpdates();
  }

  setViewMode(viewMode) {
    this.viewMode = viewMode;

    this.triggerUpdates();
  }

  updateLatestRequest(latestRequest) {
    this.latestRequest = latestRequest;
  }

  setEditorHeight(editorHeight) {
    if (editorHeight <= MIN_HEIGHT || editorHeight >= MAX_HEIGHT) {
     return;
    }

    this.editorHeight = editorHeight;

    this.triggerUpdates();
  }
}

export default new UIState();
