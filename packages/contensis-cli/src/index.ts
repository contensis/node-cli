import commands from './commands';
import { logError } from './util/logger';
import ContensisCli from './services/ContensisCliService';
// new ContensisCli(process.argv).DoCommandTasksAsync();

// This is the CLI part of the app
const program = commands();
program
  .parseAsync(process.argv)
  .then(() => {
    ContensisCli.quit();
  })
  .catch((err: any) => {
    logError(err);
    ContensisCli.quit(err);
  });
//.exitOverride(() => console.log('exit override!!!'));
