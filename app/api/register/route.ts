import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 })
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUsers = await sql`
      SELECT * FROM "User" WHERE email = ${email}
    `

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 400 })
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Créer l'utilisateur
    const newUser = await sql`
      INSERT INTO "User" (id, name, email, password, "createdAt", "updatedAt")
      VALUES (${crypto.randomUUID()}, ${name}, ${email}, ${hashedPassword}, NOW(), NOW())
      RETURNING id, name, email, "createdAt"
    `

    return NextResponse.json(newUser[0], { status: 201 })
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
