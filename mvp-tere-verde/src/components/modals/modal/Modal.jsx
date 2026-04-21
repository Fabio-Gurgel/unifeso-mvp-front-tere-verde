import styles from "./Modal.module.css";

import { useEffect } from "react";

import { X } from "lucide-react";
import { Button } from "../../button/Button";

export function Modal({ isOpen, onClose, leftContent, rightContent }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.container} onClick={onClose} role="presentation">
      <div
        className={styles.body}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <Button
          shape="rounded"
          onClick={onClose}
          className={styles.button}
          aria-label="Fechar modal"
        >
          <X />
        </Button>

        <div className={styles.content}>
          <div className={styles.columnLeft}>{leftContent}</div>
          <div className={styles.columnRight}>{rightContent}</div>
        </div>
      </div>
    </div>
  );
}
