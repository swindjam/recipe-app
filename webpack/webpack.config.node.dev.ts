import WebpackShellPluginNext from 'webpack-shell-plugin-next';
import context from './context';
import entry from './nodeEntry';
import output from './nodeOutput';
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
    target: 'node',
    resolve,
    module: {
        rules
    },
    node: {
        __dirname: false
    },
    stats,
    optimization: optimization(false),
    plugins: [
        ...plugins,
        new WebpackShellPluginNext({
            onBuildEnd: {
                scripts: [
                    'npm run api'
                ],
                blocking: false,
                parallel: true
            }
        })
    ],
    devtool,
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        poll: 500
    }
};