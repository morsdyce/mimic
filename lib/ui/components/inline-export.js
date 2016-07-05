import React from 'react';
import { IconButton } from 'material-ui';
import ExportIcon from 'material-ui/lib/svg-icons/file/cloud-download'
import { FileDownload } from 'ui/components/file-download';

export const InlineExport = ({ performExport, exportData }) => (
  <IconButton onClick={ () => performExport(exportData()) }
              tooltip="Export"
              style={{ width: '32px', height: '32px' }}
              iconStyle={{ fontSize: 40, width: '20px', height: '20px'}}>
    <ExportIcon />
  </IconButton>
);

export default FileDownload(InlineExport);
