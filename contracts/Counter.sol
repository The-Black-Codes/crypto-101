// SPDX-License-Identifier: Unlisenced
pragma solidity ^0.8.10;

contract Counter {
    int16 private count;

    constructor() {
        count = 0;
    }

    function getCount() public view returns (int16) {
        return count;
    }

    function increment() public {
        count++;
    }

    function decrement() public {
        count--;
    }
}
