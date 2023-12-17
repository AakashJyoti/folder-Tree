import { useState } from "react";
import { explorer } from "./assets/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/useTraverseTree";

function App() {
  const [explorerData, setExplorerData] = useState<TFolder>(explorer);

  const { insetNode } = useTraverseTree();

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

  return (
    <div className="p-10">
      <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />
    </div>
  );
}

export default App;
