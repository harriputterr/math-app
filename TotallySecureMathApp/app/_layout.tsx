import React from "react";
import Login, { IUser } from "./Login";
import Notes from './Notes'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native'

export type TRootStackParamList = {
    Login: undefined;
    Notes: {
        user: IUser;
    };
};


export default function RootLayout() {
    const [signedInAs, setSignedInAs] = React.useState<IUser | false>(false);

    const Stack = createNativeStackNavigator<TRootStackParamList>();

    return (
        <Stack.Navigator>
            {
                !signedInAs ?

                    <Stack.Screen
                        name="Login">
                        {(props) => <Login {...props} onLogin={(user) => setSignedInAs(user)} />}
                    </Stack.Screen> :
                    <Stack.Screen name="Notes" component={Notes} initialParams={{ user: signedInAs } } />
            }
        </Stack.Navigator>
   )
}

const styles = StyleSheet.create({
});