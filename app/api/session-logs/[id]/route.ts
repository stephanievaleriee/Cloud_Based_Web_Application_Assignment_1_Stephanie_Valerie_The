import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const updated = await prisma.sessionLog.update({
    where: { id: Number(id) },
    data: body,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const deleted = await prisma.sessionLog.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(deleted);
}
