import {Helmet} from "react-helmet";
import appConfig from "../config.json"
import { Box, Button, Text, TextField, Image } from '@skynexui/components';

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
      `}</style>
    );
}

function Title(props){
    console.log(props.tag)
    const Tag = props.tag || "h1"
    return(
        <>
            <Tag>{props.children}</Tag>

            <style jsx>{`
            ${Tag}{
                color: ${appConfig.theme.colors.neutrals["000"]};
                font-size: 24px;
                font-weight: 700;
                user-select: none   
            }
            `}
            </style>
        </>
/*tag vazia, é usada para que o JSX tenha um elemento pai para rodar, sem um elemento pai o style não funciona,
 mas no console essa tag vazia não aparece*/
        
    )
}

function HomePage() {
    // return (
    // <div>
    //     
    //     <GlobalStyle/>
    //     <Title tag="h1">Boas vindo de volta!</Title>
    //     <h2>Discord - Alura Matrix</h2>


        
    // </div>  
    // )//parenteses usado para quebra de linha

    const username = 'Rom013';
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{appConfig.name}</title>
                <link rel="shortcut icon" href="https://cdn.discordapp.com/attachments/691421631700271114/935320323379843192/logo-alura.png" />
            </Helmet>
            <GlobalStyle />
            <Box
                styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://images.hdqwalls.com/download/astronaut-in-crypto-city-5k-k0-1600x900.jpg)',
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover', 
                // backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        alignItems: 'center',
                        backgroundColor: appConfig.theme.colors.neutrals["700"],
                        borderRadius: '5px',
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        flexDirection: {
                        sm: 'row',
                        xs: 'coluns'
                        },
                        justifyContent: 'space-between',
                        maxWidth: '700px',
                        padding: '32px',
                        width: '100%',
                        margin: "16px"
                    }}
                >


                {/* Formulario */}
                    <Box
                    styleSheet={{
                        alignItems: 'center',
                        dispaly: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        margimBottom: '32px',
                        textAlign: 'center',
                        width: {
                        sm: '50%',
                        xs: '100%'
                        }
                    }}
                    tag="form"
                    >
                        <Title>Boas vindas de volta!</Title>
                        <Text
                            styleSheet={{
                                color: '#9AA5B1',
                                'font-weight': 'bold',
                                fontSize: '14px',
                                marginBottom: '32px'
                            }}
                            tag="p"
                            variant="body3"
                            >
                                {appConfig.name}
                        </Text>


                        <TextField
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                textColor: appConfig.theme.colors.neutrals[200],
                                mainColor: appConfig.theme.colors.neutrals[900],
                                mainColorHighlight: appConfig.theme.colors.primary[500],
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>

                {/* Formulario */}
                {/* Imagem */}
                <Box
                    styleSheet={{
                        background: appConfig.theme.colors.neutrals[800],
                        border: '1px solid',
                        borderColor: appConfig.theme.colors.neutrals[999],
                        borderRadius: '10px',
                        color: appConfig.theme.colors.neutrals['000'],
                        display: {
                            xs: 'none',
                            sm: 'flex'
                        },
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        maxWidth: '200px',
                        minHeight: '240px',
                        padding: '16px 26px',
                        flex: 1
                    }}
                >
                    <Image
                        src="https://avatars.githubusercontent.com/u/81822722?v=4"
                        styleSheet={{
                            borderRadius: '50%',
                            marginBottom: '32px'
                        }}
                    />
                    <Text
                        styleSheet={{
                            backgroundColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '1000px',
                            color: appConfig.theme.colors.neutrals['000'],
                            fontSize: '12px',
                            fontWeight: 700,
                            padding: '3px 10px'
                        }}
                        tag="h2"
                        variant="body4"
                    >
                        {username}
                    </Text>
                </Box>
                
                {/* Imagem */}

                </Box>
            </Box>
        </>
    )
  }
  
  export default HomePage