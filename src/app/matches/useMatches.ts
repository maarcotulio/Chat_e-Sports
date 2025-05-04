import { useEffect, useState } from "react";
import { Match } from "@/@types/matches";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useMatches() {
  const { refetch, isPending: isLoading } = useQuery({
    queryKey: ["matches"],
    queryFn: () => fetchMatches(),
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const filteredMatches = matches
    .filter((match) => {
      if (filter !== "all") {
        return match.tournament.name === filter;
      }
      return true;
    })
    .filter((match) => {
      if (searchTerm) {
        return (
          match.teamA.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.teamB.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.tournament.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return 0;
    });

  const tournaments = [
    ...new Set(matches.map((match) => match.tournament.name)),
  ];

  const handleLoadMore = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    refetch();
  }, [page]);

  const fetchMatches = async () => {
    const response = await fetch(`/api/matches?page=${page}`);
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    }

    setMatches((prevMatches) => [...prevMatches, ...data]);
    return data;
  };

  return {
    filteredMatches,
    tournaments,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    handleLoadMore,
    isLoading,
  };
}
