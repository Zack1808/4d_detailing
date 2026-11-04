export const downloadFile = async (url: string, fileName: string) => {
  const link = import.meta.env.DEV
    ? url.replace("https://firebasestorage.googleapis.com", "/firebase-storage")
    : url;

  const response = await fetch(link);

  if (!response.ok) {
    throw new Error(
      `Download failed: ${response.status} ${response.statusText}`,
    );
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(objectUrl);
};
