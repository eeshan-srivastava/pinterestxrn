import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './src/app/navigation/Navigation';

const App = () => {
    const init = async () => {};

    const unMount = () => {};

    useEffect(() => {
        init();
        return () => {
            unMount();
        };
    }, []);

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SafeAreaProvider>
                    <GestureHandlerRootView style={styles.container1}>
                        <Navigation />
                    </GestureHandlerRootView>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;

const styles = StyleSheet.create({
    container1: {
        flex: 1,
    },
});
