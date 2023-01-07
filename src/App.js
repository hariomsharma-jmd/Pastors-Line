import "./App.scss";
import Routes from "./Routes";
import { Provider } from "react-redux";
import store from "./redux";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
