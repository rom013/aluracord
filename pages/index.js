import {Helmet} from "react-helmet";
import appConfig from "../config.json"
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react'
import { useRouter } from 'next/router' //hook

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

export default function HomePage() {
    
    const [username, setUsername] = React.useState('rom013')
    
    /*
        React.useState retorna uma array

        username = primeiro valor é uma string (useState = hook) (= valor de saida)
        setUsername = segundo valor é uma function q altera o array (= valor de entrada)
    */

    const [name, setName] = React.useState()

    React.useEffect(()=>{
        fetch(`https://api.github.com/users/${username}`)
            .then(function(res){return res.json()})
            .then(function(resThen){
                setName(resThen.name)
        } )
    })

    const roteamento = useRouter()

   
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{appConfig.name}</title>
                <link rel="shortcut icon" href="https://cdn.discordapp.com/attachments/691421631700271114/935320323379843192/logo-alura.png" />
            </Helmet>

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
                    as="form"

                    onSubmit={function(infoEvent){
                        infoEvent.preventDefault()
                        
                        roteamento.push(`/chat?username=${username}`)
                    }}
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
                            value = {username}
                            onChange = {function Handler(e){
                                // Onde está o valor??
                                const value = e.target.value
                                // alterar o valor com react
                                setUsername(value)
                            }}
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
                        
                        
                        <Text
                            styleSheet={{
                                marginBottom: '10px',
                                color: appConfig.theme.colors.neutrals["000"],
                            }}
                            tag="p"
                        >
                            {username.length == 0 ? "O campo de usuario esta vazio" : ''}
                        </Text>

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
                        borderColor: "#4EA8DE",
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
                        flex: 1,
                        boxShadow: '0 0 2px #fff, 0 0 5px #4EA8DE, 0 0 5px #4EA8DE, 0 0 5px #4EA8DE'
                    }}
                >
                    <Image
                        src={`https://github.com/${username}.png`}
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
                        tag="span"
                        variant="body4"
                    >
                        {username}
                    </Text>
                    <Text
                        styleSheet={{
                            backgroundColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '1000px',
                            color: appConfig.theme.colors.neutrals['000'],
                            fontSize: '12px',
                            fontWeight: 700,
                            padding: '3px 10px',
                            marginTop: "10px"
                        }}
                        tag="span"
                        variant="body4"
                    >
                        {name}
                    </Text>
                </Box>
                
                {/* Imagem */}

                </Box>
            </Box>
        </>
    )
}

//export default HomePage