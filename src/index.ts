import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './glab';

/**
 * Initialization data for the glab extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'glab',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension glab is activated!');

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The glab server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default extension;
