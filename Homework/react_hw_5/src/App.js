import "./App.css";
import UserPannel from "./components/UserPannel";
import Users from "./components/Users";

function App() {
   return (
      <div className="App mx-auto w-full md:w-3/4 lg:w-1/2 flex flex-col justify-end">
         <UserPannel />
         <Users />
      </div>
   );
}

export default App;
