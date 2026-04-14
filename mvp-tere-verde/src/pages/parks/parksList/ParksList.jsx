import styles from "./ParksList.module.css";

import { PageHeader } from "../../../components/pageHeader/PageHeader";
export function ParksList() {
  return (
    <>
      <PageHeader
        title="Parques de Teresópolis"
        subtitle="Descubra parques naturais para explorar a beleza da Serra dos Órgãos."
      />
      <main className={styles.container}>conteudo bonito</main>
    </>
  );
}
