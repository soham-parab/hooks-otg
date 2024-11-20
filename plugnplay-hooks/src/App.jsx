import "./App.css";
import { useIsOnline } from "hooks-on-the-go";
function App() {
  const isOnline = useIsOnline();
  return (
    <>
      <div>Plug n play: an easy way to use React hooks</div>
    </>
  );
}

export default App;
