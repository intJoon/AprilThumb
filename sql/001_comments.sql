CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  track_id TEXT NOT NULL,
  locale TEXT NOT NULL,
  body TEXT NOT NULL CHECK (char_length(body) >= 1 AND char_length(body) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS comments_created_at_idx ON comments (created_at DESC);
CREATE INDEX IF NOT EXISTS comments_track_locale_idx ON comments (track_id, locale);
