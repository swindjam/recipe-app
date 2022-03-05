import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

export default [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new MiniCssExtractPlugin({
        filename: 'css/[name].min.css',
        chunkFilename: 'css/[name].min.css'
    })
];