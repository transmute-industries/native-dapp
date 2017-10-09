import TransmuteFramework from '../transmute';

console.log('TransmuteFramework here: ', TransmuteFramework)
import * as _ from 'lodash';

let EventStoreContract = TransmuteFramework.EventStoreContract;
let { getCachedReadModel } = TransmuteFramework.ReadModel;

import {
    reducer as patientSummaryReducer,
    readModel as patientSummaryReadModel
} from '../components/Healthcare/PatientSummaryCard/reducer';

export const getFactoryReadModel = (fromAddress) => async (dispatch) => {
    let factory = await TransmuteFramework.EventStoreFactoryContract.deployed();
    let readModel = await TransmuteFramework.Factory.getFactoryReadModel(factory, fromAddress);
    dispatch({
        type: 'TRANSMUTE_FACTORY_RECEIVED',
        payload: readModel
    });
};

export const getAccounts = () => (dispatch) => {
    console.log('getAccounts')
    TransmuteFramework.web3.eth
        .getAccounts((err, addresses) => {
            if (err) { throw err; }
            dispatch({
                type: 'TRANSMUTE_WEB3_ACCOUNTS_RECEIVED',
                payload: addresses
            });
            if (addresses.length) {
                let fromAddress = addresses[0];
                dispatch(getFactoryReadModel(fromAddress));
            }
        });
};

export const createEventStore = (fromAddress) => async (dispatch) => {
    let factory = await TransmuteFramework.EventStoreFactoryContract.deployed();
    let data = await TransmuteFramework.Factory.createEventStore(factory, fromAddress);
    dispatch(getFactoryReadModel(fromAddress));
    dispatch(updateSelectedContract(data.events[0].payload.address, fromAddress));
};

export const readAllContractEvents = (
    contractAddress,
    fromAddress,
    eventIndex
) => async (dispatch) => {
    let eventStore = await TransmuteFramework.EventStoreContract.at(contractAddress);
    let events = await TransmuteFramework.EventStore.readFSAs(eventStore, fromAddress, eventIndex);
    dispatch({
        type: 'TRANSMUTE_EVENTSTORE_EVENTS_RECEIEVED',
        payload: {
            contractAddress: contractAddress,
            events: events
        }
    });
};

export const writeFSA = (
    contractAddress,
    fromAddress,
    event
) => async (dispatch) => {
    let eventStore = await TransmuteFramework.EventStoreContract.at(contractAddress);
    let eventOnChain = await TransmuteFramework.EventStore.writeFSA(eventStore, fromAddress, event);
    console.debug('event: ', eventOnChain);
    dispatch({
        type: 'TRANSMUTE_EVENTSTORE_EVENT_RECEIEVED',
        payload: {
            event: eventOnChain
        }
    });
    dispatch(readAllContractEvents(contractAddress, fromAddress, 0));
    dispatch(loadPatientSummaryReadModel(contractAddress, fromAddress));
};

export const updatePatientSummary = (
    readModel,
) => (dispatch) => {
    localStorage.setItem('patientSummary', JSON.stringify(readModel));
    dispatch({
        type: 'PATIENT_SUMMARY_UPDATED',
        payload: readModel
    });
};

const updateLocalStorage = (formModel) => {
    _.forEach(formModel, (v, k) => {
        localStorage.setItem(k, v);
    });
};

export const updateWeb3Settings = (formModel) => (dispatch) => {
    console.log('updateWeb3Settings')
    updateLocalStorage(formModel);
    window.location.href = window.location.href;
    dispatch({
        type: 'WEB3_SETTINGS_UPDATED',
        payload: formModel
    });
};

export const updateSelectedContract = (
    address,
    fromAddress
) => (dispatch) => {
    localStorage.setItem('selectedContract', address);
    dispatch({
        type: 'EVENTSTORE_ADDRESS_UPDATED',
        payload: address
    });
    dispatch(readAllContractEvents(address, fromAddress, 0));
    dispatch(loadPatientSummaryReadModel(address, fromAddress));
};

export const loadPatientSummaryReadModel = (
    selectedContract,
    fromAddress
) => async (dispatch) => {
    let eventStore = await EventStoreContract.at(selectedContract);
    let updatedReadModel = await getCachedReadModel(
        eventStore,
        fromAddress,
        patientSummaryReadModel,
        patientSummaryReducer
    );
    dispatch(updatePatientSummary(updatedReadModel.model));
};