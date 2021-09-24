import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';

// formik
import { Formik } from 'formik';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import { 
    StyledContainer,
    InnerContainer,
    PageLogo,
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

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark"/>
                <InnerContainer>
                    <PageLogo 
                        resizeMode="cover"
                        source={require('../assets/images/chatbot-data.png')}/>
                    <PageTitle>Chat Bot</PageTitle>
                    <SubTitle>Đăng nhập</SubTitle>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values) => {
                            setMessage('');
                            if(values.email == '' || values.password == ''){
                                setMessage('Vui lòng điền đầy đủ thông tin');
                                return;
                            }
                            console.log(values);
                            firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                            .then(() => {
                                setMessage('');
                                values.email = email;
                                values.password = password;
                                alert('Đăng nhập thành công');
                                setTimeout(() => navigation.navigate('Welcome'), 1000);
                            })
                            .catch((error) => {
                                setMessage('');
                                if(error.message == 'The password is invalid or the user does not have a password.')
                                    setMessage('Email hoặc mật khẩu không đúng!');
                                if(error.message == 'The email address is badly formatted.')
                                    setMessage('Địa chỉ email sai định dạng');
                                if(error.message == 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.')
                                    setMessage('Đăng nhập thất bại. Kiểm tra lại')
                                console.log(error.message);
                            })

                        }}
                    >{({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea>
                            <MyTextInput 
                                label="Địa chỉ email"
                                icon="mail"
                                placeholder="example@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <MyTextInput 
                                label="Mật khẩu"
                                icon="lock"
                                placeholder="* * * * * * * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox>{message}</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Đăng nhập</ButtonText>
                            </StyledButton>
                            <Line/>
                            <ExtraView>
                                <ExtraText>Bạn chưa có tài khoản? </ExtraText>
                                <TextLink onPress={() => navigation.navigate('Register')}>
                                    <TextLinkContent>Đăng ký</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                    </Formik>
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

export default Login;