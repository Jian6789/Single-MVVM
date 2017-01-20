module.exports = {
    devtool: 'source-map',
    entry: {
        mvvm: './src/main/index.js'
    },
    output: {
        path: './test',
        filename: '[name].js'
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