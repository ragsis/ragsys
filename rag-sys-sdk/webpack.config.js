const path = require('path');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: './src/index.ts',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProduction ? '[name].js' : '[name].js',
        library: 'aiAgentProject',
        libraryTarget: 'umd',
    },
    devServer: {
        open: true,
        host: 'localhost',
        hot: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'self': 'globalThis',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: !isProduction,
                    compilerOptions: {
                        noEmitOnError: isProduction,
                    },
                },
            }
            ,
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        fallback: {
            assert: require.resolve('assert/'),
            buffer: require.resolve('buffer/'),
            crypto: require.resolve('crypto-browserify'),
            domain: require.resolve('domain-browser'),
            events: require.resolve('events/'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
            punycode: require.resolve('punycode/'),
            querystring: require.resolve('querystring-es3'),
            stream: require.resolve('stream-browserify'),
            string_decoder: require.resolve('string_decoder/'),
            sys: require.resolve('util/'),
            timers: require.resolve('timers-browserify'),
            tty: require.resolve('tty-browserify'),
            url: require.resolve('url/'),
            util: require.resolve('util/'),
            vm: require.resolve('vm-browserify'),
            zlib: require.resolve('browserify-zlib'),
            fs: false,
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimize: isProduction,
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
