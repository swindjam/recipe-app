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
    mode: 'production',
    target: 'web',
    resolve,
    module: {
        rules
    },
    stats,
    optimization: optimization(true),
    plugins,
    devtool
};