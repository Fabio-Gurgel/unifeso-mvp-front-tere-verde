import styles from "./Trails.module.css";

import { useState, useEffect } from "react";

import Trail from "../../services/trailService";

import { Funnel } from "lucide-react";
import { PageHeader } from "../../components/page-header/PageHeader";
import { Button } from "../../components/button/Button";
import { TrailCard } from "../../components/cards/trail-card/TrailCard";

import { TrailsDetailsModal } from "../../components/modals/trails-details-modal/TrailsDetailsModal";

export function Trails() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("AZ");
  const [trails, setTrails] = useState([]);
  const [selectedTrail, setSelectedTrail] = useState(null);

  const sortedTrails = [...trails].sort((a, b) => {
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
      const data = await Trail.getAll();
      setTrails(data);
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
        title="Trilhas de Teresópolis"
        subtitle="Explore as principais trilhas e caminhos pelos parques naturais da região."
      />
      <main className={styles.container}>
        <div className={styles.actionsContainer}>
          <Button shape="pill" className={styles.filterButton}>
            <Funnel aria-hidden="true" className={styles.filterIcon} /> Filtrar
          </Button>

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
          {sortedTrails.map((trail) => (
            <li key={trail.id}>
              <TrailCard trail={trail} onExplore={() => setSelectedTrail(trail)} />
            </li>
          ))}
        </ul>
      </main>

      {selectedTrail && (
        <TrailsDetailsModal
          trail={selectedTrail}
          isOpen={!!selectedTrail}
          onClose={() => setSelectedTrail(null)}
        />
      )}
    </>
  );
}
