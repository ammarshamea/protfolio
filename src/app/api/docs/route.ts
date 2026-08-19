import { NextResponse } from "next/server";
import { getOpenApiSpec } from "@/lib/openapi";

export function GET() {
  return NextResponse.json(getOpenApiSpec());
}
