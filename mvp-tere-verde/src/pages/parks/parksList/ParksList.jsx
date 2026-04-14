import styles from "./ParksList.module.css";

import { useState } from "react";

import { ParksService } from "../../../services/ParksService";

import { Funnel } from "lucide-react";
import { PageHeader } from "../../../components/pageHeader/PageHeader";
import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/cards/card/Card";
export function ParksList() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("AZ");

  const sortLabels = {
    AZ: "Ordenar: A-Z",
    ZA: "Ordenar: Z-A",
    MIN: "Menor área",
    MAX: "Maior área",
  };

  const handleSelect = (value) => {
    setSort(value);
    setOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Parques de Teresópolis"
        subtitle="Descubra parques naturais para explorar a beleza da Serra dos Órgãos."
      />
      <main className={styles.container}>
        <div className={styles.actionsContainer}>
          <Button shape="pill" className={styles.filterButton}>
            <Funnel className={styles.filterIcon} /> Filtrar
          </Button>

          <div className={styles.dropdown}>
            <Button
              shape="pill"
              className={styles.sortButton}
              onClick={() => setOpen((prev) => !prev)}
            >
              {sortLabels[sort]}
            </Button>

            {open && (
              <div className={styles.menu}>
                <button
                  onClick={() => handleSelect("AZ")}
                  className={styles.item}
                >
                  Ordenar de A-Z
                </button>

                <button
                  onClick={() => handleSelect("ZA")}
                  className={styles.item}
                >
                  Ordenar de Z-A
                </button>

                <button
                  onClick={() => handleSelect("MIN")}
                  className={styles.item}
                >
                  Menor área
                </button>

                <button
                  onClick={() => handleSelect("MAX")}
                  className={styles.item}
                >
                  Maior área
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
