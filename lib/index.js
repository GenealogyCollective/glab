import { requestAPI } from './glab';
/**
 * Initialization data for the glab extension.
 */
const extension = {
    id: 'glab',
    autoStart: true,
    activate: (app) => {
        console.log('JupyterLab extension glab is activated!');
        requestAPI('get_example')
            .then(data => {
            console.log(data);
        })
            .catch(reason => {
            console.error(`The glab server extension appears to be missing.\n${reason}`);
        });
    }
};
export default extension;
