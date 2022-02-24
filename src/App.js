import React, { Suspense } from "react";
import _ from "lodash";
import { WithWeb3 } from "./web3/WithWeb3";

function AccountViewer({ accounts }) {
  const [myAccount] = accounts;
  return (
    <>
      <h2>Hello {myAccount}</h2>
    </>
  );
}

const Counter = ({ count, onIncrement, onDecrement }) => {
  return (
    <>
      <header>
        <h2 id="Count">{count}</h2>
      </header>
      <section>
        <h3 id="CounterActions">Counter Actions</h3>
        <button type="button" onClick={onIncrement}>
          Increment
        </button>
        <button type="button" onClick={onDecrement}>
          Decrement
        </button>
      </section>
    </>
  );
};

function CounterContainer({ accounts, initialCount, contract }) {
  const [myAccount] = accounts;
  const [count, setCount] = React.useState(initialCount);
  const increment = _.debounce(
    React.useCallback(() => {
      contract.methods
        .increment()
        .send({ from: myAccount })
        .on("confirmation", () => {
          setCount(count + 1);
        });
    }, [count, setCount, contract, myAccount]),
    1_000
  );
  const decrement = _.debounce(
    React.useCallback(() => {
      contract.methods
        .decrement()
        .send({ from: myAccount })
        .on("confirmation", () => {
          setCount(count - 1);
        });
    }, [count, setCount, contract, myAccount]),
    1_000
  );
  return (
    <Counter count={count} onIncrement={increment} onDecrement={decrement} />
  );
}

function App() {
  return (
    <div>
      <h1>Hello Web3</h1>
      <Suspense fallback={<>Loading...</>}>
        <WithWeb3>
          <AccountViewer />
          <CounterContainer />
        </WithWeb3>
      </Suspense>
    </div>
  );
}

export default App;
