import path from 'path';
import context from './context';
import entry from './browserEntry';
import output from './browserOutput';
import resolve from './resolve';
import rules from './rules';
import stats from './stats';
import optimization from './optimization';
import plugins from './plugins';
import devtool from './devtool';

module.exports = {
    context,
    entry,
    output,
    mode: 'development',
    target: 'web',
    resolve,
    module: {
        rules
    },
    stats,
    optimization: optimization(false),
    plugins,
    devtool,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout:300,
        poll: 500
    },
    devServer: {
        devMiddleware: {
            writeToDisk: true
        },
        liveReload: true,
        hot: false,
        open: true,
        port: 8080,
        static: {
            watch: true,
            directory: path.join(__dirname, '../build'),
            publicPath: '/build',
            serveIndex: true
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
};