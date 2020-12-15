import { createBrowserHistory } from 'history';

const baseUrl = document.getElementsByTagName('base').length > 0 ? document.getElementsByTagName('base')[0].getAttribute('href') : '/';
export const history = createBrowserHistory({ basename: baseUrl });