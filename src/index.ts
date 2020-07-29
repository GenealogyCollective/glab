import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ILauncher } from '@jupyterlab/launcher';
import { requestAPI } from './glab';
import pythonIconStr from '../style/Python-logo-notext.svg';
import { LabIcon } from '@jupyterlab/ui-components';

namespace CommandIDs {
  export const createNew = 'glab:open';
}


/**
 * Initialization data for the glab extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'glab',
  autoStart: true,
  optional: [ILauncher],
  activate: (
    app: JupyterFrontEnd,
    launcher: ILauncher | null) => {
      console.log('JupyterLab extension glab is activated!');
      const { commands } = app;
      const command = CommandIDs.createNew;      
      const icon = new LabIcon({
	name: 'glab:open-icon',
	svgstr: pythonIconStr
      });
      
      commands.addCommand(command, {
	label: args => (args['isPalette'] ? 'New Python File' : 'Python File'),
	caption: 'Create a new Python file',
	icon: args => (args['isPalette'] ? null : icon),
	execute: async args => {
          // Get the directory in which the Python file must be created;
          // otherwise take the current filebrowser directory
	  /*
          const cwd = args['cwd'] || browserFactory.defaultBrowser.model.path;
	  
          // Create a new untitled python file
          const model = await commands.execute('docmanager:new-untitled', {
            path: cwd,
            type: 'file',
            ext: 'py'
          });
	  
          // Open the newly created file with the 'Editor'
          return commands.execute('docmanager:open', {
            path: model.path,
            factory: FACTORY
          });
	  */
	}
      });

      if (launcher) {
	launcher.add({
	  command,
	  category: 'Applications',
	  rank: 1
	});
      }

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
}

export default extension;
