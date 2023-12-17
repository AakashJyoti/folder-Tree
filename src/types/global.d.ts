export {};

declare global {
  type TFolder = {
    id: string;
    name: string;
    isFolder: boolean;
    items: TFolder[];
  };
}
