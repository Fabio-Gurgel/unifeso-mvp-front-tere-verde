import styles from "./Waterfalls.module.css";

import { useState, useEffect } from "react";

import WaterfallService from "../../../services/waterfallService";

import { Funnel } from "lucide-react";
import { PageHeader } from "../../../components/page-header/PageHeader";
import { Button } from "../../../components/button/Button";
import { WaterfallCard } from "../../../components/cards/waterfall-card/WaterfallCard";

import { WaterfallsDetailsModal } from "../../../components/modals/waterfalls-details-modal/WaterfallsDetailsModal";
import { ParkDetailsModal } from "../../../components/modals/park-details-modal/ParkDetailsModal";
import { TrailsDetailsModal } from "../../../components/modals/trails-details-modal/TrailsDetailsModal";

export function Waterfalls() {
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("AZ");
    const [waterfalls, setWaterfalls] = useState([]);
    const [risk, setRisk] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedWaterfall, setSelectedWaterfall] = useState(null);
    const [selectedPark, setSelectedPark] = useState(null);
    const [selectedTrail, setSelectedTrail] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const filteredWaterfalls = risk
        ? waterfalls.filter((w) => w.seguranca.risco_tromba_dagua === risk)
        : waterfalls;

    const sortedWaterfalls = [...filteredWaterfalls].sort((a, b) => {
        switch (sort) {
            case "AZ":
                return a.nome.localeCompare(b.nome);
            case "ZA":
                return b.nome.localeCompare(a.nome);
            case "MIN":
                return a.altura_queda_m - b.altura_queda_m;
            case "MAX":
                return b.altura_queda_m - a.altura_queda_m;
            default:
                return 0;
        }
    });

    useEffect(() => {
        async function load() {
            const data = await WaterfallService.getAll();
            setWaterfalls(data);
        }
        load();
    }, []);

    const sortLabels = {
        AZ: "Ordenar: A-Z",
        ZA: "Ordenar: Z-A",
        MIN: "Menor altura",
        MAX: "Maior altura",
    };

    const handleSelect = (value) => {
        setSort(value);
        setOpen(false);
    }; 

    return (
      <>
        <PageHeader
          title="Cachoeiras de Teresópolis"
          subtitle="Descubra as belas cachoeiras e poços naturais dos parques da região."
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
                      setRisk("BAIXO");
                      setFilterOpen(false);
                    }}
                    className={styles.item}
                  >
                    Risco: Baixo
                  </button>

                  <button
                    onClick={() => {
                      setRisk("MEDIO");
                      setFilterOpen(false);
                    }}
                    className={styles.item}
                  >
                    Risco: Médio
                  </button>

                  <button
                    onClick={() => {
                      setRisk("ALTO");
                      setFilterOpen(false);
                    }}
                    className={styles.item}
                  >
                    Risco: Alto
                  </button>

                  <button
                    onClick={() => {
                      setRisk(null);
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
                    Menor altura
                  </button>
                  <button
                    onClick={() => handleSelect("MAX")}
                    className={styles.item}
                    role="menuitem"
                  >
                    Maior altura
                  </button>
                </div>
              )}
            </div>
          </div>
          <ul className={styles.grid}>
            {sortedWaterfalls.map((waterfall) => (
              <li key={waterfall.id}>
                <WaterfallCard
                  waterfall={waterfall}
                  onExplore={() => {
                    setSelectedWaterfall(waterfall);
                    setModalOpen(true);
                  }}
                />
              </li>
            ))}
          </ul>
        </main>

        {modalOpen && selectedWaterfall && (
          <WaterfallsDetailsModal
            waterfall={selectedWaterfall}
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onViewPark={(park) => {
              setSelectedPark(park);
              setModalOpen(false);
            }}
            onViewTrail={(trail) => {
              setSelectedTrail(trail);
              setModalOpen(false);
            }}
          />
        )}

        <ParkDetailsModal
          park={selectedPark}
          isOpen={!!selectedPark}
          onClose={() => setSelectedPark(null)}
        />

        {selectedTrail && (
          <TrailsDetailsModal
            trail={selectedTrail}
            isOpen={!!selectedTrail}
            onClose={() => setSelectedTrail(null)}
            onViewPark={(park) => {
              setSelectedPark(park);
              setSelectedTrail(null);
            }}
          />
        )}
      </>
    );
}