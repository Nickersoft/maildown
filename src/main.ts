import { Command } from 'commander';

import { Generate, Preview } from './commands';

const commander = new Command();

commander.addCommand(Generate);
commander.addCommand(Preview);

commander.parse(process.argv);
