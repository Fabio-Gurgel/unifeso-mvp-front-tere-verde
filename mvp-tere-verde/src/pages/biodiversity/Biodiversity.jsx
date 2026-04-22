import styles from "./Biodiversity.module.css";

import { useState, useEffect } from "react";

import FaunaService from "../../services/faunaService";
import FloraService from "../../services/floraService";

import { PageHeader } from "../../components/page-header/PageHeader";
import { Button } from "../../components/button/Button";
import { BiodiversityCard } from "../../components/cards/biodiversity-card/BiodiversityCard";

export function Biodiversity() {
  const [selected, setSelected] = useState("fauna");
  const [species, setSpecies] = useState([]);
  const [chosen, setChosen] = useState(false);

  useEffect(() => {
    async function load() {
      setChosen(true);
      try {
        const items =
          selected === "fauna"
            ? await FaunaService.getAll()
            : await FloraService.getAll();

        setSpecies(items);
      } catch (error) {
        console.error("Erro ao carregar biodiversidade: ", error);
      } finally {
        setChosen(false);
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

        {chosen ? (
            <p className={styles.loading}>Carregando itens...</p>
          ) : (
            <ul className={styles.grid}>
              {species.map((specie) => (
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
