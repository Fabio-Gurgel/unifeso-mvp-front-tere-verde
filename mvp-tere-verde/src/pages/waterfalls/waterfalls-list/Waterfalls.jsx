import styles from "./Waterfalls.module.css";

import { useState, useEffect } from "react";

import WaterfallService from "../../../services/waterfallService";

import { Funnel } from "lucide-react";
import { PageHeader } from "../../../components/page-header/PageHeader";
import { Button } from "../../../components/button/Button";
import { WaterfallCard } from "../../../components/cards/waterfall-card/WaterfallCard";

import { WaterfallsDetailsModal } from "../../../components/modals/waterfalls-details-modal/WaterfallsDetailsModal";

export function Waterfalls() {
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("AZ");
    const [waterfalls, setWaterfalls] = useState([]);
    const [selectedWaterfall, setSelectedWaterfall] = useState(null);

    const sortedWaterfalls = [...waterfalls].sort((a, b) => {
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
                    <Button shape="pill" className={styles.filterButton} type="button">
                        <Funnel aria-hidden="true" className={styles.filterIcon}/> Filtrar
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
                            <WaterfallCard waterfall={waterfall} onExplore={() => setSelectedWaterfall(waterfall)} />
                        </li>
                    ))}
                </ul>
            </main>

            {selectedWaterfall && (
                <WaterfallsDetailsModal
                    waterfall={selectedWaterfall}
                    isOpen={!!selectedWaterfall}
                    onClose={() => setSelectedWaterfall(null)} 
                />
            )}
        </>
    )
}