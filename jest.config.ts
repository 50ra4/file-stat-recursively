import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^(.*).js$': '$1',
  },
};

export default config;
