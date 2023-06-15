/** @type {import('ts-jest').JestConfigWithTsJest} */
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json';

const { paths } = tsconfig.compilerOptions;

const moduleNameMapper = pathsToModuleNameMapper(paths);

const config = {
  moduleNameMapper,
};

export default config;
