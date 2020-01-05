"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var extract_text_webpack_plugin_1 = __importDefault(require("extract-text-webpack-plugin"));
exports.default = {
    output: {
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: extract_text_webpack_plugin_1.default.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                            },
                        },
                        {
                            loader: 'less-loader',
                        },
                    ],
                    fallback: 'style-loader',
                }),
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    plugins: [new extract_text_webpack_plugin_1.default('styles.css')],
};
