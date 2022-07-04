const path = require("path")
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const srcDir = path.join(__dirname, './src');
module.exports = {
    entry: {
        app: ["@babel/polyfill", "./src/index.tsx"]
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].js",
    },
    devServer:{
        contentBase: __dirname,
        compress: true,//通知 server 是否启用 gzip,强烈建议使用 : 压缩后通常能帮我们减少响应 70% 左右的大小;
        port: 8000,
        host:'localhost',
        useLocalIp: false,
        hot:true,//开启热更新,
        historyApiFallback: true,
        // proxy: {
        //     '!(**/mock/**)': {
        //         target: 'http://192.168.13.116:8080',
        //         changeOrigin: true,
        //         secure: false,
        //         logLevel: 'debug',
        //         cookieDomainRewrite: "",
        //         onProxyReq(proxyReq, req) {
        //             // 设置代理服务的请求头信息，带上cookie，解决跨域登录后访问请求验权问题
        //             newCookie && proxyReq.setHeader('Cookie', newCookie);
        //         },
        //         onProxyRes(proxyRes, req, res) {
        //             //登录后获取cookies信息
        //             var cookies = proxyRes.headers['set-cookie'];
        //             if (cookies) {
        //                 newCookie = cookies[0].split(';')[0];
        //             }
        //             // console.log('-----proxy.onProxyResponse-----', newCookie);
        //         }
        //     }
        // }
    },
    module:{
        rules:[
            {
                test:/\.tsx|ts$/,
                exclude: /node_modules/,
                loader: "babel-loader" // 转化需要的loader
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: "babel-loader" // 转化需要的loader
                    },
                    {
                        loader: "eslint-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                   {
                     loader:MiniCssExtractPlugin.loader,
                     options: {
                        publicPath: '/' //解决图片路径问题
                    }
                   },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    { loader: 'postcss-loader' }
                ]
            },
            {
                test: /\.(less)$/,
                use: [
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/' //解决图片路径问题
                        }
                      },
                    { loader: 'css-loader' },
                    {
                        loader: "less-loader",
                        options: {
                            minimize: true
                        }
                    },
                    { loader: 'postcss-loader' }
                ]
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: "url-loader?limit=1200&name=assets/iconfont/[name].[ext]"
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: "file-loader?name=assets/images/[name].[ext]"
            }
        ]
    },
    resolve:{
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@': srcDir,
            '@pages': `${srcDir}/pages`
        }
    },
    plugins:[]
}