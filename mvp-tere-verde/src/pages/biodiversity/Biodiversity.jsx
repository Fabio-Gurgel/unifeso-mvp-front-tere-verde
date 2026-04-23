import styles from "./Biodiversity.module.css";

import { useState, useEffect } from "react";

import FaunaService from "../../services/faunaService";
import FloraService from "../../services/floraService";

import { Funnel } from "lucide-react";
import { PageHeader } from "../../components/page-header/PageHeader";
import { Button } from "../../components/button/Button";
import { BiodiversityCard } from "../../components/cards/biodiversity-card/BiodiversityCard";

export function Biodiversity() {
  const [selected, setSelected] = useState("fauna");
  const [species, setSpecies] = useState([]);
  const [loading, setloading] = useState(false);
  const [sort, setSort] = useState("AZ");
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredSpecies = species.filter((item) => {
    if (statusFilter === "todos") return true;
    return item.status_conservacao === statusFilter;
  });

  const sortedSpecies = [...filteredSpecies].sort((a, b) => {
    const nameA = a?.nome_popular || "";
    const nameB = b?.nome_popular || "";

    switch (sort) {
      case "AZ":
        return nameA.localeCompare(nameB);
      case "ZA":
        return nameB.localeCompare(nameA);
      default:
        return 0;
    }
  });

  const sortLabels = {
    AZ: "Ordenar: A-Z",
    ZA: "Ordenar: Z-A",
  };

  const handleSelect = (value) => {
    setSort(value);
    setOpen(false);
  };

  const handleFilterSelect = (value) => {
    setStatusFilter(value);
    setFilterOpen(false);
  };

  useEffect(() => {
    async function load() {
      setloading(true);
      try {
        const items =
          selected === "fauna"
            ? await FaunaService.getAll()
            : await FloraService.getAll();

        setSpecies(items);
      } catch (error) {
        console.error("Erro ao carregar biodiversidade: ", error);
      } finally {
        setloading(false);
      }
    }

    load();
  }, [selected]);

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

        <section className={styles.actionsContainer}>
          <div className={styles.dropdown}>
            <Button
              shape="pill"
              className={styles.filterButton}
              onClick={() => setFilterOpen((prev) => !prev)}
              aria-expanded={filterOpen}
              aria-haspopup="menu"
            >
              <Funnel aria-hidden="true" className={styles.filterIcon} />{" "}
              Filtrar
            </Button>

            {filterOpen && (
              <div className={styles.menu}>
                <button
                  onClick={() => handleFilterSelect("todos")}
                  className={styles.item}
                >
                  Todos
                </button>

                <button
                  onClick={() => handleFilterSelect("Vulnerável")}
                  className={styles.item}
                >
                  Vulnerável
                </button>

                <button
                  onClick={() => handleFilterSelect("Em perigo")}
                  className={styles.item}
                >
                  Em perigo
                </button>

                <button
                  onClick={() => handleFilterSelect("Em perigo crítico")}
                  className={styles.item}
                >
                  Em perigo crítico
                </button>

                <button
                  onClick={() => handleFilterSelect("Não ameaçada")}
                  className={styles.item}
                >
                  Não ameaçada
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
              </div>
            )}
          </div>
        </section>

        {loading ? (
          <p className={styles.loading}>Carregando itens...</p>
        ) : (
          <ul className={styles.grid}>
            {sortedSpecies.map((specie) => (
              <li key={specie.id}>
                <BiodiversityCard
                  bio={specie}
                  onExplore={() => console.log("Explorar", specie.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
