import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from "../config.json"
import {Helmet} from "react-helmet";

export default function NotFound(){
    return(

        <>  
            <Helmet>
                <meta charSet="utf-8" />
                <title>404</title>
                <link rel="shortcut icon" href="https://cdn.discordapp.com/attachments/691421631700271114/935320323379843192/logo-alura.png" />
            </Helmet>
            <Box
                styleSheet={{
                display: 'flex', alignItems: 'center', flexDirection: 'column',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://images.hdqwalls.com/download/astronaut-in-crypto-city-5k-k0-1600x900.jpg)',
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover', 
                backgroundBlendMode: 'multiply',
                }}
            >
                <Text
                    styleSheet={{
                        color: appConfig.theme.colors.neutrals['000'],
                        fontSize: '240px',
                        fontWeight: '400'
                    }}
                    tag='h1'
                >
                    404
                </Text>
                <Text
                    styleSheet={{
                        fontSize: '24px',
                        color: appConfig.theme.colors.neutrals['000'],
                        marginBottom: '80px'
                    }}
                >Página não encontrada</Text>
                <Text
                styleSheet={{
                    color: appConfig.theme.colors.neutrals['000'],
                    marginTop: '20px',
                    marginBotton: '55px',
                    fontSize: '144px',
                    fontWeight: '700'
                }}
                tag="h1"
                >
                    Ooops!
                </Text>
                <Text
                styleSheet={{
                    color: appConfig.theme.colors.neutrals['000'],
                    fontSize: '25px',
                    fontWeight: '700',
                    marginBottom: '80px',
                    maxWidth: '758px',
                    textAlign: 'center'
                }}
                tag="p"
                >
                    Não conseguimos encontrar a página que você está procurando
                </Text>
            </Box> 
        </>
               
    )
}