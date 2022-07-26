import { Configuration } from 'webpack';
import path from 'path';

module.exports = {
    core: {
        builder: 'webpack5'
    },
    stories: [
        '../storybook/*.stories.tsx'
    ],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
        '@storybook-mobile'
    ],
    webpackFinal: (config: Configuration) => {
        const context = path.join(__dirname, '/../');

        return {
            ...config,
            module: {
                ...config.module,
                rules: [
                    {
                        test: /\.(ts|tsx)?$/,
                        exclude: /node_modules/,
                        use: 'babel-loader',
                    },
                    {
                        test: /\.css/,
                        include: context + '.storybook',
                        use: [
                            {
                                loader: 'style-loader',
                            },
                            {
                                loader: 'css-loader',
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        config: 'postcss.config.js'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        test: /\.css/,
                        exclude: context + '.storybook',
                        use: [
                            {
                                loader: 'style-loader',
                            },
                            {
                                // CSS Modules
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    modules: {
                                        localIdentName: '[name]-[local]'
                                    }
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        config: 'postcss.config.js'
                                    }
                                }
                            }
                        ]
                    },
                ],
            },
            plugins: (config.plugins || []).filter(plugin => plugin.constructor.name !== 'ProgressPlugin'),
        }
    }
}