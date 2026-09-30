import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const rootDirectory = fileURLToPath(new URL(".", import.meta.url));
const clientDirectory = resolve(rootDirectory, "dist/client");
const startServer = (await import("./dist/server/server.js")).default;
const port = Number(process.env.PORT || 5174);
const host = process.env.HOST || "0.0.0.0";
const apiBaseUrl = new URL(process.env.API_BASE_URL || "http://host.docker.internal:3000");

if (!["http:", "https:"].includes(apiBaseUrl.protocol)) {
  throw new Error("API_BASE_URL must use HTTP or HTTPS");
}

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

async function serveStaticFile(request, response, url) {
  if (request.method !== "GET" && request.method !== "HEAD") return false;

  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    response.writeHead(400).end();
    return true;
  }

  const filePath = resolve(clientDirectory, `.${pathname}`);
  if (filePath !== clientDirectory && !filePath.startsWith(`${clientDirectory}${sep}`)) {
    response.writeHead(400).end();
    return true;
  }

  let fileInfo;
  try {
    fileInfo = await stat(filePath);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
  if (!fileInfo.isFile()) return false;

  const headers = {
    "content-length": fileInfo.size,
    "content-type": contentTypes.get(extname(filePath).toLowerCase()) ?? "application/octet-stream",
    "cache-control": url.pathname.startsWith("/assets/")
      ? "public, max-age=31536000, immutable"
      : "no-cache",
  };
  response.writeHead(200, headers);
  if (request.method === "HEAD") {
    response.end();
  } else {
    createReadStream(filePath).pipe(response);
  }
  return true;
}

async function proxyApiRequest(incomingRequest, outgoingResponse, url) {
  const method = incomingRequest.method || "GET";
  const headers = new Headers(incomingRequest.headers);
  headers.delete("connection");
  headers.delete("host");
  headers.delete("content-length");

  const upstreamUrl = new URL(`${url.pathname}${url.search}`, apiBaseUrl);
  const upstreamResponse = await fetch(upstreamUrl, {
    method,
    headers,
    ...(method !== "GET" && method !== "HEAD"
      ? { body: Readable.toWeb(incomingRequest), duplex: "half" }
      : {}),
  });

  const responseHeaders = Object.fromEntries(upstreamResponse.headers);
  const cookies = upstreamResponse.headers.getSetCookie();
  if (cookies.length > 0) responseHeaders["set-cookie"] = cookies;

  outgoingResponse.writeHead(upstreamResponse.status, responseHeaders);
  if (upstreamResponse.body && method !== "HEAD") {
    Readable.fromWeb(upstreamResponse.body).pipe(outgoingResponse);
  } else {
    outgoingResponse.end();
  }
}

async function handleRequest(incomingRequest, outgoingResponse) {
  const url = new URL(incomingRequest.url || "/", `http://${incomingRequest.headers.host || "localhost"}`);

  if (url.pathname === "/healthz") {
    outgoingResponse.writeHead(200, { "content-type": "text/plain; charset=utf-8" }).end("ok");
    return;
  }

  if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
    await proxyApiRequest(incomingRequest, outgoingResponse, url);
    return;
  }

  if (await serveStaticFile(incomingRequest, outgoingResponse, url)) return;

  const method = incomingRequest.method || "GET";
  const request = new Request(url, {
    method,
    headers: incomingRequest.headers,
    ...(method !== "GET" && method !== "HEAD"
      ? { body: Readable.toWeb(incomingRequest), duplex: "half" }
      : {}),
  });
  const result = await startServer.fetch(request, process.env, {});
  const headers = Object.fromEntries(result.headers);
  const cookies = result.headers.getSetCookie();
  if (cookies.length > 0) headers["set-cookie"] = cookies;
  outgoingResponse.writeHead(result.status, headers);
  if (result.body && method !== "HEAD") {
    Readable.fromWeb(result.body).pipe(outgoingResponse);
  } else {
    outgoingResponse.end();
  }
}

createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    console.error(error);
    if (response.headersSent) {
      response.destroy(error);
    } else {
      response.writeHead(500).end("Internal Server Error");
    }
  });
}).listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
});
