import { useEffect, useState } from "react";
import { FetchStatusEnum } from "./fetchStatusEnum";
import { StatSection } from "./models/StatSection";
import { Player } from "./models/Player";

export const useStats = () => {
  const [status, setStatus] = useState<FetchStatusEnum>(
    FetchStatusEnum.loading
  );
  const [playersById, setPlayersById] = useState<{ [key: string]: Player }>({});
  const [statsSections, setStatsSections] = useState<StatSection[]>([]);

  useEffect(() => {
    let canceled = false;
    const getStats = async () => {
      const res = await fetch("/.netlify/functions/stats");
      const data = await res.json();

      console.log("DATA", data);

      if (canceled) return;

      setStatus(FetchStatusEnum.success);

      const players = Object.fromEntries(
        data.players.map((item: Player) => [item.playerId, item])
      );

      setPlayersById(players);
      setStatsSections(data.stats);
    };

    if (status === FetchStatusEnum.loading) {
      getStats();
    }

    return () => {
      canceled = true;
    };
  }, [status]);

  return {
    models: { playersById, statsSections, status },
  };
};
