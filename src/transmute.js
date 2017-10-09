import TransmuteFramework from 'transmute-framework';
import TransmuteContract from "transmute-contract";
let config = {
    env: 'testrpc',
    // ipfsConfig: {
    //     host: 'ipfs.infura.io',
    //     port: '5001',
    //     options: {
    //         protocol: 'https'
    //     }
    // },
    aca: TransmuteContract.RBAC,
    esa: TransmuteContract.RBACEventStore,
    esfa: TransmuteContract.RBACEventStoreFactory
};

export default TransmuteFramework.init(config);