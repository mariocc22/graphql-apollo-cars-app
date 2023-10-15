// components
import AddCar from "./components/forms/AddCar";
import AddPeople from "./components/forms/AddPeople";
import Title from "./components/layout/Title";
import PeopleLists from "./components/lists/PeopleLists";

function App() {
  return (
    <div className="App">
      <Title />
      <AddPeople />
      <AddCar />
      <PeopleLists />
    </div>
  );
}

export default App;
