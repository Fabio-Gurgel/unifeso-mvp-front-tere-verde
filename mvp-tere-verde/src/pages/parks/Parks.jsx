import styles from "./Parks.module.css";

import { useState, useEffect } from "react";

import ParksService from "../../services/parkService";

import { Funnel } from "lucide-react";
import { PageHeader } from "../../components/page-header/PageHeader";
import { Button } from "../../components/button/Button";
import { ParkCard } from "../../components/cards/park-card/ParkCard";

import { ParkDetailsModal } from "../../components/modals/park-details-modal/ParkDetailsModal";
export function Parks() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("AZ");
  const [parks, setParks] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPark, setSelectedPark] = useState(null);

  const filteredParks = difficulty
    ? parks.filter((p) => p.dificuldade_acesso === difficulty)
    : parks;

  const sortedParks = [...filteredParks].sort((a, b) => {
    switch (sort) {
      case "AZ":
        return a.nome.localeCompare(b.nome);
      case "ZA":
        return b.nome.localeCompare(a.nome);
      case "MIN":
        return a.area_total_ha - b.area_total_ha;
      case "MAX":
        return b.area_total_ha - a.area_total_ha;
      default:
        return 0;
    }
  });

  useEffect(() => {
    async function load() {
      const data = await ParksService.getAll();
      setParks(data);
    }
    load();
  }, []);

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
          <div className={styles.dropdown}>
            <Button
              shape="pill"
              className={styles.filterButton}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Funnel className={styles.filterIcon} /> Filtrar
            </Button>

            {filterOpen && (
              <div className={styles.menu}>
                <button
                  onClick={() => {
                    setDifficulty("FACIL");
                    setFilterOpen(false);
                  }}
                  className={styles.item}
                >
                  Fácil
                </button>

                <button
                  onClick={() => {
                    setDifficulty("MÉDIO");
                    setFilterOpen(false);
                  }}
                  className={styles.item}
                >
                  Médio
                </button>

                <button
                  onClick={() => {
                    setDifficulty("DIFICIL");
                    setFilterOpen(false);
                  }}
                  className={styles.item}
                >
                  Difícil
                </button>

                <button
                  onClick={() => {
                    setDifficulty(null);
                    setFilterOpen(false);
                  }}
                  className={styles.item}
                >
                  Limpar filtro
                </button>
              </div>
            )}
          </div>

          <div className={styles.dropdown}>
            <Button
              shape="pill"
              className={styles.sortButton}
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-haspopup="menu"
            >
              {sortLabels[sort]}
            </Button>

            {open && (
              <div className={styles.menu}>
                <button
                  onClick={() => handleSelect("AZ")}
                  className={styles.item}
                  role="menuitem"
                >
                  Ordenar de A-Z
                </button>

                <button
                  onClick={() => handleSelect("ZA")}
                  className={styles.item}
                  role="menuitem"
                >
                  Ordenar de Z-A
                </button>

                <button
                  onClick={() => handleSelect("MIN")}
                  className={styles.item}
                  role="menuitem"
                >
                  Menor área
                </button>

                <button
                  onClick={() => handleSelect("MAX")}
                  className={styles.item}
                  role="menuitem"
                >
                  Maior área
                </button>
              </div>
            )}
          </div>
        </div>
        <ul className={styles.grid}>
          {sortedParks.map((park) => (
            <li key={park.id}>
              <ParkCard park={park} onExplore={() => setSelectedPark(park)} />
            </li>
          ))}
        </ul>
      </main>

      {selectedPark && (
        <ParkDetailsModal
          park={selectedPark}
          isOpen={!!selectedPark}
          onClose={() => setSelectedPark(null)}
        />
      )}
    </>
  );
}
