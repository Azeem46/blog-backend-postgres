CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  -- Required to use UUID generation

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- UUID type for user ID
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    message TEXT,
    name VARCHAR(255),
    tags TEXT[],
    selected_file TEXT,
    likes TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    creator UUID NOT NULL,           -- UUID to match the users table
    views INTEGER DEFAULT 0,
    creator_name VARCHAR(255),
    CONSTRAINT fk_user FOREIGN KEY (creator) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,            -- Unique identifier for each bookmark
    user_id UUID NOT NULL,            -- UUID to match the users table
    post SERIAL NOT NULL,              -- Serial to match the posts table
    created_at TIMESTAMP DEFAULT NOW(), -- Timestamp for when the bookmark was created
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_post FOREIGN KEY (post) REFERENCES posts(id) ON DELETE CASCADE
);
-- for bookmarks only 
--ALTER TABLE bookmarks
--ADD COLUMN post_id UUID;


CREATE TABLE comments (
    id SERIAL PRIMARY KEY,                      -- Unique identifier for each comment
    post_id SERIAL NOT NULL,                    -- Serial to match the posts table
    user_id UUID NOT NULL,                      -- UUID to match the users table
    text VARCHAR(500) NOT NULL,                 -- Comment text with a maximum length of 500 characters
    created_at TIMESTAMP DEFAULT NOW(),         -- Timestamp for when the comment was created
    updated_at TIMESTAMP DEFAULT NOW(),         -- Timestamp for when the comment was last updated
    CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
