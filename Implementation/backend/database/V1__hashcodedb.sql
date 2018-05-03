-- Création de  la base de données pour l'application
USE `hashcodedb`;

CREATE TABLE IF NOT EXISTS hashcodedb.role (
  roleId INT         NOT NULL AUTO_INCREMENT,
  name   VARCHAR(30) NOT NULL,
  PRIMARY KEY (roleId)
)
  ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS hashcodedb.account (
  accountId INT          NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname  VARCHAR(100) NOT NULL,
  email     VARCHAR(100) NOT NULL,
  pseudo    VARCHAR(100) NOT NULL UNIQUE, --  UNIQUE : Contrainte intégrité C1
  password  VARCHAR(100) NOT NULL,
  token     VARCHAR(100) NULL UNIQUE, -- NULL : Contrainte relationnel CR3  + UNIQUE : Contrainte intégrité C2
  image     VARCHAR(100) NULL, -- NULL : Contrainte relationnel CR3
  roleId    INT,
  PRIMARY KEY (accountId),
  CONSTRAINT fk_role FOREIGN KEY (roleId) REFERENCES role (roleId)
)
  ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS hashcodedb.challenge (
  challenge_id     INT          NOT NULL AUTO_INCREMENT,
  c_name           VARCHAR(100) NOT NULL,
  nb_teams         INT          NOT NULL,
  date_inscription DATETIME     NOT NULL,
  date_begin       DATETIME     NOT NULL,
  date_end         DATETIME     NOT NULL,
  mediaXML         TEXT         NOT NULL,
  PRIMARY KEY (challenge_id)
)
  ENGINE = InnoDB;

-- Tables needed for spring session

CREATE TABLE IF NOT EXISTS hashcodedb.spring_session (
  primary_id            CHAR(36) NOT NULL,
  session_id            CHAR(36) NOT NULL,
  creation_time         BIGINT   NOT NULL,
  last_access_time      BIGINT   NOT NULL,
  max_inactive_interval INT      NOT NULL,
  expiry_time           BIGINT   NOT NULL,
  principal_name        VARCHAR(100),
  CONSTRAINT spring_session_pk PRIMARY KEY (primary_id)
)
  ENGINE = InnoDB;

CREATE UNIQUE INDEX spring_session_ix1
  ON spring_session (session_id);
CREATE INDEX spring_session_ix2
  ON spring_session (expiry_time);
CREATE INDEX spring_session_ix3
  ON spring_session (principal_name);

CREATE TABLE IF NOT EXISTS hashcodedb.spring_session_attributes (
  session_primary_id CHAR(36)     NOT NULL,
  attribute_name     VARCHAR(200) NOT NULL,
  attribute_bytes    BLOB         NOT NULL,
  CONSTRAINT spring_session_attributes_pk PRIMARY KEY (session_primary_id, attribute_name),
  CONSTRAINT spring_session_attributes_fk FOREIGN KEY (session_primary_id) REFERENCES spring_session (primary_id)
    ON DELETE CASCADE
)
  ENGINE = InnoDB;

CREATE INDEX spring_session_attributes_ix1
  ON spring_session_attributes (session_primary_id);

-- Minimum data

INSERT INTO role (name) VALUES ('ADMIN');
INSERT INTO role (name) VALUES ('VALIDATED_ORGANIZER');
INSERT INTO role (name) VALUES ('PENDING_ORGANIZER');
INSERT INTO role (name) VALUES ('VALIDATED_USER');
INSERT INTO role (name) VALUES ('WAITING_USER');

-- Test data

INSERT INTO account (firstname, lastname, email, pseudo, password, token, roleId)
VALUES ('Jonathan', 'Rial', 'jonathan@email.ch', 'riri', 'emf123', NULL, 1);

/*
-- Remplissage de la base de donnée pour avoir des exemples
INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
    VALUES ('Joé', 'Butty','joe@email.ch','jojobutty','emf123',NULL,1);

INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
    VALUES ('Jonathan', 'Rial','jonathan@email.ch','riri','emf123',NULL,2);
INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
    VALUES ('Nicolas', 'Fuchs','nicolas@email.ch','nico','emf123',NULL,2);

INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
    VALUES ('Cristiano', 'Ronaldo','cr7@email.ch','cr7','emf123',NULL,4);
INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
    VALUES ('Karim', 'Benzema','kb9@email.ch','kb9','emf123',NULL,4);
INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
    VALUES ('Valdimir', 'Meier','valdm@email.ch','valdm','emf123',NULL,4);
INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
    VALUES ('Justin', 'Koestinger','jk@email.ch','juju','emf123',NULL,4);
INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
    VALUES ('Lucas', 'Alborghetto','ghetto@email.ch','albo','emf123',NULL,4);
INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
    VALUES ('Karim', 'Lemarchand','kl@email.ch','mirak','emf123',NULL,4);
INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
    VALUES ('Donald', 'Trump','dodo@email.ch','trump','emf123',NULL,4);
INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
    VALUES ('Raphi', 'Burgunder','rb@email.ch','sfl','emf123',NULL,4);

INSERT INTO challenge (c_name,nb_teams,date_inscription,date_begin,date_end,mediaXML)
    VALUES ('Java Challenge #1', 2,'2018-03-01 16:00:00','2018-04-01 08:00:00','2018-04-15 16:00:00','provisoire');

INSERT INTO challenge (c_name,nb_teams,date_inscription,date_begin,date_end,mediaXML)
    VALUES ('Java Challenge #2', 4,'2018-04-18 16:00:00','2018-04-23 10:00:00','2018-05-15 18:00:00','provisoire');

INSERT INTO challenge (c_name,nb_teams,date_inscription,date_begin,date_end,mediaXML)
    VALUES ('PHP Challenge #1', 4,'2018-05-18 10:00:00','2018-05-20 16:00:00','2018-05-30 16:00:00','provisoire');

INSERT INTO challenge (c_name,nb_teams,date_inscription,date_begin,date_end,mediaXML)
    VALUES ('Optimisation Challenge', 8,'2018-06-04 23:00:00','2018-06-07 10:30:00','2018-06-16 16:30:00','provisoire');

*/
