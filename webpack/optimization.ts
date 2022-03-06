import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { MinifyOptions } from 'terser';

export default (minimize = true) => {
    let minimizer: (TerserPlugin<MinifyOptions> | CssMinimizerPlugin<CssMinimizerPlugin.CssNanoOptionsExtended>)[] = [];

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