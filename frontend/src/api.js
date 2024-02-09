import {cryptoAssets, cryptoData} from './data';

const fakeFetchCrypto = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 1)
    })
}
const fetchAssets = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 1)
    })
}
export {fakeFetchCrypto, fetchAssets};
