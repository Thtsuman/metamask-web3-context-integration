import React from 'react'
import { useWeb3Context } from '../../contexts/blockchain/web3Context'
import "././Navbar.style.scss"
import { useMetaMaskContext } from '../../contexts/blockchain/metaMaskContext'
import NavbarAddressWrapper from '../../components/NavbarAddressWrapper/NavbarAddressWrapper'

const Navbar = () => {
    const { state: web3State } = useWeb3Context()
    const { handleMetaMaskClickConnect, handleInstallMetaMask, state: metaMaskState } = useMetaMaskContext()

    const renderAddressLayout = () => {
        if (metaMaskState?.isMetaMaskInstalled === 'not-installed') {
            return (
                <button
                    className='btn btn-warning rounded-lg btn-sm'
                    onClick={handleInstallMetaMask}
                >
                    Install Meta Mask
                </button>
            )
        } else if (web3State.currentAccountAddress) {
            return <NavbarAddressWrapper
                accountBalance={web3State?.currentAccountBalance}
                networkName={web3State.currentChainNetworkObj?.network}
                accountAddress={web3State.currentAccountAddress}
            />
        } else {
            return (
                <>
                    <button
                        className='btn btn-primary rounded-lg btn-sm'
                        onClick={handleMetaMaskClickConnect}
                    >
                        Connect
                    </button>
                </>
            )
        }
    }

    return (
        <div className="navbar bg-dark text-white shadow p-3 mb-5 rounded mx-2">
            <div>
                <div>
                    Hello
                </div>
            </div>
            <div className="account-show-wrapper">
                {renderAddressLayout()}
            </div>
        </div>
    )
}

export default Navbar
