import { StyleSheet } from 'react-native';
import { blob } from 'stream/consumers';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    headerInner: {
        width: '90%',
        height: '15%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    centerInner:{
        // backgroundColor: 'salmon',
        width: '90%',
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formView:{
        width: '100%'
    },  
    innerContainer: {
        
    },
    footerInner: {
        width: '90%',
        height: '15%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        fontSize: 20
    },
    inputLabel: {
        fontSize: 20
    },
    // inputStyle:{
    //     borderBottomColor: 'grey',
    //     borderBottom: '1px'
    // },
    buttonContainer: {
        marginLeft: 'auto',
    },
    createLabel:{
        fontSize: 20
    },
    buttonStyle: {
        backgroundColor: '#f194ff',
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    loginButton: {
        fontSize: 20,
    },
    loginButtonSection:{
        width: '100%',
    },
    centerLink:{
        display: 'flex',
        alignItems: 'center'
    }
});

export default styles;
