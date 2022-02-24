// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.10;

contract Contract {
    string public greeting = "Hello World";

    function sayHello() public view returns (string memory) {
        return greeting;
    }
}
