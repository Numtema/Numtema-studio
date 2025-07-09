-- Création des tables pour l'application
CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  "emailVerified" TIMESTAMP,
  image TEXT,
  password TEXT,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Agent" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  model TEXT NOT NULL,
  "systemPrompt" TEXT,
  temperature REAL DEFAULT 0.7,
  "maxTokens" INTEGER DEFAULT 1000,
  tools JSONB,
  memory JSONB,
  avatar TEXT,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "userId" TEXT NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Project" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "userId" TEXT NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Table de liaison pour les agents et projets
CREATE TABLE IF NOT EXISTS "ProjectAgent" (
  "projectId" TEXT NOT NULL,
  "agentId" TEXT NOT NULL,
  PRIMARY KEY ("projectId", "agentId"),
  FOREIGN KEY ("projectId") REFERENCES "Project"(id) ON DELETE CASCADE,
  FOREIGN KEY ("agentId") REFERENCES "Agent"(id) ON DELETE CASCADE
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_agent_user ON "Agent"("userId");
CREATE INDEX IF NOT EXISTS idx_project_user ON "Project"("userId");
CREATE INDEX IF NOT EXISTS idx_user_email ON "User"(email);
