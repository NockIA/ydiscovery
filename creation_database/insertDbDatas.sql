USE `ydiscovery_datas`;

SET
    SQL_SAFE_UPDATES = 0;

DELETE FROM
    articles;

DELETE FROM
    authors;

ALTER TABLE
    authors AUTO_INCREMENT = 1;

ALTER TABLE
    articles AUTO_INCREMENT = 1;

INSERT INTO
    authors (
        firstname,
        lastname,
        birthDate
    )
VALUES
    (
        "John",
        "Doe",
        "2004-12-01"
    );

INSERT INTO
    authors (
        firstname,
        lastname,
        birthDate
    )
VALUES
    (
        "Mikael",
        "Oak",
        "1999-05-01"
    );

INSERT INTO
    authors (
        firstname,
        lastname,
        birthDate
    )
VALUES
    (
        "Elisa",
        "Kate",
        "1980-08-01"
    );

INSERT INTO
    articles (
        authorId,
        title,
        subtitle,
        publicationDate,
        illustrationLink,
        content
    )
VALUES
    (
        "3",
        "First article",
        "Subtitle of the first article",
        "2023-01-01",
        "https://picsum.photos/200",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu accumsan arcu, sed suscipit dui. Quisque nec vestibulum ligula, vitae commodo tortor. Ut faucibus ex vel sem facilisis suscipit. Aliquam erat volutpat. Nulla orci tortor, tempor ac massa id, viverra eleifend lacus. Nam pellentesque pellentesque ipsum, venenatis vehicula sapien lobortis quis. Pellentesque vehicula, augue et hendrerit auctor, diam urna ultricies elit, eget interdum augue nisi ac massa. Vivamus eu eros in odio varius dictum. Etiam accumsan ipsum porta lacinia bibendum. Donec luctus fermentum molestie. Curabitur congue neque non est pretium, a iaculis quam eleifend."
    );

INSERT INTO
    articles (
        authorId,
        title,
        subtitle,
        publicationDate,
        illustrationLink,
        content
    )
VALUES
    (
        "2",
        "Second article",
        "Subtitle of the first Second",
        "2023-02-01",
        "https://picsum.photos/200",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu accumsan arcu, sed suscipit dui. Quisque nec vestibulum ligula, vitae commodo tortor. Ut faucibus ex vel sem facilisis suscipit. Aliquam erat volutpat. Nulla orci tortor, tempor ac massa id, viverra eleifend lacus. Nam pellentesque pellentesque ipsum, venenatis vehicula sapien lobortis quis. Pellentesque vehicula, augue et hendrerit auctor, diam urna ultricies elit, eget interdum augue nisi ac massa. Vivamus eu eros in odio varius dictum. Etiam accumsan ipsum porta lacinia bibendum. Donec luctus fermentum molestie. Curabitur congue neque non est pretium, a iaculis quam eleifend. "
    );

INSERT INTO
    articles (
        authorId,
        title,
        subtitle,
        publicationDate,
        illustrationLink,
        content
    )
VALUES
    (
        "1",
        "Third article",
        "Subtitle of the first Third",
        "2020-02-13",
        "https://picsum.photos/200",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu accumsan arcu, sed suscipit dui. Quisque nec vestibulum ligula, vitae commodo tortor. Ut faucibus ex vel sem facilisis suscipit. Aliquam erat volutpat. Nulla orci tortor, tempor ac massa id, viverra eleifend lacus. Nam pellentesque pellentesque ipsum, venenatis vehicula sapien lobortis quis. Pellentesque vehicula, augue et hendrerit auctor, diam urna ultricies elit, eget interdum augue nisi ac massa. Vivamus eu eros in odio varius dictum. Etiam accumsan ipsum porta lacinia bibendum. Donec luctus fermentum molestie. Curabitur congue neque non est pretium, a iaculis quam eleifend. "
    );

SET
    SQL_SAFE_UPDATES = 1;