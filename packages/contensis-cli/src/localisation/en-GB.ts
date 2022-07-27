import { Logger } from '~/logger';

export const LogMessages = {
  app: {
    contensis: () => 'Contensis',
    quit: () => `Goodbye 👋\n`,
    startup: () =>
      `© 2001-${new Date().getFullYear()} Zengenti 🇬🇧. \n - Creators of Contensis and purveyors of other fine software\n\n👋 Welcome to the contensis-cli\n`,
    help: () =>
      'Press [CTRL]+[C] or type "quit" to return to your system shell\nPress [TAB] for suggestions\n',
    suggestions: () =>
      `\n${Logger.errorText('>>')} Press [TAB] for suggestions\n`,
    autocomplete: () => `\n${Logger.errorText('>>')} Available commands:`,
    unknownError: () => `Something went wrong...`,
  },
  command: {
    notKnown: (command: string) => `${command} is not known`,
  },
  envs: {
    found: (num: number) =>
      `environments store found containing ${num} environment${
        num === 1 ? '' : 's'
      }`,
    tip: () =>
      `Connect to a Contensis cloud instance using "contensis connect {cms alias}"`,
  },
  connect: {
    command: {
      name: () => 'connect',
      example: () => `Example call:\n  > connect example-dev`,
    },
    args: {
      alias: {
        name: () => '<alias>',
        description: () => 'the Contensis Cloud alias to connect with',
      },
    },
    noEnv: () => `Cannot connect - no environment alias specified`,
    unreachable: (url: string, status: number) =>
      `Cannot reach ${url}${status ? ` - status ${status}` : ''}`,
    connected: (env: string) => `Current environment set to "${env}"`,
    help: () =>
      `Connect to a Contensis cloud instance using "contensis connect {cms alias}"`,
    projects: () => `Available projects:`,
    noProjects: () => `Cannot retrieve projects list`,
    tip: () =>
      `Introduce yourself with "login {username}" or "login {clientId} -s {secret}"`,
  },
  login: {
    command: {
      name: () => 'login',
      usage: () => `<user/clientId> [password] [-s <sharedSecret>]`,
      example: () =>
        `Example call:\n  > login myuserid\n  -- or --\n  > login {clientId} -s {sharedSecret}`,
    },
    args: {
      user: {
        name: () => '<user/clientId>',
        description: () => 'the username to login with',
      },
      password: {
        name: () => '[password]',
        description: () =>
          'the password to use to login with (optional/insecure)',
      },
      secret: {
        name: () => '-s --sharedSecret <sharedSecret>',
        description: () =>
          'the shared secret to use when logging in with a client id',
      },
    },
    passwordPrompt: (env: string, userId: string) =>
      `Enter password for ${userId}@${env}:`,
    failed: (env: string, userId: string) =>
      `Unable to login to ${env} as ${userId}`,
    success: (env: string, userId: string) =>
      `User ${userId} connected to ${env} successfully\n`,
    noEnv: () => `No environment set, use "contensis connect {alias}" first`,
    noUserId: () => `No user id specified`,
  },
  projects: {
    list: () => `Available projects:`,
    noList: () => `Cannot retrieve projects list`,
    set: (projectId: string) => `Current project is set to "${projectId}"`,
    failedSet: (projectId: string) => `Project "${projectId}" not found`,
  },
  contenttypes: {
    list: (projectId: string) => `Content types in "${projectId}":`,
    noList: (projectId: string) =>
      `[${projectId}] Cannot retrieve content types list`,
    get: (projectId: string, contentTypeId: string) =>
      `[${projectId}] Content type "${contentTypeId}"`,
    failedGet: (projectId: string, contentTypeId: string) =>
      `[${projectId}] Unable to get content type "${contentTypeId}"`,
  },
  components: {
    list: (projectId: string) => `Components in "${projectId}":`,
    noList: (projectId: string) =>
      `[${projectId}] Cannot retrieve components list`,
    get: (projectId: string, componentId: string) =>
      `[${projectId}] Component "${componentId}"`,
    failedGet: (projectId: string, componentId: string) =>
      `[${projectId}] Unable to get component "${componentId}"`,
  },
  version: {
    set: (env: string, versionStatus: string) =>
      `[${env}] Content version status set to "${versionStatus}"`,
    invalid: (versionStatus: string) =>
      `Content version status "${versionStatus}" is not valid, allowed values are "published" or "latest".`,
    noEnv: () =>
      `No Contensis environment set, connect to your Contensis cloud instance using "contensis connect {cms alias}"`,
  },
  keys: {
    list: (env: string) => `[${env}] API keys:`,
    noList: (env: string) => `[${env}] Cannot retrieve API`,
    created: (env: string, name: string) =>
      `[${env}] Created API key "${name}"`,
    failedCreate: (env: string, name: string) =>
      `[${env}] Unable to create API key "${name}"`,
    removed: (env: string, id: string) => `[${env}] Deleted API key "${id}"`,
    failedRemove: (env: string, id: string) =>
      `[${env}] Unable to delete API key "${id}"`,
  },
};
