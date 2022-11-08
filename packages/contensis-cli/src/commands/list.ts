import { Command } from 'commander';
import { cliCommand } from '~/services/ContensisCliService';

// projects
// content types
// components
// api keys
// roles
// webhooks
export const makeListCommand = () => {
  const list = new Command()
    .command('list')
    .showHelpAfterError(true)
    .exitOverride();

  list
    .command('envs')
    .addHelpText(
      'after',
      `
Example call:
  > list envs
`
    )
    .action(opts => {
      cliCommand(['list', 'envs'], opts).PrintEnvironments();
    });
  list.command('projects').action(async opts => {
    await cliCommand(['list', 'projects'], opts).PrintProjects();
  });
  list
    .command('contenttypes')
    .addHelpText(
      'after',
      `
Example call:
  > list contenttypes -o ./output.json -f json
`
    )
    .action(async opts => {
      await cliCommand(['list', 'contenttypes'], opts).PrintContentTypes();
    });
  list
    .command('components')
    .addHelpText(
      'after',
      `
Example call:
  > list components -o ./output.json -f json
`
    )
    .action(async opts => {
      await cliCommand(['list', 'components'], opts).PrintComponents();
    });
  list
    .command('blocks')
    .addHelpText(
      'after',
      `
Example call:
  > list blocks
`
    )
    .action(async opts => {
      await cliCommand(['list', 'blocks'], opts).PrintBlocks();
    });
  list
    .command('keys')
    .addHelpText(
      'after',
      `
Example call:
  > list keys
`
    )
    .action(async opts => {
      await cliCommand(['list', 'keys'], opts).PrintApiKeys();
    });
  list
    .command('webhooks')
    .argument('[name]', 'find webhooks matching the supplied name')
    .option('-i --id <id...>', 'the subscription id(s) to get')
    .action(async (name?: string, { id, ...opts }: any = {}) => {
      await cliCommand(['list', 'webhooks'], opts).PrintWebhookSubscriptions(
        id,
        name
      );
    });
  return list;
};
