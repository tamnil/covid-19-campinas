const path = require("path");

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const ExtraWatchWebpackPlugin = require("extra-watch-webpack-plugin");

const VueLoaderPlugin = require('vue-loader/lib/plugin')

const appPath = ".";

module.exports = {
    entry: [`${appPath}/src/js/index.js`],
    output: {
        filename: `assets/js/index.js`,
        // path: path.resolve(__dirname, "./hello")
        path: path.resolve(__dirname, `${appPath}`)
    },
	devtool: "sourcemap",
	mode:"development",

    module: {
        rules: [
	    //     {
            //     test: /\.vue$/,
            //     loader: 'vue-loader'
            // },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },

            // {
            //     test: /\.scss$/,
            //     use: [
            //         // {
            //         //   loader: "style-loader"
            //         // },
            //         {
            //             loader: MiniCssExtractPlugin.loader
            //         },
            //         {
            //             loader: "css-loader",
            //             options: {
            //                 sourceMap: true
            //             }
            //         },
            //         {
            //             loader: "sass-loader",
            //             options: {
            //                 sourceMap: true
            //             }
            //         }
            //     ]
            // },
            //
            // {
            //     test: /\.(woff2?|ttf|otf|eot)$/,
            //     exclude: /node_modules/,
            //     loader: "file-loader",
            //     options: {
            //         name: "[name].[ext]",
            //         outputPath: `assets/fonts`,
            //         publicPath: "../fonts"
            //     }
            // },
            // {
            //     test: /\.(svg)$/,
            //     exclude: /node_modules/,
            //     loader: "file-loader",
            //     options: {
            //         name: "[name].[ext]",
            //         outputPath: `assets/svg`,
            //         publicPath: "../svg"
            //     }
            // }, {
            //
	    //         test: /\.css$/,
            //     use: [
            //         'vue-style-loader',
            //         'css-loader'
            //     ]
            // }
        ]
    },

    plugins: [
	   // new VueLoaderPlugin(),
        // extract css into dedicated file
        // new MiniCssExtractPlugin({
        //     filename: "./assets/css/style.css"
        // }),
        new BrowserSyncPlugin(
            {
                // browse to http://localhost:3000/ during development,
                // ./public directory is being served
                // host: "katana.lan",
                // port: 80,
                // server: { baseDir: ["public"] },
                proxy: "http://katana.lan/"
            },

            {
                // prevent BrowserSync from reloading the page
                // and let Webpack Dev Server take care of this
                // reload: false,
                injectCss: true
            }
        ),
        // new ExtraWatchWebpackPlugin({
            // files: ["./wordpress/wp-content#<{(||)}>#*.php"]
            // dirs: [ 'path/to/dir' ],
        // }),
    ],

    optimization: {
        minimizer: [
            // enable the js minification plugin
            new UglifyJSPlugin({
                cache: true,
                parallel: true
            }),
            // enable the css minification plugin
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false
                    }
                }
            })
        ]
    }
};
