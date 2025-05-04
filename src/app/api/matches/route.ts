import { NextResponse } from "next/server";
import axios from "axios";

const API_TOKEN = process.env.PANDASCORE_TOKEN;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") || 1;

  try {
    const matchRes = await axios.get(
      `https://api.pandascore.co/teams/124530/matches`,
      {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        params: { per_page: 6, page: page },
      }
    );

    const matches = matchRes.data;

    const formatted = matches
      .filter((m: any) => m.opponents.length === 2)
      .map((match: any) => {
        const teamA = match.opponents[0]?.opponent;
        const teamB = match.opponents[1]?.opponent;

        return {
          id: match.id,
          tournamentId: match.league?.id || null,
          date: match.scheduled_at,
          teamAId: teamA?.id || null,
          teamBId: teamB?.id || null,
          tournament: {
            name: match.league?.name || "Desconhecido",
          },
          teamA: {
            name: teamA?.name || "Time A",
            logoUrl: teamA?.image_url || null,
          },
          teamB: {
            name: teamB?.name || "Time B",
            logoUrl: teamB?.image_url || null,
          },
        };
      });

    return NextResponse.json(formatted);
  } catch (err: any) {
    console.error("Erro na API:", err.response?.data || err.message);
    return NextResponse.json(
      { error: "Erro ao consultar API externa." },
      { status: 500 }
    );
  }
}
