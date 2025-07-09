import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const agent = await sql`
      SELECT * FROM "Agent" 
      WHERE id = ${params.id} AND "userId" = ${session.user.id}
    `

    if (agent.length === 0) {
      return NextResponse.json({ error: "Agent non trouvé" }, { status: 404 })
    }

    return NextResponse.json(agent[0])
  } catch (error) {
    console.error("Erreur lors de la récupération de l'agent:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const data = await request.json()
    const { name, description, model, systemPrompt, temperature, maxTokens, tools, memory, avatar } = data

    // Vérifier que l'agent appartient à l'utilisateur
    const existingAgent = await sql`
      SELECT id FROM "Agent" 
      WHERE id = ${params.id} AND "userId" = ${session.user.id}
    `

    if (existingAgent.length === 0) {
      return NextResponse.json({ error: "Agent non trouvé" }, { status: 404 })
    }

    const updatedAgent = await sql`
      UPDATE "Agent" 
      SET 
        name = ${name},
        description = ${description || ""},
        model = ${model},
        "systemPrompt" = ${systemPrompt || ""},
        temperature = ${temperature || 0.7},
        "maxTokens" = ${maxTokens || 1000},
        tools = ${JSON.stringify(tools || {})},
        memory = ${JSON.stringify(memory || {})},
        avatar = ${avatar || ""},
        "updatedAt" = NOW()
      WHERE id = ${params.id} AND "userId" = ${session.user.id}
      RETURNING *
    `

    return NextResponse.json(updatedAgent[0])
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'agent:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier que l'agent appartient à l'utilisateur
    const existingAgent = await sql`
      SELECT id FROM "Agent" 
      WHERE id = ${params.id} AND "userId" = ${session.user.id}
    `

    if (existingAgent.length === 0) {
      return NextResponse.json({ error: "Agent non trouvé" }, { status: 404 })
    }

    await sql`
      DELETE FROM "Agent" 
      WHERE id = ${params.id} AND "userId" = ${session.user.id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la suppression de l'agent:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
