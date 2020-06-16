BEGIN TRANSACTION;
CREATE TABLE tag (
    id INTEGER PRIMARY KEY,
    label TEXT
);

CREATE TABLE notepad (
    id INTEGER PRIMARY KEY,
    title TEXT,
    created_date INT,
    updated_date INT
);

CREATE TABLE note (
    id INTEGER PRIMARY KEY,
    notepad_id INT,
    note_text TEXT,
    created_date INT,
    updated_date INT,
    FOREIGN KEY(notepad_id) REFERENCES notepad(id)
);

CREATE TABLE tagged_notes (
    id INTEGER PRIMARY KEY,
    note_id INT,
    tag_id INT,
    FOREIGN KEY(note_id) REFERENCES note(id),
    FOREIGN KEY(tag_id) REFERENCES tag(id)
);
COMMIT;
