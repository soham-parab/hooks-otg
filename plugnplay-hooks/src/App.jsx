import "./App.css";
import { useIsOnline } from "hooks-on-the-go";

function App() {
  const abcd = useIsOnline();
  console.log(abcd);
  return (
    <>
      <div>Plug n play: an easy way to use React hooks</div>
    </>
  );
}

export default App;
