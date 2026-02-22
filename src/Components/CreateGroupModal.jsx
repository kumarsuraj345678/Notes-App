import { useContext, useState, useRef, useEffect } from "react";
import { NotesContext } from "../Context/NotesContext";
import "./CreateGroupModal.css";

const colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

const CreateGroupModal = () => {
  const { showModal, setShowModal, groups, setGroups } =
    useContext(NotesContext);

  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!showModal) return null;

  const createGroup = () => {
    if (groupName.trim().length < 2) {
      alert("Group name must be at least 2 characters");
      return;
    }

    const duplicate = groups.find(
      (g) => g.name.toLowerCase() === groupName.toLowerCase(),
    );

    if (duplicate) {
      alert("Group already exists");
      return;
    }

    const initials = groupName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newGroup = {
      id: Date.now(),
      name: groupName,
      color: selectedColor,
      initials,
      notes: [],
    };

    setGroups([...groups, newGroup]);
    setGroupName("");
    setShowModal(false);
  };

  return (
    <div className="modalOverlay">
      <div className="modalBox" ref={modalRef}>
        <h2>Create New group</h2>

        <div className="inputRow">
          <label>Group Name</label>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className="colorRow">
          <label>Choose colour</label>

          <div className="colors">
            {colors.map((color) => (
              <span
                key={color}
                className={`colorCircle ${selectedColor === color ? "active" : ""}`}
                style={{ background: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <button className="createBtn" onClick={createGroup}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateGroupModal;
