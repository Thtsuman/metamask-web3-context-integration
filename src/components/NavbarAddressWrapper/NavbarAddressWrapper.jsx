import React from 'react'
import Identicon from 'react-identicons'
import { copyToClipboard, formatAddress, formatCurrency } from '../../utils/utils'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const NavbarAddressWrapper = (props) => {
    const { accountBalance="", networkName="", accountAddress='' } = props
    return (
        <>
            <div className="badge rounded-pill bg-warning">
                {formatCurrency(accountBalance)} ETH
            </div>
            <div className="badge rounded-pill bg-secondary">
                {networkName}
            </div>
            <OverlayTrigger
                placement='bottom'
                overlay={
                    <Tooltip id={`tooltip-bottom`}>
                        <div>
                            {accountAddress}
                            {/* <br />
                            <div className="text-muted">copy to clipboard</div>    */}
                        </div>

                    </Tooltip>
                }
            >
                <div
                    onClick={() => copyToClipboard(accountAddress)}
                    className="badge rounded-pill bg-primary"
                >
                    {formatAddress(accountAddress)}
                </div>
            </OverlayTrigger>
            <Identicon className="custom-identicon" string={accountAddress} />
        </>
    )
}

export default NavbarAddressWrapper
