// middleware.ts (va al lado de la carpeta pages)

import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.method == "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers":
          req.headers.get("Access-Control-Request-Headers") || "",
        Vary: "Access-Control-Request-Headers",
        "Content-Length": "0",
      },
    });
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
