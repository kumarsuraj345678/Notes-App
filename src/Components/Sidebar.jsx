import React, { useContext } from "react";
import { NotesContext } from "../Context/NotesContext";
import { BiSolidPlusCircle } from "react-icons/bi";

import GroupItem from "./GroupItem";
import "./Sidebar.css";

const Sidebar = () => {
  const { groups, setShowModal, showNotesMobile } = useContext(NotesContext);

  return (
    <div className={`sidebar ${showNotesMobile ? "hideMobile" : ""}`}>
      <h1 className="title">Pocket Notes</h1>
      <div className="groupList">
        {groups.map((group) => (
          <GroupItem key={group.id} group={group} />
        ))}
      </div>

      <button className="addBtn" onClick={() => setShowModal(true)}>
        <BiSolidPlusCircle className="addIcon" />
      </button>
    </div>
  );
};

export default Sidebar;
