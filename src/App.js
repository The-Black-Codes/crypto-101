import { Suspense } from "react";
import { WithWeb3 } from "./web3/WithWeb3";

function AccountViewer({ accounts }) {
  return (
    <>
      <h2>{JSON.stringify(accounts)}</h2>
    </>
  );
}

function Counter({ initialCount }) {
  return (
    <header>
      <h2>{initialCount}</h2>
    </header>
  );
}

function App() {
  return (
    <div>
      <h1>Hello Web3</h1>
      <Suspense fallback={<>Loading...</>}>
        <WithWeb3>
          <AccountViewer />
          <Counter />
        </WithWeb3>
      </Suspense>
    </div>
  );
}

export default App;
