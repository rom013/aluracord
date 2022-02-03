//https://github.com/supabase/supabase-js

import { Helmet } from "react-helmet";
import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router'
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";
import { format } from 'date-fns' //yarn add date-fns

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMzNDA5MCwiZXhwIjoxOTU4OTEwMDkwfQ.sQ38gxReoWChyVEvJF291dNEfeXB5v8CRvU14P5i51Y"
const SUPABASE_URL = "https://lvuwmzfcykkzjgxdwent.supabase.co"
const supabesClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

//ativar o real time do supabase
function escutaMensagem(addMsg) {
    return supabesClient
        .from('mensagens')
        .on('INSERT', (resLive) => {
            // console.log("houve uma nova mensagem", resLive.new)
            addMsg(resLive.new)
        })
        .subscribe()
}

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = React.useState('')
    const [msgList, setMsgList] = React.useState([])
    const [loading, setLoading] = React.useState(true)


    const roteamento = useRouter()
    const usuarioLogado = roteamento.query.username

    // So chama este useEffect na primeira vez que a pagina carrega

    React.useEffect(() => {
        supabesClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data, status }) => {
                console.log(data, status)
                setLoading(false)
                setMsgList(data)
            })
        escutaMensagem((novaMsg) => {
            console.log(novaMsg)
            setMsgList((valorAtual) => {
                return [
                    novaMsg,
                    ...valorAtual
                ]
            })
        })
    }, [])

    function hendleNewMsg(msgTextfield) {
        const msg = {
            by: usuarioLogado,
            text: msgTextfield,
            data: format(new Date(), 'dd/MM/yyyy - HH:mm')
        }

        supabesClient
            .from('mensagens')
            .insert(msg)
            .then(({ data }) => {
                console.log("a")
            })
        setMensagem('')
    }
    // ./Sua lógica vai aqui
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Aluracord - chat</title>
                <link rel="shortcut icon" href="https://cdn.discordapp.com/attachments/691421631700271114/935320323379843192/logo-alura.png" />
            </Helmet>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: `url(https://images.hdqwalls.com/download/astronaut-in-crypto-city-5k-k0-1600x900.jpg)`,
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                    color: appConfig.theme.colors.neutrals['000']
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        borderRadius: '5px',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        height: '100%',
                        maxWidth: '95%',
                        maxHeight: '95vh',
                        padding: '32px',
                    }}
                >
                    <Header />
                    <Box
                        styleSheet={{
                            position: 'relative',
                            display: 'flex',
                            flex: 1,
                            height: '80%',
                            backgroundColor: appConfig.theme.colors.neutrals[600],
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px',

                        }}
                    >
                        {loading ? <Loading /> : <MessageList mensagens={msgList} batata={setMsgList}/>}


                        {/* {mensagem} */}
                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                value={mensagem}
                                onChange={function (event) {
                                    setMensagem(event.target.value)
                                }}
                                onKeyPress={function (event) {
                                    // console.log(event)
                                    if (event.code == "Enter") {
                                        event.preventDefault()
                                        if (mensagem.length >= 1) {
                                            event.preventDefault()
                                            hendleNewMsg(mensagem)
                                        }
                                    }
                                }}
                                placeholder="Insira sua mensagem aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                            />
                            <Button
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary[500],
                                    mainColorLight: appConfig.theme.colors.primary[600],
                                    mainColorStrong: appConfig.theme.colors.primary[700]
                                }}
                                styleSheet={{
                                    height: "100%",
                                    display: {
                                        sm: "none",
                                        xs: "flex"
                                    }
                                }}
                                iconName="arrowRight"

                                onClick={() => {
                                    if (mensagem.length >= 1) {
                                        hendleNewMsg(mensagem)
                                    }

                                }}
                            />

                            {/* CallBack */}
                            <ButtonSendSticker
                                onStickerClick={(sticker) => {
                                    console.log("enviar pro banco")
                                    hendleNewMsg(`:sticker: ${sticker}`)
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button

                    as="form"
                    variant='tertiary'
                    colorVariant='neutral'
                    styleSheet={{
                        hover:
                        {
                            color: "#fa3b3b",
                            backgroundColor: "rgb(157 67 67 / 80%)"
                        }

                    }}
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}
function Loading() {
    return (
        <Box
            styleSheet={{
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                color: "#fff"
            }}
        >
            <Box
                tag='spam'
                styleSheet={{
                    width: '100%',
                    height: '50px',
                    borderRadius: '5px',
                    marginBottom: '16px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    animation: "cor 1s linear infinite alternate-reverse",
                    animationDelay: '.8s'
                }}
            />
            <Box
                tag='spam'
                styleSheet={{
                    width: '100%',
                    height: '50px',
                    borderRadius: '5px',
                    marginBottom: '16px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    animation: "cor 1s linear infinite alternate-reverse",
                    animationDelay: '.2s'
                }}
            />
            <Box
                tag='spam'
                styleSheet={{
                    width: '100%',
                    height: '50px',
                    borderRadius: '5px',
                    marginBottom: '16px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    animation: "cor 1s linear infinite alternate-reverse",
                    animationDelay: '1s'
                }}
            />
            <Box
                tag='spam'
                styleSheet={{
                    width: '100%',
                    height: '50px',
                    borderRadius: '5px',
                    marginBottom: '16px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    animation: "cor 1s linear infinite alternate-reverse",
                    animationDelay: '.5s'
                }}
            />
        </Box>
    )
}
function api(mensagens) {
    console.log("olha ", mensagens)
    return mensagens
}
function MessageList(props) {
    //console.log(props.mensagens);

    function deleteMessage(messageId) {
        const newMessageList = props.mensagens.filter((message) => {
            return messageId != message.id
        })
        supabesClient
            .from('mensagens')
            .delete()
            .match({id: messageId})
            .then((res)=>{
                console.log("ok")})
        return props.batata(newMessageList)
    }

    return (
        <Box
            tag="ul"
            styleSheet={{
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                //color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                overflow: 'auto',
            }}
        >
            {props.mensagens.map((mensagens) => {

                return (
                    <Text
                        key={mensagens.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >

                            <div
                            // styleSheet={{
                            //     display: 'inline-block'
                            // }}
                            >
                                <img
                                    src={`https://github.com/${mensagens.by}.png`}
                                />



                                {/* <PerfilUser/> */}
                                <Text tag="strong"
                                    styleSheet={{
                                        marginLeft:"10px"
                                    }}
                                >
                                    {mensagens.by}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {mensagens.data}
                                    {/* {(new Date().toLocaleDateString())} */}
                                </Text>
                                <span>
                                <Button
                                    variant="tertiary"
                                    iconName="trash"
                                    colorVariant="neutral"
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        deleteMessage(mensagens.id)}}
                                    styleSheet={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '20px',
                                        height: '1%',
                                        width: '2%',
                                        color: appConfig.theme.colors.neutrals[400],
                                        hover: {
                                            backgroundColor: 'transparent'
                                        }
                                    }}
                               />
                                </span>
                            </div>
                            <style jsx>{`
                                img{
                                    width: 20px;
                                    height: 20px;
                                    border-radius: 50%
                                }
                                div{
                                    margin-right: 5px;
                                    cursor: pointer;
                                    display: flex;
                                    margin-right: 5px;
                                    cursor: pointer;
                                    width: 100%;
                                    justify-content: flex-start;
                                    align-items: center
                                }
                                div:hover span{
                                    display: flex
                                }
                                span{
                                    display: none;
                                    margin-left: 70px;
                                    position: relative;
                                    margin-top: -70px;
                                }

                            `}</style>
                        </Box>
                        { }
                        {/* {mensagens.text.startsWith(':sticker:').toString()} */}
                        {mensagens.text.startsWith(':sticker:') ? <Image src={mensagens.text.replace(':sticker:', '')} /> : mensagens.text}

                    </Text>
                )
            })}
        </Box>
    )
}





/*
    /==================================================\

    onChange - evento que executa quando há alguma alteração
    onChange={(event)=>{}}


    ***Operador ternario***

    var verdade = false
    verdade ? console.log("verdade") : console.log("falso")
    //falso
*/


//https://github.com/Taylor-2T9/aluracord-matrix/blob/main/pages/chat.js
//https://github.com/bpcosta2003/aluracord/tree/master/pages

/*fetch(`https://api.github.com/users/${mensagens}`)
        .then((valueApi)=>{return valueApi.json()})
        .then((valueJson)=>{console.log(valueJson.followers)})s */