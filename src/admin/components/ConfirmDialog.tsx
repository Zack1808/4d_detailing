import type { ReactNode } from "react";

import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  children?: ReactNode;
  confirmLabel: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmDialog = ({
  open,
  title,
  children,
  confirmLabel,
  loading,
  onConfirm,
  onClose,
}: ConfirmDialogProps) => (
  <Modal open={open} onClose={onClose} title={title}>
    <div className="mt-4 flex flex-col gap-6">
      {children && <div className="font-light">{children}</div>}

      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Odustani
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={loading}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  </Modal>
);

export default ConfirmDialog;
