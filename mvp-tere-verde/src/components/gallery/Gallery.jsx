import styles from "./Gallery.module.css";

import { useState } from "react";

export function Gallery({ photos = [], altPrefix = "Foto" }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (photos.length === 0) {
    return (
      <div className={styles.placeholder}>
        <img src="/placeholder.jpg" alt={`Sem fotos disponíveis.`} />
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      <img
        className={styles.mainPhoto}
        src={photos[activeIndex]}
        alt={`${altPrefix} ${activeIndex + 1}.`}
        onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
      />

      {photos.length > 1 && (
        <div className={styles.thumbs}>
          {photos.map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={`${altPrefix} miniatura ${i + 1}`}
              className={`${styles.thumb} ${i === activeIndex ? styles.active : ""}`}
              onClick={() => setActiveIndex(i)}
              onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
