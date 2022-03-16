exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      resolve: {
        fallback: { 
          "os": require.resolve("os-browserify/browser"),
          "path": require.resolve("path-browserify"),
        },
        extensions: ['.js', '.jsx']
      },
      module: {
        rules: [
          {
            test: /component---src-pages-addition-js/,
            use: loaders.null(),
          },
          {
            test: /component---src-pages-addition-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}