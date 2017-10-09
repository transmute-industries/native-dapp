import { AsyncStorage } from "react-native"

const handlers = {

    ['TRANSMUTE_WEB3_ACCOUNTS_RECEIVED']: (state, action) => {
        let defaultAddress = action.payload[0];
        return {
            ...state,
            defaultAddress: defaultAddress,
            addresses: action.payload,
        };
    },
    ['TRANSMUTE_FACTORY_RECEIVED']: (state, action) => {
        return {
            ...state,
            [action.payload.readModelType]: action.payload
        };
    },
    ['TRANSMUTE_EVENTSTORE_EVENTS_RECEIEVED']: (state, action) => {
        return {
            ...state,
            ['events']: action.payload.events
        };
    },

    ['EVENTSTORE_ADDRESS_UPDATED']: (state, action) => {
        return {
            ...state,
            ['selectedContract']: action.payload
        };
    },
    ['RECORD_EVENT_DIALOG_UPDATE']: (state, action) => {
        return {
            ...state,
            ['activeDialog']: action.payload,
        };
    },
    ['PATIENT_SUMMARY_UPDATED']: (state, action) => {
        return {
            ...state,
            ['patientSummary']: action.payload,
        };
    },
};

export const reducer = async (state, action) => {
    if (handlers[action.type]) {
        return handlers[action.type](state, action);
    }
    return {
        patientSummary: await JSON.parse(AsyncStorage.getItem('@ExampleStore:patientSummary') || '{}') || {},
        defaultAddress: await AsyncStorage.getItem('@ExampleStore:defaultAddress') || null,
        selectedContract: await AsyncStorage.getItem('@ExampleStore:selectedContract') || null,
        addresses: null,
        provider: await AsyncStorage.getItem('@ExampleStore:provider') || 'testrpc',
        ...state
    };
};