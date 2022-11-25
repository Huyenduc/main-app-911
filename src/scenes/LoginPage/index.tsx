import { 
    View,
    Button,
    Link,
    Box,
    Stack, 
    Input, useToast } from 'native-base';
import React, { FC, useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable } from 'react-native';
import type { UserLogin } from '@redux/reqres/types';
import { loginUserRequest } from '@redux/actions';
import { useDispatch } from 'react-redux';
import styles from '@scenes/LoginPage/styles';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import axios from 'axios'
import ApiClient from '@api';

const LoginPage: FC = () => {
    const dispatch = useDispatch()
    const toast = useToast()
    const navigation = useNavigation<GenericNavigationProps>();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = React.useState(false);
    const [payloadLogin, setPayloadLogin] = React.useState<UserLogin>({
        // dataLogin: {
            email: '',
            password: ''
        // }
    })
    const handleShowPass = () => setShowPass(!showPass);
    const onLogin = async () => {
        console.log(payloadLogin);
        // dispatch(loginUserRequest({email: username, password: passWord}))
        ApiClient.post('http://10.0.2.2:3001/auth/login', payloadLogin)
        .then(res => {
            console.log(res.data)
            toast.show({
                placement: 'top',
                render: () => {
                    return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={1}>
                                <Text>Sign-In Successful</Text>
                        </Box>;
                    }
                });
                navigation.navigate('Main', {screen: 'MainPage'})
        })
        .catch(err =>  {
            console.log(err)
            toast.show({
                placement: 'top',
                render: () => {
                    return <Box bg="red.500" color='white' px="2" py="1" rounded="sm" mb={1}>
                                <Text>Sign-In Error</Text>
                        </Box>;
                    }
                });
        })
            
    }
    return (
    <Box style={styles.container}>
        <Box style={styles.headerInner}>
            <Text style={styles.title}>Sign In</Text>
        </Box>
        <Box style={styles.centerInner}>
            <Box style={styles.formView} mb={5}>
            <Stack space={4} w="100%" mx="auto">
                <Input 
                    size='xl'
                    borderRadius='7px'
                    h='60px'
                    variant="outline" 
                    placeholder="Username or email"
                    onChangeText={value => setPayloadLogin({...payloadLogin, email: value})}
                    // onChangeText={text => setPayloadLogin({dataLogin: {email: text, password: ''}})}
                />
                <Input 
                    mt={2}
                    size='xl'
                    borderRadius='7px'
                    h='60px'
                    variant="outline" 
                    placeholder="Password" 
                    type={showPass ? "text" : "password"}
                    onChangeText={value => setPayloadLogin({...payloadLogin, password: value})}
                    InputRightElement={
                        <Button 
                            size="xs" 
                            rounded="md" 
                            colorScheme='blue'
                            variant='ghost'
                            w="1/5" h="full" _text={{fontSize: '14'}}
                            onPress={handleShowPass}>
                        {showPass ? "Hide" : "Show"}
                    </Button>} 
                />
            </Stack>
            </Box>
            <Box
                mt={8}
                style={styles.loginButtonSection}
            >
                <Button 
                    backgroundColor='red.400'
                    rounded='md'
                    h='60px'
                    onPress={onLogin}
                    _text={{color: 'white', fontWeight: 'bold', fontSize: '22', letterSpacing: '2'}}
                >
                    Sign In
                </Button>
                <Box mt={5} style={styles.centerLink} >
                    <Link href="" _text={{fontSize: '15', textDecoration: 'none', color: 'blue.500'}}>
                        Forgot password?
                    </Link>
                </Box>
            </Box>
        </Box>
        <Box style={styles.footerInner}>
            <Text style={styles.createLabel}>Don't have an account?</Text>
            <Box style={styles.buttonContainer}>
                <Button 
                    colorScheme="success"
                    rounded="md"
                    _text={{fontSize: '18'}}
                    onPress={() => navigation.navigate('Main', {screen: 'Register'})}
                >
                    Create New
                </Button>
            </Box>
            
        </Box>
    </Box>
  );
};
export default LoginPage;
