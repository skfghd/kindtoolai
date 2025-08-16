"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = require("firebase-functions");
const express_1 = require("express");
const cors_1 = require("cors");
const fs_1 = require("fs");
const path_1 = require("path");
const url_1 = require("url");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = (0, path_1.dirname)(__filename);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
// 예시 API - 문의사항에 대한 응답 저장
app.post("/api/inquiries/:id/replies", async (req, res) => {
    const inquiryId = req.params.id;
    const reply = req.body.reply;
    // 실제 DB 처리 로직은 생략
    res.status(200).send({ success: true, message: "Reply saved", inquiryId, reply });
});
// 정적 파일 제공 예시 (HTML 헤더 스크립트 등)
app.get("/kindtool-header.js", (req, res) => {
    const headerScript = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "kindtool-header.js"), "utf-8");
    res.setHeader("Content-Type", "application/javascript");
    res.send(headerScript);
});
// 모든 요청 처리
app.use("*", (req, res) => {
    res.status(404).send("Not Found");
});
// Firebase Functions로 export
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map