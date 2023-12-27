import { useState } from "react";
import { explorer } from "./assets/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/useTraverseTree";

function App() {
  const [explorerData, setExplorerData] = useState<TFolder>(explorer);
  const [, setReRender] = useState(false);

  const { insetNode, deleteNode, updateNode } = useTraverseTree();

  const handleInsertNode = (
    folderId: string,
    item: string,
    isFolder: boolean
  ) => {
    const finalTree = insetNode(explorerData, folderId, item, isFolder);
    if (finalTree) {
      setExplorerData(finalTree);
    }
  };

  const handleDeleteNode = (folderId: string) => {
    const finalTree = deleteNode(explorerData, folderId);
    if (finalTree) {
      setExplorerData(finalTree);
    }
    setReRender((prev) => !prev);
  };

  const handleUpdateNode = (folderId: string, item: string) => {
    const finalTree = updateNode(explorerData, folderId, item);
    if (finalTree) {
      setExplorerData(finalTree);
    }
    setReRender((prev) => !prev);
  };

  return (
    <div className="p-10">
      <Folder
        explorer={explorerData}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleUpdateNode={handleUpdateNode}
      />
    </div>
  );
}

export default App;
