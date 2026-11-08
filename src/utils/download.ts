const EXTENSIONS: Record<string, string> = {
  "application/pdf": ".pdf",
  "application/vnd.ms-excel": ".xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "text/csv": ".csv",
  "image/png": ".png",
  "image/jpeg": ".jpg",
};

const withExtension = (fileName: string, mimeType: string) => {
  if (/\.[a-z0-9]{2,5}$/i.test(fileName)) return fileName;

  return `${fileName}${EXTENSIONS[mimeType.split(";")[0]] ?? ""}`;
};

export const downloadFile = async (url: string, fileName: string) => {
  const link = url.replace(
    "https://firebasestorage.googleapis.com",
    "/firebase-storage",
  );

  const response = await fetch(link);

  if (!response.ok) {
    throw new Error(
      `Download failed: ${response.status} ${response.statusText}`,
    );
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = withExtension(fileName, blob.type);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(objectUrl);
};
