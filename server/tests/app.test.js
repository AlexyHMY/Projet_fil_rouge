import request from "supertest";
import app from "../app.js";
import { connectDB, getDB } from "../config/db.js";

let token;
let contactId;

beforeAll(async () => {
    await connectDB(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
    const db = getDB();
    await db.collection('user').deleteOne({ email: "test@exemple.com" });
});

describe("AUTH Tests", () => {
    test("POST /auth/register", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                email: "test@exemple.com",
                password: "password123"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("email");
    });

    test("POST /auth/login", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "test@exemple.com",
                password: "password123"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");

        token = res.body.token;
    });
});

describe("CONTACTS Tests", () => {
    test("POST /contacts", async () => {
        const res = await request(app)
            .post("/contacts")
            .set("Authorization", `Bearer ${token}`)
            .send({
                firstName: "John",
                lastName: "Doe",
                phone: "1234567890"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");

        contactId = res.body._id;
    });

    test("GET /contacts", async () => {
        const res = await request(app)
            .get("/contacts")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test("PATCH /contacts/:id", async () => {
        const res = await request(app)
            .patch(`/contacts/${contactId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                firstName: "Jane",
                lastName: "Doe",
                phone: "0987654321"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("matchedCount", 1);
    });

    test("DELETE /contacts/:id", async () => {
        const res = await request(app)
            .delete(`/contacts/${contactId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("deletedCount", 1);
    });
});