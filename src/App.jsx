import Sidebar from "./Components/Sidebar";
import NotesPanel from "./Components/NotesPanel";
import "./App.css";
import CreateGroupModal from "./Components/CreateGroupModal";

function App() {
  return (
    <div className="appContainer">
      <Sidebar />
      <NotesPanel />
      <CreateGroupModal />

    </div>
  );
}

export default App;
