import context from './context';

export default {
    path: context + '/build',
    filename: 'js/front/[name].js',
    chunkFilename: 'js/front/[name].[hash].js',
    publicPath: '/build'
}