-- Function to search for similar lesson plan embeddings
CREATE OR REPLACE FUNCTION match_lesson_plan_embeddings(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.78,
  match_count int DEFAULT 5
) RETURNS TABLE (
  id uuid,
  lesson_plan_id uuid,
  content text,
  similarity float
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    lesson_plan_embeddings.id,
    lesson_plan_embeddings.lesson_plan_id,
    lesson_plan_embeddings.content,
    1 - (lesson_plan_embeddings.embedding <=> query_embedding) AS similarity
  FROM lesson_plan_embeddings
  WHERE 1 - (lesson_plan_embeddings.embedding <=> query_embedding) > match_threshold
  ORDER BY lesson_plan_embeddings.embedding <=> query_embedding
  LIMIT match_count;
END;
$$; 