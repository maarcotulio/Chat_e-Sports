import { Match } from "@/@types/matches";
import { Calendar, Clock, Trophy } from "lucide-react";

export default function MatchCard({ match }: { match: Match }) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-cyan-500 transition-all duration-300 transform hover:scale-102">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Trophy size={18} className="text-cyan-500 mr-2" />
            <span className="text-gray-300 text-sm font-medium">
              {match.tournament.name}
            </span>
          </div>
          <div className="flex items-center">
            <Calendar size={18} className="text-cyan-500 mr-2" />
            <span className="text-gray-300 text-sm">
              {formatDate(match.date)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center py-4">
          <div className="flex flex-col items-center w-2/5">
            <div className="h-16 w-16 flex items-center justify-center">
              <img
                src={match.teamA.logoUrl || "/api/placeholder/64/64"}
                alt={match.teamA.name}
                className="max-h-16 max-w-full"
              />
            </div>
            <span className="mt-2 text-white font-bold text-center">
              {match.teamA.name}
            </span>
          </div>

          <div className="flex flex-col items-center w-1/5">
            <div className="text-cyan-500 font-bold text-xl mb-1">VS</div>
            <div className="flex items-center">
              <Clock size={14} className="text-cyan-500 mr-1" />
              <span className="text-gray-300 text-xs">
                {formatTime(match.date)}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center w-2/5">
            <div className="h-16 w-16 flex items-center justify-center">
              <img
                src={match.teamB.logoUrl || "/api/placeholder/64/64"}
                alt={match.teamB.name}
                className="max-h-16 max-w-full"
              />
            </div>
            <span className="mt-2 text-white font-bold text-center">
              {match.teamB.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
