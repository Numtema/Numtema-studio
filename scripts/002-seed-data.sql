-- Insertion de données de test (optionnel)
INSERT INTO "User" (id, name, email, "createdAt", "updatedAt") 
VALUES 
  ('test-user-1', 'Utilisateur Test', 'test@example.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- Insertion d'agents de test
INSERT INTO "Agent" (id, name, description, model, "systemPrompt", temperature, "maxTokens", tools, memory, avatar, "userId", "createdAt", "updatedAt")
VALUES 
  (
    'agent-test-1', 
    'Agent Analyste Test', 
    'Agent de test pour l''analyse de données', 
    'gpt-4', 
    'Tu es un expert en analyse de données de test.',
    0.3,
    2000,
    '{"analytics": true, "rag": true, "webSearch": false}',
    '{"shortTerm": true, "longTerm": true}',
    '/agents/analyst.png',
    'test-user-1',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  )
ON CONFLICT (id) DO NOTHING;
