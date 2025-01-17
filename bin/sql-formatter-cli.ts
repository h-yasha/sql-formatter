#!/usr/bin/env bun

import fs from 'node:fs';
import tty from 'tty';
import { promisify } from 'util';
import { ArgumentParser } from 'argparse';
import { version } from '../package.json';
import { format, supportedDialects } from '../src/sqlFormatter';

class SqlFormatterCli {
  parser: ArgumentParser;
  args: any;
  cfg: any;
  query: string;

  constructor() {
    this.parser = this.getParser();
    this.args = this.parser.parse_args();
  }

  async run() {
    this.cfg = await this.readConfig();
    this.query = await this.getInput();
    const formattedQuery = `${format(this.query, this.cfg).trim()}\n`;
    this.writeOutput(this.getOutputFile(this.args), formattedQuery);
  }

  getParser() {
    const parser = new ArgumentParser({
      add_help: true,
      description: 'SQL Formatter',
    });

    parser.add_argument('file', {
      metavar: 'FILE',
      nargs: '?',
      help: 'Input SQL file (defaults to stdin)',
    });

    parser.add_argument('-o', '--output', {
      help: 'File to write SQL output (defaults to stdout)',
    });

    parser.add_argument('--fix', {
      help: 'Update the file in-place',
      action: 'store_const',
      const: true,
    });

    parser.add_argument('-l', '--language', {
      help: 'SQL Formatter dialect (defaults to basic sql)',
      choices: supportedDialects,
      default: 'sql',
    });

    parser.add_argument('-c', '--config', {
      help: 'Path to config json file (will use default configs if unspecified)',
    });

    parser.add_argument('--version', {
      action: 'version',
      version,
    });

    return parser;
  }

  async readConfig() {
    if (
      tty.isatty(0) &&
      Object.entries(this.args).every(([k, v]) => k === 'language' || v === undefined)
    ) {
      this.parser.print_help();
      process.exit(0);
    }

    if (this.args.config) {
      try {
        const configFile = await this.readFile(this.args.config);
        const configJson = JSON.parse(configFile);
        return { language: this.args.language, ...configJson };
      } catch (e) {
        if (e instanceof SyntaxError) {
          console.error(`Error: unable to parse JSON at file ${this.args.config}`);
          process.exit(1);
        }
        this.exitWhenIOError(e);
        console.error('An unknown error has occurred, please file a bug report at:');
        console.log('https://github.com/sql-formatter-org/sql-formatter/issues\n');
        throw e;
      }
    }
    return {
      language: this.args.language,
    };
  }

  async getInput() {
    const infile = this.args.file || process.stdin.fd;
    if (this.args.file) {
      try {
        return await this.readFile(infile);
      } catch (e) {
        this.exitWhenIOError(e);
        console.error('An unknown error has occurred, please file a bug report at:');
        console.log('https://github.com/sql-formatter-org/sql-formatter/issues\n');
        throw e;
      }
    } else {
      let stdin = '';

      for await (const line of console) {
        stdin += line;
      }
      return stdin;
    }
  }

  async readFile(filename: string) {
    return promisify(fs.readFile)(filename, { encoding: 'utf-8' });
  }

  exitWhenIOError(e: { code: string }) {
    if (e.code === 'EAGAIN') {
      console.error('Error: no file specified and no data in stdin');
      process.exit(1);
    }
    if (e.code === 'ENOENT') {
      console.error('Error: could not open file');
      process.exit(1);
    }
  }

  getOutputFile(args) {
    if (args.output && args.fix) {
      console.error('Error: Cannot use both --output and --fix options simultaneously');
      process.exit(1);
    }
    if (args.fix && !args.file) {
      console.error('Error: The --fix option cannot be used without a filename');
      process.exit(1);
    }
    if (args.fix) {
      return args.file;
    } else {
      return args.output;
    }
  }

  writeOutput(file, query) {
    if (!file) {
      // No output file, write to console
      process.stdout.write(query);
    } else {
      fs.writeFileSync(file, query);
    }
  }
}

const cli = new SqlFormatterCli();
cli.run();
