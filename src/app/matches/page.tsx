"use client";

import { cn } from "@/lib/utils";
import MatchCard from "./components/matchCard";
import useMatches from "./useMatches";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
export default function Matches() {
  const {
    filteredMatches,
    tournaments,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    handleLoadMore,
    isLoading,
  } = useMatches();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-h-screen bg-gray-950 text-white flex flex-col items-center justify-start overflow-y-auto">
      <main className="container mx-auto px-4 py-8 w-full overflow-y-auto flex flex-col">
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-white rounded-md px-4 py-2 appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
              >
                <option value="all">Todos os torneios</option>
                {tournaments.map((tournament) => (
                  <option key={tournament} value={tournament}>
                    {tournament}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-white rounded-md px-4 py-2 appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
              >
                <option value="date">Ordenar por data</option>
                <option value="popularity">Ordenar por popularidade</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <MatchCard key={uuidv4()} match={match} />
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Nenhum resultado encontrado para sua pesquisa.
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md hover:cursor-pointer font-medium transition-colors duration-300"
            onClick={() => handleLoadMore()}
          >
            Carregar mais
          </button>
        </div>
      </main>
    </div>
  );
}
