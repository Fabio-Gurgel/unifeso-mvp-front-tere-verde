import styles from "./Biodiversity.module.css";

import { useState } from "react";

import { PageHeader } from "../../components/page-header/PageHeader";
import { Button } from "../../components/button/Button";

export function Biodiversity() {
  const [selected, setSelected] = useState("fauna");

  return (
    <>
      <PageHeader
        title="Biodiversidade"
        subtitle="Conheça a rica biodiversidade da Serra dos Órgãos."
      />
      <main className={styles.container}>
        <section className={styles.filterButtons}>
          <Button
            shape="pill"
            type="button"
            className={`${styles.filterBiodiversity} ${
              selected === "fauna" ? styles.active : ""
            }`}
            onClick={() => setSelected("fauna")}
          >
            Fauna
          </Button>

          <Button
            shape="pill"
            type="button"
            className={`${styles.filterBiodiversity} ${
              selected === "flora" ? styles.active : ""
            }`}
            onClick={() => setSelected("flora")}
          >
            Flora
          </Button>
        </section>
      </main>
    </>
  );
}
