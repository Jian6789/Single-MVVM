module.exports = {
    devtool: 'source-map',
    entry: {
        single: './src/main/index.js'
    },
    output: {
        path: './dist',
        filename: '[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js)$/,
                loader: 'babel-loader'  
            }
        ]
    }
}