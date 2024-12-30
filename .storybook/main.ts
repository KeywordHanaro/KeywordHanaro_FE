// import type { StorybookConfig } from '@storybook/nextjs';
// const config: StorybookConfig = {
//   stories: [
//     '../stories/**/*.mdx',
//     '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
//   ],
//   addons: [
//     '@storybook/addon-onboarding',
//     '@storybook/addon-essentials',
//     '@chromatic-com/storybook',
//     '@storybook/addon-interactions',
//   ],
//   framework: {
//     name: '@storybook/nextjs',
//     options: {},
//   },
//   staticDirs: ['../public'],
// };
// export default config;
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    // 'next/navigation'을 모킹 파일로 대체
    config.resolve.alias['next/navigation'] = path.resolve(
      __dirname,
      'mocks/nextNavigation.ts'
    );

    return config;
  },
};
export default config;
