import { createFileItem, type FileItem } from "../../../domains/fileItems/FileItem";

export function getFileList(): FileItem[] {
  const n = 100;
  const fileList: FileItem[] = [];
  for (let i = 0; i < n; i++) {
    const item = createFileItem({
      id: Math.random().toFixed(32).slice(2),
      title: `Item ${i + 1}`,
    });
    fileList.push(item);
  }
  return fileList;
}