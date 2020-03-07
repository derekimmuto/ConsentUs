pragma solidity ^0.6.3;


contract identityVerification{
    address owner;
    event newPatientAdded(address patient, string message, uint expireTime);
    event patientConsentExtend(address patient, string message, uint expireTime);
    
    struct patient {
        string message;
        uint expireTime;
    }
    
    mapping (address => patient) patients;
    
    constructor() public {
        owner = msg.sender;
    }
    
    modifier requireVerify(
        string memory message, 
        bytes memory sig, 
        address patientAddress
    )
    {
        require(ecverify(message, sig, patientAddress));
        _;
    }
    
    modifier requireOwner(){
        require(msg.sender == owner);
        _;
    }
    
    function createUser(
        string memory message, 
        bytes memory sig,
        address patientAddress,
        uint expireTime
    )
        requireVerify (message, sig, patientAddress)
        requireOwner
        public 
    {
        patients[patientAddress].message = message;
        patients[patientAddress].expireTime = expireTime;
        emit newPatientAdded(patientAddress,message,expireTime);
    }
    
    function extendConsent(
        address patientAddress, 
        string memory message,
        bytes memory sig,
        uint newTime
    ) 
        requireOwner
        requireVerify (message, sig, patientAddress)
        public 
    {
        patients[patientAddress].message = message;
        patients[patientAddress].expireTime = newTime;
        emit patientConsentExtend(patientAddress,message,newTime);
    }
    
    function getUserHash(
        address target
    ) 
        public 
        view 
        returns
    (
        string memory
    )
    {
        return patients[target].message;
    }
    
    function getUserConsentExpired(
        address target
    ) 
        public 
        view 
        returns
    (
        bool
    )
    {
        return patients[target].expireTime > block.timestamp;
    }
    
    function ecverify(
        string memory _msg,
        bytes memory sig,
        address target
    )
        internal
        pure
        returns (bool) 
    {
        if (target == ecrecovery(hash_msg(_msg), sig)){
            return true;
        } else {
            return false;
        }
    }
    
    
    function ecrecovery(
        bytes32 hash,
        bytes memory sig
    ) 
        internal
        pure
        returns (address) 
    {
        bytes32 r;
        bytes32 s;
        uint8 v;

        if (sig.length != 65) {
        return address(0);
    }

    assembly {
        r := mload(add(sig, 32))
        s := mload(add(sig, 64))
        v := and(mload(add(sig, 65)), 255)
    }

    if (uint256(s) > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) {
        return address(0);
    }

    if (v < 27) {
        v += 27;
    }

    if (v != 27 && v != 28) {
        return address(0);
    }
    
        return ecrecover(hash, v, r, s);
    }
    
        function hash_msg(
        string memory _msg
    ) 
        internal
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", uintToString(bytes(_msg).length), _msg));
    }
    
        function uintToString(
        uint _base
    )
        internal
        pure
        returns (
        string memory
    ) 
    {
        bytes memory _tmp = new bytes(32);
        uint i;
        for(i = 0;_base > 0;i++) {
            _tmp[i] = byte(uint8((_base % 10) + 48));
            _base /= 10;
        }
        bytes memory _real = new bytes(i--);
        for(uint j = 0; j < _real.length; j++) {
            _real[j] = _tmp[i--];
        }
        return string(_real);
    }
}
