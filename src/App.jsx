import React from 'react'
import './app.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar/Navbar'
import RootProvider from './contexts/RootProvider';
import { useWeb3Context } from './contexts/blockchain/web3Context';
import MyToken from './abis/MyToken2.json'

const App = () => {

    return (
        <RootProvider>
            <div className="app bg-dark text-white">
                <Navbar />
                <div className="container">
                    hello
                </div>
                <Container />
            </div>
        </RootProvider>
    )
}


const Container = () => {

    const { state: web3State } = useWeb3Context()
    const { web3, currentAccountAddress } = web3State;

    const [ tokenState, setTokenState ] = React.useState(null)

    React.useEffect(() => {
        if (web3) {
            console.log('call')
            setToken()
        }
    }, [web3State])

    const setToken = () => {
        const tokenAddress = '0xe42E50530759Ec489674C73247D51a5D29ef0ecD'
        const token = new web3.eth.Contract(MyToken.abi, tokenAddress);
        console.log(token)
        setTokenState(token)
        getBalance()
    }

    const getBalance = async () => {
        
        tokenState.methods.name().call().then(resp => {
            console.log(resp)
        }).catch(err => {
            console.error(err)
        })
        tokenState.methods.symbol().call().then(resp => {
            console.log(resp)
        }).catch(err => {
            console.error(err)
        })
        tokenState.methods.balanceOf('0x303D61DBaA2Bea4F8387072FA87FC0fB17fD620F').call().then(resp => {
            console.log(resp)
        }).catch(err => {
            console.error(err)
        })
        tokenState.methods.balanceOf(currentAccountAddress).call().then(resp => {
            console.log(resp)
        }).catch(err => {
            console.error(err)
        })
    }


    return (
        <div>Container</div>
    )
}

export default App
