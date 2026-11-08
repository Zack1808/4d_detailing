import { useCallback, useState } from "react";

import { downloadFile } from "../utils/download";
import { notifyError } from "../utils/toast";

export const useFileDownload = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const download = useCallback(
    async (key: string, url: string, fileName: string) => {
      setActiveKey(key);

      try {
        await downloadFile(url, fileName);
      } catch (error) {
        console.error("Download failed:", error);
        notifyError("Preuzimanje nije uspjelo. Pokušajte ponovno.");
      } finally {
        setActiveKey(null);
      }
    },
    [],
  );

  return { activeKey, download };
};
