import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import { 
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    Colors,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from '../components/styles'
import { Button, View } from 'react-native';

const { brand, darkLight, primary } = Colors;

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Register = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const onSignUp = () => {
        if(name == '' || email == '' || password == '') {
            setMessage('Vui lòng điền đầy đủ thông tin');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email,
                password,
            })
            console.log(result);
            setMessage('');
            setName('');
            setEmail('');
            setPassword('');
            navigation.navigate('Login');
            alert('Đăng ký thành công');
        })
        .catch((error) => {
            setMessage('');
            if(error.message == 'The email address is already in use by another account.')
                setMessage('Email này đã được sử dụng');
            if(error.message == 'The email address is badly formatted.')
                setMessage('Địa chỉ email sai định dạng')
            if(error.message == 'Password should be at least 6 characters')
                setMessage('Mật khẩu tối thiểu 6 kí tự')
            console.log(error.message);
            
        })
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark"/>
                <InnerContainer>
                    <PageTitle>Chat Bot</PageTitle>
                    <SubTitle>Đăng ký</SubTitle>
                        <StyledFormArea>
                            <MyTextInput 
                                label="Họ tên"
                                icon="person"
                                placeholder="Example"
                                placeholderTextColor={darkLight}
                                onChangeText={setName}
                                value={name}
                            />
                            <MyTextInput 
                                label="Địa chỉ email"
                                icon="mail"
                                placeholder="example@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={setEmail}
                                value={email}
                                keyboardType="email-address"
                            />
                            <MyTextInput 
                                label="Mật khẩu"
                                icon="lock"
                                placeholder="* * * * * * * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                            />
                            <MsgBox>{message}</MsgBox>
                            <StyledButton onPress={() => onSignUp()}>
                                <ButtonText>Đăng ký</ButtonText>
                            </StyledButton>
                            <Line/>
                            <ExtraView>
                                <ExtraText>Bạn đã có tài khoản? </ExtraText>
                                <TextLink onPress={() => navigation.navigate('Login')}>
                                    <TextLinkContent>Đăng nhập</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
}

export default Register;