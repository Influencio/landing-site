import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const page = await ctx.renderPage()
    return { ...initialProps, ...page }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
