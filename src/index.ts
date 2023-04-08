import 'dotenv/config';
import axios from 'axios';
import { Command } from 'commander';

const getOptions = (): { path: string } =>
  new Command()
    .requiredOption(`-p, --path [path]`, 'path from baseUrl')
    .parse(process.argv)
    .opts();

const main = async () => {
  try {
    const options = getOptions();
    const response = await axios.get(
      `${process.env.BASE_URL}${options['path']}`,
      {},
    );
    console.log('result', response.data);
    console.log('done!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
