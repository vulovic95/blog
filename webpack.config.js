var path= require("path");
var webpack= require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractPlugin = new ExtractTextPlugin({
	filename: "main.css"
});
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");

var SRC_DIR = path.resolve(__dirname, "src");

var config = {
	entry: SRC_DIR + "/js/app.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		publicPath:"/"
	},
	module: {  
		rules:[
			{
				test: /\.js?$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["es2015", "react", "stage-2","env"]
						}
					}
				]
			}, 
			{
				test: /\.scss$/,
				use: extractPlugin.extract({
					use: ["css-loader","sass-loader"]
				})
			},
			{
				test: /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.(jpe?g|gif|png|svg|pdf|ico)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "img/"
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: [
				{
					loader: "file-loader",
					options: {
						name: "[name].[ext]"
					}
				}
				],
				exclude: path.resolve(__dirname, "src/index.html")
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$:"jquery",
			jQuery:"jquery"
		}),
		extractPlugin,
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "src/index.html"
		}),
		new CleanWebpackPlugin(["dist"])
	],
	devServer: {
		historyApiFallback:true
	}
}
if(process.env.NODE_ENV==="production"){
	config.plugins.push(
		new webpack.DefinePlugin({
			"process.env" : {
				"NODE_ENV": JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new CopyWebpackPlugin([
       { from: './src/img/' },
       { from: './src/img/upload/' }
    ]),
		new webpack.optimize.UglifyJsPlugin()
	)
}

module.exports =  config;