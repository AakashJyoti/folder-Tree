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

  function deleteNode(tree: TFolder, folderId: string) {
    if (tree.id === folderId) {
      return null;
    }

    if (tree.items && tree.items.length > 0) {
      tree.items = tree.items.filter((item) => item.id !== folderId);
      tree.items.forEach((item) => {
        deleteNode(item, folderId);
      });
    }

    return tree;
  }

  function updateNode(tree: TFolder, folderId: string, item: string) {
    if (tree.id === folderId) {
      tree.name = item;
    }

    if (tree.items && tree.items.length > 0) {
      tree.items = tree.items.filter((item) => item.id !== folderId);
      tree.items.forEach((node) => {
        updateNode(node, folderId, item);
      });
    }

    return tree;
  }

  return { insetNode, deleteNode, updateNode };
};

export default useTraverseTree;
