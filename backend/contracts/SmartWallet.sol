//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./IWallet.sol";

abstract contract SmartWallet is UUPSUpgradeable, IWallet {
    receive() payable external {
        emit LogReceivedEther(msg.sender, msg.value);
    }

    function __SmartWallet_init() public initializer {
        __SmartWallet_init_unchained();
    }

    function __SmartWallet_init_unchained() internal onlyInitializing {
        if (address(this).balance > 0) {
            emit LogReceivedEther(msg.sender, address(this).balance);
        }
    }

    function _verify(UserOp[] memory userOps, bytes memory _signature) virtual view internal;
    function _incrementNonce() virtual internal;
    function nonce() virtual public view returns(uint256);

    function exec(UserOp[] calldata userOps, bytes calldata _signature) external {
        _verify(userOps, _signature);
        _incrementNonce();
        for (uint32 i = 0; i < userOps.length; i++) {
            require(address(this).balance >= userOps[i].amount, "SmartWallet: insufficient base asset balance");
            _call(userOps[i].to, userOps[i].amount, userOps[i].data);
        }
    }

    function _call(address _contract, uint256 _value, bytes calldata _data) internal {
        (bool ok, bytes memory resp) = _contract.call{ value: _value }(_data);
        emit LogCall(_contract, _value, _data);
        if (!ok) {
            assembly {
                revert(add(resp, 32), mload(resp))
            }
        }
    }

    function _authorizeUpgrade(address) internal override view {
        require(msg.sender == address(this));
    }
}