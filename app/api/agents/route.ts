import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const agents = await sql`
      SELECT * FROM "Agent" 
      WHERE "userId" = ${session.user.id}
      ORDER BY "createdAt" DESC
    `

    return NextResponse.json(agents)
  } catch (error) {
    console.error("Erreur lors de la récupération des agents:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const data = await request.json()
    const { name, description, model, systemPrompt, temperature, maxTokens, tools, memory, avatar } = data

    // Validation des données
    if (!name || !model) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 })
    }

    const newAgent = await sql`
      INSERT INTO "Agent" (
        id, name, description, model, "systemPrompt", temperature, "maxTokens", 
        tools, memory, avatar, "userId", "createdAt", "updatedAt"
      )
      VALUES (
        ${crypto.randomUUID()}, ${name}, ${description || ""}, ${model}, 
        ${systemPrompt || ""}, ${temperature || 0.7}, ${maxTokens || 1000},
        ${JSON.stringify(tools || {})}, ${JSON.stringify(memory || {})}, 
        ${avatar || ""}, ${session.user.id}, NOW(), NOW()
      )
      RETURNING *
    `

    return NextResponse.json(newAgent[0], { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création de l'agent:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
