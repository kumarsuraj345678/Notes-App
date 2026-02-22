import { createContext, useState, useEffect } from "react";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (groups.length > 0 && !selectedGroup) {
      setSelectedGroup(groups[0]);
    }
  }, [groups]);

  useEffect(() => {
    const storedGroups = localStorage.getItem("notesGroups");
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notesGroups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    const storedSelected = localStorage.getItem("selectedGroup");
    if (storedSelected) {
      setSelectedGroup(JSON.parse(storedSelected));
    }
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem("selectedGroup", JSON.stringify(selectedGroup));
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (selectedGroup && groups.length > 0) {
      const updated = groups.find((g) => g.id === selectedGroup.id);
      if (updated) {
        setSelectedGroup(updated);
      }
    }
  }, [groups]);

  const [showNotesMobile, setShowNotesMobile] = useState(false);

  return (
    <NotesContext.Provider
      value={{
        groups,
        setGroups,
        selectedGroup,
        setSelectedGroup,
        showModal,
        setShowModal,
        showNotesMobile,
        setShowNotesMobile,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
