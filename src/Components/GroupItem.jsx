import { useContext } from "react";
import { NotesContext } from "../Context/NotesContext";
import "./GroupItem.css";

const GroupItem = ({ group }) => {
  const { selectedGroup, setSelectedGroup, setShowNotesMobile } =
    useContext(NotesContext);

  return (
    <div
      className={`groupItem ${selectedGroup?.id === group.id ? "active" : ""}`}
      onClick={() => {
        setSelectedGroup(group);
        setShowNotesMobile(true);
      }}
    >
      <div className="avatar" style={{ background: group.color }}>
        {group.initials}
      </div>

      <span>{group.name}</span>
    </div>
  );
};

export default GroupItem;
