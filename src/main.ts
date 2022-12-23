import { Command } from 'commander';

import { Generate } from './commands';

const commander = new Command();

commander.addCommand(Generate);

commander.parse(process.argv);
