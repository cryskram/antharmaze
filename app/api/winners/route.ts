import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.winner.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(data);
}
