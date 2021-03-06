//esse arquivo ira ser carregado em todas as paginas

function GlobalStyle() {
    return (
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 

        @keyframes cor{
          0%{opacity: 0;}
          100%{opacity: 1;}
        }
      `}</style>
    );
}

export default function MyApp({ Component, pageProps }) {
    console.log("Eu estou aqui")
    return (
        <>  
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
  }