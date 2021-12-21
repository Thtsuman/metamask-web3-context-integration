import React from 'react'
import Web3 from 'web3'
import getNetworkData from './utils/helpers'
import { useMetaMaskContext } from './metaMaskContext'


const types = {
    SET_WEB3_OBJ: 'SET_WEB3_OBJ',
    SET_ACCOUNTS: 'SET_ACCOUNTS',
    SET_CURRENT_ACCOUNT: 'SET_CURRENT_ACCOUNT',
    SET_CURRENT_CHAIN_OBJ: 'SET_CURRENT_CHAIN_OBJ',
    SET_CURRENT_ACCOUNT_BALANCE: 'SET_CURRENT_ACCOUNT_BALANCE',
    SET_IS_METAMASK_INSTALLED: 'SET_IS_METAMASK_INSTALLED'
}

const initState = {
    web3: null,
    accounts: [],
    currentAccountAddress: null,
    currentChainNetworkObj: null,
    currentAccountBalance: null
}

const Web3Context = React.createContext(null)

const web3Reducer = (state, action) => {
    switch (action.type) {
        case types.SET_WEB3_OBJ:
            return {
                ...state,
                web3: action.payload
            }
        case types.SET_ACCOUNTS:
            return {
                ...state,
                accounts: action.payload
            }
        case types.SET_CURRENT_ACCOUNT:
            return {
                ...state,
                currentAccountAddress: action.payload
            }
        case types.SET_CURRENT_CHAIN_OBJ:
            return {
                ...state,
                currentChainNetworkObj: action.payload
            }
        case types.SET_CURRENT_ACCOUNT_BALANCE:
            return {
                ...state,
                currentAccountBalance: action.payload
            }
        case types.SET_IS_METAMASK_INSTALLED:
            return {
                ...state,
                isMetaMaskInstalled: action.payload
            }
        default:
            return state;
    }
}

const Web3Provider = ({ children }) => {
    const [web3Obj, setWeb3Obj] = React.useState(null)
    const [state, dispatch] = React.useReducer(web3Reducer, initState)
    const {state: metaMaskState} = useMetaMaskContext()

    console.log(metaMaskState)

    React.useEffect(() => {
        if(metaMaskState?.isUserConnectedToMetamask) {
            loadWeb3()
            // events on update chain id
            updateChainNetwork()
            // events on update accounts
            updateAccount()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metaMaskState?.isMetaMaskInstalled, metaMaskState?.isUserConnectedToMetamask])

    React.useEffect(() => {
        if (web3Obj) {
            // get accounts
            getAccounts()
            // get chain id
            getChainNetwork()
            // get balance of current address
            getBalanceOfCurrentAddress()

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [web3Obj])

    React.useEffect(() => {
        if (state?.currentAccountAddress) {
            getBalanceOfCurrentAddress(state?.currentAccountAddress)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state?.currentAccountAddress, state?.currentChainNetworkObj])

    const formatBalanceFromWeiToEth = (balanceInWei = 0) => {
        return web3Obj.utils.fromWei(balanceInWei)
    }

    const formatBalanceFromEthToHex = (balanceInEth = 0) => {
        return web3Obj.utils.toHex(web3Obj.utils.toWei(`${balanceInEth}`, 'ether'))
    }

    const getBalanceOfCurrentAddress = (address) => {
        if (address) {
            web3Obj.eth.getBalance(address || '').then(wei => {
                const eth = formatBalanceFromWeiToEth(wei)
                // set current account balance
                dispatch({
                    type: types.SET_CURRENT_ACCOUNT_BALANCE,
                    payload: eth
                })
            })
        }

    }

    const setAccounts = (accounts = []) => {
        // set all accounts address
        dispatch({
            type: types.SET_ACCOUNTS,
            payload: accounts
        })
        // set current accounts address
        dispatch({
            type: types.SET_CURRENT_ACCOUNT,
            payload: accounts[0] || null
        })
    }

    const getAccounts = async () => {
        const accounts = await web3Obj.eth.getAccounts();
        formatBalanceFromEthToHex(100)
        setAccounts(accounts)
        // web3Obj.eth.sendTransaction({to: '0x3b4Fd839De4FDFc4DB3E1433FC7551Da91F901C1', from: accounts[0], value: formatBalanceFromEthToHex(0.4) })
        return accounts;
    }

    const updateAccount = () => {
        window.ethereum.on('accountsChanged', function (accounts) {
            // Time to reload your interface with accounts[0]!
            setAccounts(accounts)
        })
    }

    const setNetworkObj = (input) => {
        if (input) {
            const currentNetworkObj = getNetworkData(input)
            dispatch({
                type: types.SET_CURRENT_CHAIN_OBJ,
                payload: currentNetworkObj
            })
        }
    }

    const getChainNetwork = async () => {
        const networkId = await web3Obj.eth.net.getId();
        setNetworkObj(networkId)
        return networkId
    }

    const updateChainNetwork = () => {
        window.ethereum.on('chainChanged', (networkHex) => {
            setNetworkObj(networkHex)
        })
    }

    const loadWeb3 = async () => {
        let web3 = null;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Non-ethereum browser detected. You should consider trying Metamask!')
        }

        setWeb3Obj(web3)
        dispatch({
            type: types.SET_WEB3_OBJ,
            payload: web3
        })
    }



    const value = { state, dispatch }

    return <Web3Context.Provider value={value}>
        {children}
    </Web3Context.Provider>
}

const useWeb3Context = () => {
    const context = React.useContext(Web3Context)

    return context;
}

export { Web3Provider, useWeb3Context }