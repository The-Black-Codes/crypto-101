import React from "react";
import Web3 from "web3/dist/web3.min";
import { CONTRACT_ADDRESS, CONTRACT_JSON } from "./counter";

const LOCAL_NETWORK = "http://localhost:8545";
const provider = new Web3.providers.HttpProvider(LOCAL_NETWORK);
const web3 = new Web3(provider);

const SUSPENSE_STATUS = {
  PENDING: "pending",
  ERROR: "error",
  SUCCESS: "success",
};

function getWeb3Resources() {
  let status = SUSPENSE_STATUS.PENDING;
  const result = {};
  result.contract = new web3.eth.Contract(CONTRACT_JSON.abi, CONTRACT_ADDRESS);
  const suspender = web3.eth
    .getAccounts()
    .then((accounts) => {
      result.accounts = accounts;
      return result.contract.methods.getCount().call();
    })
    .then((initialCount) => {
      result.initialCount = Number(initialCount);
      status = SUSPENSE_STATUS.SUCCESS;
      return;
    })
    .catch((error) => {
      result.error = error;
      status = SUSPENSE_STATUS.ERROR;
    });
  return {
    read() {
      switch (status) {
        case SUSPENSE_STATUS.PENDING: {
          throw suspender;
        }
        case SUSPENSE_STATUS.ERROR: {
          throw result.error;
        }
        case SUSPENSE_STATUS.SUCCESS: {
          return result;
        }
        default:
          console.error(status);
          throw Error("Unexpected Status!");
      }
    },
  };
}

const resource = getWeb3Resources();

export function WithWeb3({ children }) {
  const result = resource.read();
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      ...result,
    });
  });
}
