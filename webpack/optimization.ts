import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

export default (minimize = true) => {
    let minimizer = [];

    if (minimize) {
        minimizer = [
            new TerserPlugin({
                terserOptions: {
                    mangle: false,
                    keep_classnames: true,
                    keep_fnames: true
                }
            }),
            new CssMinimizerPlugin()
        ];
    }

    return {
        splitChunks: {},
        minimize,
        minimizer
    };
};