CREATE TYPE stateGame AS ENUM ('CREATED', 'STARTED', 'ENDED', 'UNKNOWN');
ALTER TYPE public.stateGame RENAME TO host_state_enum;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  user_id text NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS host (
  id SERIAL PRIMARY KEY,
  ip text NOT NULL,
  name text NOT NULL,
  nb_players integer NOT NULL,
  state host_state_enum DEFAULT 'CREATED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ticket (
  id SERIAL PRIMARY KEY,
  title text NOT NULL,
  message text NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  state BOOLEAN DEFAULT TRUE,
  creator_id text NOT NULL
);

CREATE TABLE IF NOT EXISTS response (
  id SERIAL PRIMARY KEY,
  message text NOT NULL,
  ticket_id integer NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  creator_id text NULL
);

CREATE TABLE IF NOT EXISTS player (
  id SERIAL PRIMARY KEY,
  ip text NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_connection TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
