//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "./SmartWallet.sol" ;
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";

contract ECDSAWallet is SmartWallet {
    using ECDSAUpgradeable for bytes32;

    bytes32 private constant ECDSA_WALLET_STORAGE_POSITION = keccak256("wallet.ecdsa.v1");
    struct ECDSAWalletState {
        address owner;
        uint96 nonce;
    }

    bytes32 private constant HASHED_NAME = keccak256(bytes("ECDSAWallet"));
    bytes32 private constant HASHED_VERSION = keccak256(bytes("0.0.1"));
    bytes32 private constant TYPE_HASH = keccak256(
        "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
    );

    bytes32 private constant UserOp_TYPE_HASH =
        keccak256("UserOp(address to,uint256 amount,bytes data)");

    bytes32 private constant _TYPEHASH =
        keccak256("ECDSAExec(UserOp[] userOps,uint256 nonce,uint256 chainID,uint256 sigChainID)UserOp(address to,uint256 amount,bytes data)");

    function domainSeperator(uint256 _chainID) public view returns (bytes32) {
        return keccak256(abi.encode(TYPE_HASH, HASHED_NAME, HASHED_VERSION, _chainID, address(this)));
    }

    function __ECDSAWallet_init(address _owner) public initializer {
        __SmartWallet_init_unchained();
        __ECDSAWallet_init_unchained(_owner);
    }

    function __ECDSAWallet_init_unchained(address _owner) internal onlyInitializing {
        state().owner = _owner;
    }

    function state() internal pure returns (ECDSAWalletState storage s) {
        bytes32 position = ECDSA_WALLET_STORAGE_POSITION;
        assembly {
            s.slot := position
        } 
    }

    function owner() external view returns (address) {
        return state().owner;
    }

    function nonce() public view virtual override returns (uint256) {
        return state().nonce;
    }

    function _incrementNonce() internal override {
        state().nonce++;
    }

    function hash(UserOp[] memory _userOps) internal pure returns (bytes32) {
        bytes32[] memory opHashes = new bytes32[](_userOps.length);
        for (uint i = 0; i < _userOps.length; i++) {
            opHashes[i] = keccak256(abi.encode(UserOp_TYPE_HASH, _userOps[i].to, _userOps[i].amount, keccak256(_userOps[i].data)));
        }
        return keccak256(abi.encodePacked(opHashes));
    }

    function _verify(UserOp[] memory _userOps, bytes memory _signature) internal view override {
        (uint256 _sigChainID, bytes memory _sig) = abi.decode(_signature, (uint256, bytes));
        address signer = domainSeperator(_sigChainID).toTypedDataHash(
            keccak256(
                abi.encode(_TYPEHASH,
                hash(_userOps),
                nonce(), 
                block.chainid, 
                _sigChainID)
            )
        ).recover(_sig);
        require(state().owner == signer, "ECDSAWallet: failed to verify signature");
    }
}