import { PORT } from './constants/server';
import { App } from './app';

new App().server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
