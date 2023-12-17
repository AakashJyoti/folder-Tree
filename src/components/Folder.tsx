import { useState } from "react";

type TParams = {
  explorer: TFolder;
  handleInsertNode: (folderId: string, item: string, isFolder: boolean) => void;
};

const initialShowInput = {
  visible: false,
  isFolder: false,
};

const Folder = ({ explorer, handleInsertNode }: TParams) => {
  const [expandItems, setExpandItems] = useState(false);
  const [showInput, setShowInput] = useState(initialShowInput);
  const [name, setName] = useState("");

  const handleCreate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isFolder: boolean
  ) => {
    e.stopPropagation();
    setExpandItems(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !!name) {
      handleInsertNode(explorer.id, name, showInput.isFolder);
      setName("");
      setShowInput(initialShowInput);
    }
  };

  return (
    <div className="pl-4">
      <div
        className={`my-1 p-3 py-1 ${
          explorer.isFolder ? "bg-gray-300" : "bg-gray-200"
        } cursor-pointer rounded flex gap-20 w-fit justify-between`}
        onClick={() => setExpandItems((prev) => !prev)}
      >
        <p>
          {explorer.isFolder ? (expandItems ? "📂" : "📁") : "📃"}{" "}
          {explorer.name}
        </p>
        {explorer.isFolder && (
          <div className="flex gap-2">
            <button
              className="bg-white px-1 rounded"
              onClick={(e) => handleCreate(e, true)}
            >
              ➕📁
            </button>
            <button
              className="bg-white px-1 rounded"
              onClick={(e) => handleCreate(e, false)}
            >
              ➕📃
            </button>
          </div>
        )}
      </div>

      {showInput.visible && (
        <div className="pl-4 flex gap-1 items-center">
          <p>{showInput.isFolder ? "📁" : "📃"}</p>
          <input
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setShowInput(initialShowInput)}
            onKeyDown={(e) => onAddFolder(e)}
            maxLength={20}
            className="border-2 border-gray-500 rounded px-2 py-[2px] focus:outline-none"
          />
        </div>
      )}

      {expandItems && (
        <div>
          {explorer?.items.map((item) => (
            <Folder
              key={item.id}
              explorer={item}
              handleInsertNode={handleInsertNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
