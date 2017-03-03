module.exports = {
    devtool: 'source-map',
    entry: {
        single: './src/main/index.js'
    },
    output: {
        path: '../SportPrice/WebApp/www/libs/single',
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