import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';

import { 
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    Avatar
} from '../components/styles'

const Welcome = ({navigation}) => {

    const gotoChatRoom = () => {
        setTimeout(() => navigation.navigate('Chatbot'), 10);
    }
    // const [user, setUser] = useState({})
    // firebase.firestore().collection('users')
    // .get()
    // .then((snapshot) => {
    //     const users = []
    //     snapshot.forEach(doc => {
    //         const data = doc.data()
    //         users.push(data);
    //     })
    //     setUser(users);
    //     console.log(snapshot);
    // })
    // .catch((error) => {
    //     console.log(error);
    // })

    return (
        <>
            <StatusBar style="dark"/>
            <InnerContainer>
                <WelcomeContainer>
                    <PageTitle welcome={true}>Chào mừng</PageTitle>
                    <SubTitle welcome={true}>{}</SubTitle>
                    <StyledFormArea>
                        <Avatar 
                            resizeMode="cover"
                            source={require('../assets/images/chatbot-data.png')}/>
                        <Line/>
                        <StyledButton onPress={gotoChatRoom}>
                            <ButtonText>Vào phòng chat</ButtonText>
                        </StyledButton>
                        <StyledButton onPress={() => {
                            firebase.auth().signOut()
                            .then(() => {
                                navigation.navigate('Login');
                            })
                        }}>
                            <ButtonText>Đăng xuất</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};

export default Welcome;