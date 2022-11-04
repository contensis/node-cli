import { Command } from 'commander';
import { cliCommand } from '~/services/ContensisCliService';

export const makePushCommand = () => {
  const push = new Command()
    .command('push')
    .showHelpAfterError(true)
    .exitOverride();

  push
    .command('block')
    .argument('<block-id>', 'the name of the block to push to')
    .argument(
      '<image uri:tag>',
      'the uri and tag of the container image to push as a block (tag default: latest)'
    )
    .argument('[branch]', 'the branch we are pushing to', 'main')
    .option(
      '-r, --release',
      'whether to release the pushed block version',
      false
    )
    .option(
      '-cid, --commit-id <commitId>',
      'the id of the source git commit for the supplied image uri'
    )
    .option(
      '-cmsg, --commit-message <commitMessage>',
      'the git commit message for the supplied commit id'
    )
    .option(
      '-cdt, --commit-datetime <commitDateTime>',
      'the timestamp of the source git commit for the supplied image uri'
    )
    .option(
      '-author, --author-email <authorEmail>',
      'the git email address of the author of the source git commit'
    )
    .option(
      '-committer, --committer-email <committerEmail>',
      'the git email address of the commiter of the source git commit'
    )
    .option(
      '-repo, --repository-url <repositoryUrl>',
      'the url of the source repository for the supplied image uri'
    )
    .option(
      '-pr, --provider <sourceProvider>',
      'the url of the source repository for the supplied image uri'
    )
    .usage('<block-id> <image uri> [branch] [options]')
    .addHelpText(
      'after',
      `
Example call:
  > push block contensis-app ghcr.io/contensis/contensis-app/build-4359 master --release\n`
    )
    .action(async (blockId: string, imageUri: string, branch: string, opts) => {
      const cli = cliCommand(['push', 'block', blockId], opts);
      const lastIndexOfColon = imageUri.lastIndexOf(':');
      await cli.PushBlock({
        autoRelease: opts.release,
        id: blockId,
        image: {
          uri: imageUri.slice(0, lastIndexOfColon),
          tag: imageUri.slice(lastIndexOfColon + 1) || 'latest',
        },
        projectId: cli.env.currentProject || '',
        source: {
          provider: opts.provider,
          repositoryUrl: opts.repositoryUrl,
          branch,
          commit: {
            id: opts.commitId,
            message: opts.commitMessage,
            dateTime: opts.commitDatetime,
            authorEmail: opts.authorEmail,
            committerEmail: opts.committerEmail,
          },
        },
      });
    });

  return push;
};
