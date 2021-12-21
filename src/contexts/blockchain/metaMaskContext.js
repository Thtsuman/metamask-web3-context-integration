import React from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'


const types = {
    SET_IS_METAMASK_INSTALLED: 'SET_IS_METAMASK_INSTALLED',
    SET_IS_USER_CONNECTED_BEFORE: 'SET_IS_USER_CONNECTED_BEFORE'
}

const initState = {
    isMetaMaskInstalled: null,
    isUserConnectedToMetamask: false
}

const MetaMaskContext = React.createContext(null)

const metaMaskReducer = (state, action) => {
    switch (action.type) {
        case types.SET_IS_METAMASK_INSTALLED:
            return {
                ...state,
                isMetaMaskInstalled: action.payload
            }
        case types.SET_IS_USER_CONNECTED_BEFORE:
            return {
                ...state,
                isUserConnectedToMetamask: action.payload
            }
        default:
            return state;
    }
}

const MetaMaskProvider = ({ children }) => {

    const [state, dispatch] = React.useReducer(metaMaskReducer, initState)
    const { ethereum } = window
    const metaMaskOnboarding = new MetaMaskOnboarding({})

    const handleInstallMetaMask = () => {
        metaMaskOnboarding.startOnboarding()
    }


    React.useEffect(() => {
        // check if user installed MetaMask
        metaMaskClientCheck()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const isMetaMaskInstalled = () => {
        return Boolean(ethereum && ethereum.isMetaMask)
    }


    const handleMetaMaskClickConnect = async () => {
        try {
            // Will open the MetaMask UI
            // You should disable this button while the request is pending!
            await ethereum.request({ method: 'eth_requestAccounts' });
            dispatch({
                type: types.SET_IS_USER_CONNECTED_BEFORE,
                payload: true
            })
        } catch (error) {
            dispatch({
                type: types.SET_IS_USER_CONNECTED_BEFORE,
                payload: false
            })
            console.error(error);
        }
    };

    const getAccounts = async () => {
        //we use eth_accounts because it returns a list of addresses owned by us.
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        //We take the first address in the array of addresses and display it
        console.log(accounts, accounts[0] || 'Not able to get accounts');
    }



    const metaMaskClientCheck = () => {
        //Now we check to see if MetaMask is installed
        if (!isMetaMaskInstalled()) {
            dispatch({
                type: types.SET_IS_METAMASK_INSTALLED,
                payload: 'not-installed'
            })
        } else {
            dispatch({
                type: types.SET_IS_METAMASK_INSTALLED,
                payload: true
            })
        }
    };

    const extraFunctions = {
        handleMetaMaskClickConnect,
        getAccounts,
        handleInstallMetaMask
    }

    const value = { state, dispatch, ...extraFunctions}
    return <MetaMaskContext.Provider value={value}>
        {children}
    </MetaMaskContext.Provider>
}


const useMetaMaskContext = () => {
    const context = React.useContext(MetaMaskContext)
    return context;
}

export { MetaMaskProvider, useMetaMaskContext }
