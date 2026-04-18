import { useEffect } from "react"; // Importe o useEffect
import styles from "./Modal.module.css";
import { Button } from "../../button/Button";
import { X } from "lucide-react";

export function Modal({ isOpen, onClose, leftContent, rightContent }) {
  
  useEffect(() => {
    if (isOpen) {
      // Bloqueia o scroll do corpo da página
      document.body.style.overflow = "hidden";
    } else {
      // Libera o scroll quando o modal fecha
      document.body.style.overflow = "unset";
    }

    // Cleanup: garante que o scroll volte se o componente for desmontado inesperadamente
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.container} onClick={onClose}>
      {/* stopPropagation impede que o modal feche ao clicar dentro do conteúdo */}
      <div className={styles.body} onClick={(e) => e.stopPropagation()}>
        <Button shape="rounded" onClick={onClose} className={styles.button}>
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