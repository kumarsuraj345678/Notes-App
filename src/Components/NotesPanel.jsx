import { useContext, useState, useRef, useEffect } from "react";
import { NotesContext } from "../Context/NotesContext";
import "./NotesPanel.css";
import { MdLock } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";

const NotesPanel = () => {
  const {
    selectedGroup,
    groups,
    setGroups,
    showNotesMobile,
    setShowNotesMobile,
  } = useContext(NotesContext);

  const [noteText, setNoteText] = useState("");

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedGroup?.notes]);
  const noGroups = groups.length === 0;
  if (noGroups) {
    return (
      <div className="notesPanel empty">
        <div className="emptyCenter">
          <img src="/notes.png" alt="notes" className="emptyImage" />

          <h2 className="emptyTitle">Pocket Notes</h2>

          <p className="emptyDesc">
            Send and receive messages without keeping your phone online.
            <br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
        </div>

        <div className="footer">
          <span className="lock">
            <MdLock />
          </span>
          <span>end-to-end encrypted</span>
        </div>
      </div>
    );
  }

  if (!selectedGroup) {
    return (
      <div className={`notesPanel ${showNotesMobile ? "showMobile" : ""}`}>
        <h2>Select a group to start writing notes</h2>
      </div>
    );
  }

  const addNote = () => {
    if (!noteText.trim()) return;

    const now = new Date();

    const date = now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

   const time = now
  .toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })
  .toUpperCase();


    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroup.id) {
        const newNote = {
          id: Date.now(),
          text: noteText,
          createdDate: date,
          createdTime: time,
          updatedAt: now,
        };

        return {
          ...group,
          notes: [...group.notes, newNote],
        };
      }

      return group;
    });

    setGroups(updatedGroups);
    setNoteText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addNote();
    }
  };

  return (
    <div className={`notesPanel ${showNotesMobile ? "showMobile" : ""}`}>
      <div className="notesHeader">
        {showNotesMobile && (
          <button className="backBtn" onClick={() => setShowNotesMobile(false)}>
            <IoIosArrowRoundBack className="backIcon" />
          </button>
        )}

        <div className="avatar" style={{ background: selectedGroup.color }}>
          {selectedGroup.initials}
        </div>

        <h3>{selectedGroup.name}</h3>
      </div>

      <div className="notesList">
        {selectedGroup.notes.map((note) => (
          <div key={note.id} className="noteCard">
            <p className="noteText">{note.text}</p>

            <div className="noteFooter">
              <span>{note.createdDate}</span>
              <span className="dot">•</span>
              <span>{note.createdTime}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="notesInput">
        <div className="inputBox">
          <textarea
            placeholder="Enter your text here..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button
            className={noteText.trim() ? "sendBtn active" : "sendBtn"}
            onClick={addNote}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesPanel;
