//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "./IWallet.sol";

interface IWalletFactory {
    function createWallet(address _impl, bytes memory _call) external returns (IWallet);
    function walletAddress(address _impl, bytes memory _call, uint256 _nonce) external view returns (address);
}