import { Argument, Command } from 'commander';
import { cliCommand } from '~/services/ContensisCliService';
import { mapContensisOpts } from './globalOptions';

export const makeGetCommand = () => {
  const program = new Command()
    .command('get')
    .addHelpText('after', `\n`)
    .showHelpAfterError(true)
    .exitOverride();

  program
    .command('version')
    .description('Get current Contensis version')
    .addHelpText(
      'after',
      `
Example call:
  > version
`
    )
    .action(async opts => {
      await cliCommand(['get', 'version'], opts).PrintContensisVersion();
    });

  program
    .command('model')
    .description('Get a content model')
    .argument('<contentTypeId...>', 'ids of the content models to get')
    .addHelpText(
      'after',
      `
Example call:
  > get model podcast podcastLinks
`
    )
    .action(async (modelIds: string[], opts) => {
      await cliCommand(
        ['get', 'model', modelIds.join(' ')],
        opts
      ).PrintContentModels(modelIds);
    });

  program
    .command('contenttype')
    .description('Get a content type')
    .argument('<contentTypeId>', 'the API id of the content type to get')
    .addHelpText(
      'after',
      `
Example call:
  > get contenttype {contentTypeId} -o content-type-backup.json
`
    )
    .action(async (contentTypeId: string, opts) => {
      await cliCommand(
        ['get', 'contenttype', contentTypeId],
        opts
      ).PrintContentType(contentTypeId);
    });

  program
    .command('component')
    .description('Get a component')
    .argument('<componentId>', 'the API id of the component to get')
    .addHelpText(
      'after',
      `
Example call:
  > get component {componentId} -o component-backup.json
`
    )
    .action(async (componentId: string, opts) => {
      await cliCommand(['get', 'component', componentId], opts).PrintComponent(
        componentId
      );
    });

  program
    .command('entries')
    .description('Get entries')
    .argument(
      '[search phrase]',
      'get entries with the search phrase, use quotes for multiple words'
    )
    .option('-i --id <id...>', 'the entry id(s) to get')
    .option(
      '-d, --dependents',
      'find and return any dependencies of all found entries'
    )
    .option(
      '-fi, --fields <fields...>',
      'limit the output fields on returned entries'
    )
    .option(
      '-q, --zenql <zenql>',
      'get entries with a supplied ZenQL statement'
    )
    .addHelpText(
      'after',
      `
Example call:
  > get entries --zenql "sys.contentTypeId = blog" --fields entryTitle entryDescription sys.id --output ./blog-posts.csv --format csv
`
    )
    .action(async (phrase: string, opts, cmd) => {
      // console.log('phrase: ', phrase, '\nopts:', JSON.stringify(opts, null, 2));
      // console.log('opts:', JSON.stringify(opts, null, 2));
      await cliCommand(
        ['get', 'entries'],
        opts,
        mapContensisOpts({ phrase, ...opts })
      ).GetEntries({
        withDependents: opts.dependents,
      });
    });

  const block = program
    .command('block')
    .description('Get a block or block version')
    .argument('[blockId]', 'the block to get version details for')
    .argument(
      '[branch]',
      'the branch of the block to get version details for',
      'main'
    )
    .argument(
      '[version]',
      'get a specific version of the block pushed to the specified branch'
    )
    .addHelpText(
      'after',
      `
Example call:
  > get block contensis-website master latest
`
    )
    .action(async (blockId: string, branch: string, version: string, opts) => {
      await cliCommand(['get', 'block'], opts).PrintBlockVersions(
        blockId,
        branch,
        version
      );
    });

  const dataCenter = new Argument(
    '[dataCenter]',
    'the datacentre of the block to get logs for'
  )
    .choices(['hq', 'london', 'manchester'])
    .default('hq');

  block
    .command('logs')
    .description('Get logs for a block')
    .argument('[blockId]', 'the block to get version logs for')
    .argument(
      '[branch]',
      'the branch of the block to get version details for',
      'main'
    )
    .argument(
      '[version]',
      'the version of the block pushed to the branch to get logs for',
      'latest'
    )
    .addArgument(dataCenter)
    .usage('get block logs [blockId] [branch] [version] [dataCenter]')
    .addHelpText(
      'after',
      `
Example call:
  > get block logs contensis-website master
  > get block logs contensis-website master latest london
`
    )
    .action(
      async (
        blockId: string,
        branch: string,
        version: string,
        dataCenter: 'hq' | 'manchester' | 'london',
        opts
      ) => {
        await cliCommand(['get', 'block', 'logs'], opts).PrintBlockLogs(
          blockId,
          branch,
          version,
          dataCenter
        );
      }
    );

  return program;
};

export const get = makeGetCommand();
