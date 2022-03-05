import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default [
    {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                targets: {
                    // Browsers that support type="module"
                    browsers: [
                        'Chrome >= 61',
                        'Safari >= 11',
                        'iOS => 11',
                        'Firefox >= 60',
                        'Edge => 79'
                    ]
                }
            }
        }
    },
    {
        test: /\.css/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                // CSS Modules
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    modules: {
                        getLocalIdent: '[name]-[local]'
                    }
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        config: 'src/postcss.config.js'
                    }
                }
            }
        ]
    },
    {
        test: /\.html$/,
        use: 'raw-loader'
    }
];