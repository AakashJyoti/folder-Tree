import { v4 } from "uuid";

const useTraverseTree = () => {
  function insetNode(
    tree: TFolder,
    folderId: string,
    item: string,
    isFolder: boolean
  ): TFolder {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: v4(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insetNode(obj, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  }

  return { insetNode };
};

export default useTraverseTree;
