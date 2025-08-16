import * as functions from "firebase-functions";
import express, { Request, Response } from "express";
import cors from "cors";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// 예시 API - 문의사항에 대한 응답 저장
app.post("/api/inquiries/:id/replies", async (req: Request, res: Response) => {
  const inquiryId = req.params.id;
  const reply = req.body.reply;
  // 실제 DB 처리 로직은 생략
  res.status(200).send({ success: true, message: "Reply saved", inquiryId, reply });
});

// 정적 파일 제공 예시 (HTML 헤더 스크립트 등)
app.get("/kindtool-header.js", (req: Request, res: Response) => {
  const headerScript = readFileSync(join(__dirname, "kindtool-header.js"), "utf-8");
  res.setHeader("Content-Type", "application/javascript");
  res.send(headerScript);
});

// 모든 요청 처리
app.use("*", (req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

// Firebase Functions로 export
export const api = functions.https.onRequest(app);