import {View} from 'react-native';
import {
    Button, 
    Box, 
    Stack, Text, Input, Checkbox,
    FormControl,
    Select,
    useToast } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { FC, useState } from 'react';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import type { registerData, errorMessage } from '@type';
import axios from 'axios'
import ApiClient from '@api';

const RegisterPage: FC = () => {
    const navigation = useNavigation<GenericNavigationProps>();
    const toast = useToast()
    const [showPass, setShowPass] = useState(false)
    const handleShowPass = () => setShowPass(!showPass);
    const [formData, setData] = React.useState<registerData>({
        fullName: {
            firstName: '',
            lastName: '',
        },
        phone: '',
        email: '',
        password: '',
        role: 'CUSTOMER'
    });
    const [confirmPass, setConfirmPass] = React.useState('')
    const [errors, setErrors] = React.useState<errorMessage>({
        title: '',
        password: '',
    });

    const validate = () => {
        if (formData.fullName.firstName.length <= 0 && 
            formData.fullName.lastName.length <= 0 && 
            formData.phone.length <= 0 && 
            formData.email.length <= 0 &&
            formData.password.length <= 0 &&
            confirmPass.length <= 0) {
            setErrors({ ...errors,
                title: 'Field is required'
            });
            return false;
        } else if (confirmPass !== formData.password){
            setErrors({ ...errors,
                password: 'Password does not match'
            });
        }
        return true;    
    };
    const sendResData = async () => {
        await ApiClient.post('http://10.0.2.2:3001/auth/register', formData)
        .then(async (res) => {
            console.log(res.data);
            await toast.show({
                placement: 'top',
                render: () => {
                    return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={1}>
                                <Text>Sign-Up Completed</Text>
                        </Box>;
                    }
                });
            navigation.navigate('Main', {screen: 'Login'})
        })
        .catch(err => {
            console.log(err)
            toast.show({
                placement: 'top',
                render: () => {
                    return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={1}>
                                <Text>Error</Text>
                        </Box>;
                    }
                });
        });
        console.log(formData);
        
    }
    const onSubmit = () => {
        validate() ? 
            sendResData()
            : 
            console.log('Validation Failed');
    };
    return (
        <CSafeAreaView>
            <Box w='90%' h='100%' mx='auto' display='flex' justifyContent='center'>
                <Box w='100%'h='15%' display='flex' alignItems='center' justifyContent='center'>
                    <Text fontSize='40' fontWeight='bold'>Sign Up</Text>
                </Box>
                <KeyboardAwareScrollView>
                    <Stack space={4} w="100%" mx="auto">
                        <FormControl isRequired >
                            <Input h='60px' 
                                placeholder="First name*" 
                                onChangeText={value => setData({ ...formData,
                                    fullName: {firstName: value, lastName: ''}
                                })} 
                                mb={2}
                                borderRadius='7px'
                            />
                                {errors.title ? errors.title : undefined }
                            <Input h='60px' 
                                placeholder="Last name*" 
                                onChangeText={value => setData({ ...formData,
                                    fullName: {firstName: formData.fullName.firstName, lastName: value}
                                })} 
                                mb={2}
                                borderRadius='7px'
                            />
                            <Input h='60px' 
                                placeholder="Phone" 
                                onChangeText={value => setData({ ...formData,
                                    phone: value
                                })} 
                                mb={2}
                                borderRadius='7px'
                            />
                                {errors.title ? errors.title : undefined }
                            <Input h='60px' 
                                placeholder="Email" 
                                onChangeText={value => setData({ ...formData,
                                    email: value
                                })} 
                                borderRadius='7px'
                                mb={2}
                            />
                                {errors.title ? errors.title : undefined }
                            <Input h='60px' borderRadius='7px' mb={2} variant='outline' placeholder='Password'
                                type={showPass ? "text" : "password"}
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
                                onChangeText={value => setData({ ...formData,
                                    password: value
                                })} 
                            /> 
                                {errors.password ? errors.password  : undefined}
                            <Input h='60px' borderRadius='7px' mb={3} variant='outline' placeholder='Confirm Password'
                                type={showPass ? "text" : "password"}
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
                                onChangeText={value => setConfirmPass(value)}
                            />
                            <Select selectedValue={formData.role} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                                bg: "teal.600",
                            }} mt={1} 
                                onValueChange={itemValue => setData({ ...formData,
                                    role: itemValue
                                })} 
                            >
                                <Select.Item label="Customer" value="CUSTOMER" />
                                <Select.Item label="Interpreter" value="INTERPRETER" />
                                </Select> 
                        </FormControl>
                        <Button 
                            backgroundColor='red.400'
                            rounded='md'
                            h='60px'
                            mt={3}
                            _text={{color: 'white', fontWeight: 'bold', fontSize: '22', letterSpacing: '2'}}
                            onPress={onSubmit}
                        >
                            Create Account
                        </Button>
                    </Stack>
                </KeyboardAwareScrollView>
                <Box w='100%' h='10%' display='flex' flexDirection='row' alignItems='center'>
                    <Text fontSize='20'>Already have an Account?</Text>
                    <Button 
                        ml='auto'
                        onPress={() => navigation.navigate('Main', {screen: 'Login'})}
                        colorScheme='blue'
                        _text={{fontSize: '20', fontWeight: 'bold'}}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </CSafeAreaView>
    )
} 
export default RegisterPage