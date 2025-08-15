// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CelebrityFanMessages {
    uint256 public constant MESSAGE_FEE = 0.2 ether;

    struct FanMessage {
        address sender;
        string message;
        uint256 timestamp;
    }

    FanMessage[] public messages;

    event MessageSent(address indexed sender, string message, uint256 timestamp);

    function sendMessage(string memory _message) public payable {
        require(msg.value == MESSAGE_FEE, "Must send exactly 0.2 SHM");
        messages.push(FanMessage(msg.sender, _message, block.timestamp));
        emit MessageSent(msg.sender, _message, block.timestamp);
    }

    function getMessagesCount() public view returns (uint256) {
        return messages.length;
    }

    function getMessage(uint256 index) public view returns (address, string memory, uint256) {
        require(index < messages.length, "Invalid index");
        FanMessage memory msgData = messages[index];
        return (msgData.sender, msgData.message, msgData.timestamp);
    }
} 