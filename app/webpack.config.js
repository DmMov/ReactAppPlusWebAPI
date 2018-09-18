const path = require('path');
const webpack = require('webpack');

//#region Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//#endregion

/* --- Configuration var ---*/
const config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        bundle:[ 
            './app.js',
            './main.scss'
        ],
    },
    output: {
        filename: 'Js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.json', '.jpg', '.css', '.scss' ]
    },
    
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use:{ 
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-react', '@babel/preset-env'] 
                    }
                },
                exclude: /node_modules/
            },

            /* --- scss ---*/
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    use:[
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true}
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: true}
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true}
                        }
                    ],
                    fallback: 'style-loader',
                })
            },

            /* --- Image ---*/
            {
                test:/\.(png|gif|jpe?g)/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options:{
                            name:'[path][name].[ext]'
                        }
                    },
                    'img-loader'
                ]
            },

            /* --- fonts --- */
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            name:'[path][name].[ext]'
                        }
                    }
                ]
            },

            /* --- svg --- */
            {
                test: /\.svg/,
                loader: 'svg-url-loader'
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        overlay: true,
        contentBase: './dist',
        historyApiFallback: true,
    },
    
    plugins:[
        new ExtractTextPlugin(
            './Css/[name].css'
        ),
        new CleanWebpackPlugin(['dist'], {exclude:  ['images', 'index.html']}),
        new CopyWebpackPlugin(
            [
                {
                    from:'./images', 
                    to: 'images'
                }
            ],
            {
                ignore:[
                    {
                        glob:'svg/*'
                    }
                ]
            }
        ),

        new ImageminPlugin({
            test: /\.(png|jpe?g|gif|svg)$/
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
};

module.exports = config;
