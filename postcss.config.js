module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                'last 5 versions',
                'iOS >= 8',
                'Safari >= 8'
            ]
        })
    ]
}