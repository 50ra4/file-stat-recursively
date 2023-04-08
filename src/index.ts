import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { Command } from 'commander';
import { format } from 'date-fns';

const getOptions = (): { target: string; output: string } =>
  new Command()
    .option(
      '-t, --target [target]',
      'target directory',
      path.join(process.cwd(), 'src'),
    )
    .option(
      '-o, --output [output]',
      'output directory',
      path.join(process.cwd(), 'outputs'),
    )
    .parse(process.argv)
    .opts();

const getFilenames = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
    const joined = path.join(dir, dirent.name);
    return dirent.isFile() ? [joined] : getFilenames(joined);
  });

const main = async () => {
  try {
    const { target, output } = getOptions();
    const filenames = getFilenames(target);
    const fileStats = filenames.map((filename) => ({
      filename,
      stat: fs.statSync(filename),
    }));

    if (!fs.existsSync(output)) {
      fs.mkdirSync(output);
    }

    const outputFile = path.join(
      output,
      `${format(new Date(), 'yyyy-MM-dd_HH:mm:ss.SSS')}.json`,
    );

    fs.writeFileSync(outputFile, JSON.stringify(fileStats, null, '  '));

    console.log('completed!!', outputFile);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
