import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          (
            <StyleProvider cache={cache}>
              <App {...props} />
            </StyleProvider>
          ),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style data-test="extract" dangerouslySetInnerHTML={{ __html: extractStyle(cache) }} />
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              var ht = null;
              (function(id, scriptSrc, callback) {
                  var d = document,
                      tagName = 'script',
                      $script = d.createElement(tagName),
                      $element = d.getElementsByTagName(tagName)[0];
          
                  $script.id = id;
                  $script.async = true;
                  $script.src = scriptSrc;
          
                  if (callback) { $script.addEventListener('load', function (e) { callback(null, e); }, false); }
                  $element.parentNode.insertBefore($script, $element);
              })('happytalkSDK', 'https://chat-static.happytalkio.com/sdk/happytalk.chat.v2.min.js', function() {
                  ht = new Happytalk({
                    siteId: '1000425805',
                    siteName: 'AI Shorts Maker',
                    categoryId: '180995',
                    divisionId: '180996'
                });
              });
              `,
            }}
          />
        </body>
      </Html>
    );
  }
}
