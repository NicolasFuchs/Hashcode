-- Création de  la base de données pour l'application
CREATE DATABASE IF NOT EXISTS hashcodedb;
USE `hashcodedb`;

CREATE TABLE IF NOT EXISTS `hashcodedb`.role (
  roleId   INT          NOT NULL AUTO_INCREMENT,
  name      VARCHAR(30) NOT NULL,
  PRIMARY KEY (roleId)
 -- CHECK (name IN ('Admin', 'validated_organizer', 'waiting_organizer', 'validated_user', 'waiting_user')) -- Contrainte relationnelles CR1
);


CREATE TABLE IF NOT EXISTS `hashcodedb`.account (
  accountId   INT          NOT NULL AUTO_INCREMENT,
  firstname    VARCHAR(100) NOT NULL,
  lastname     VARCHAR(100) NOT NULL,
  email        VARCHAR(100) NOT NULL,
  pseudo       VARCHAR(100) NOT NULL UNIQUE, --  UNIQUE : Contrainte intégrité C1
  password     VARCHAR(100) NOT NULL,
  token        VARCHAR(100) NULL UNIQUE, -- NULL : Contrainte relationnel CR3  + UNIQUE : Contrainte intégrité C2
  image        VARCHAR(100) NULL, -- NULL : Contrainte relationnel CR3
  roleId INT NOT NULL,
  PRIMARY KEY (accountId),
  constraint fk_role FOREIGN KEY (roleId) REFERENCES role(roleId)
);


CREATE TABLE IF NOT EXISTS `hashcodedb`.challenge (
  challenge_id      INT          NOT NULL AUTO_INCREMENT,
  c_name            VARCHAR(100) NOT NULL,
  nb_teams          INT          NOT NULL,
  date_inscription  DATETIME     NOT NULL,
  date_begin        DATETIME     NOT NULL,
  date_end          DATETIME     NOT NULL,
  mediaXML          TEXT         NOT NULL,
  PRIMARY KEY (challenge_id),
  CHECK (date_inscription<date_begin),  -- C5
  CHECK (date_begin<date_end) --  C4
);


CREATE TABLE IF NOT EXISTS `hashcodedb`.team (
  id_team      INT          NOT NULL AUTO_INCREMENT,
  t_name       VARCHAR(100) NOT NULL,
  fk_challenge INT NOT NULL,
  fk_leader INT NOT NULL,
  PRIMARY KEY (id_team),
  constraint fk_challenge FOREIGN KEY (fk_challenge) REFERENCES challenge(challenge_id),
  constraint fk_leader FOREIGN KEY (fk_leader)    REFERENCES account(accountId)
);


CREATE TABLE IF NOT EXISTS `hashcodedb`.account_team (
  fk_account INT NOT NULL,
  fk_team INT NOT NULL,
  constraint fk_account FOREIGN KEY (fk_account) REFERENCES account(accountId),
  constraint fk_team FOREIGN KEY (fk_team)    REFERENCES team(id_team),
  PRIMARY KEY (fk_account,fk_team)
 );


 CREATE TABLE IF NOT EXISTS `hashcodedb`.challenge_organizer(
   fk_challenge2 INT NOT NULL,
   fk_organizer INT NOT NULL,
    PRIMARY KEY (fk_challenge2,fk_organizer),
    constraint fk_challenge2 FOREIGN KEY (fk_challenge2) REFERENCES challenge(challenge_id),
	constraint fk_organizer FOREIGN KEY (fk_organizer) REFERENCES account(accountId)
    );

  CREATE TABLE IF NOT EXISTS `hashcodedb`.solution (
    id_solution INT          NOT NULL AUTO_INCREMENT,
    s_name      VARCHAR(100) NOT NULL,
    language    VARCHAR(100) NOT NULL,
    solution    VARCHAR(100) NOT NULL,
    version     FLOAT        NOT NULL,
    ranking     FLOAT        NULL, -- Un ranking null est considéré comme pas évalué
    submit_date DATETIME     NOT NULL,
    fka_account_team INT NOT NULL,
    fkt_account_team INT NOT NULL,
    PRIMARY KEY (id_solution),
	constraint fk_account_team FOREIGN KEY (fka_account_team,fkt_account_team) REFERENCES account_team(fk_account, fk_team)
  );

  CREATE TABLE IF NOT EXISTS `hashcodedb`.data (
    id_data INT          NOT NULL AUTO_INCREMENT,
    file      VARCHAR(100) NOT NULL,
    fk_challenge INT NOT NULL,
    PRIMARY KEY (id_datasolution),
    constraint fk_challenge3 FOREIGN KEY (fk_challenge) REFERENCES challenge(challenge_id)
  );





  INSERT INTO role (roleId, name) VALUES (1, "admin");
  INSERT INTO role (roleId, name) VALUES (2, "validated_organizer");
  INSERT INTO role (roleId, name) VALUES (3, "waiting_organizer");
  INSERT INTO role (roleId, name) VALUES (4, "validated_user");
  INSERT INTO role (roleId, name) VALUES (5, "waiting_user");


  -- Remplissage de la base de donnée pour avoir des exemples
  INSERT INTO account (accountId, firstname,lastname,email,pseudo,password,token, roleId)
      VALUES (1, "Joé", "Butty","joe@email.ch","jojobutty","emf123",NULL,1);

  INSERT INTO account (accountId, firstname,lastname,email,pseudo,password,token, roleId)
      VALUES (2, "Jonathan", "Rial","jonathan@email.ch","riri","emf123",NULL,2);
  INSERT INTO account (accountId, firstname,lastname,email,pseudo,password,token, roleId)
      VALUES (3, "Nicolas", "Fuchs","nicolas@email.ch","nico","emf123",NULL,2);

  INSERT INTO account (accountId, firstname,lastname,email,pseudo,password,token, roleId)
      VALUES (4, "Organisateur", "En Attente","orga@email.ch","or","emf123",NULL,3);

  INSERT INTO account (accountId, firstname,lastname,email,pseudo,password,token, roleId)
      VALUES (5, "Cristiano", "Ronaldo","cr7@email.ch","cr7","emf123",NULL,4);
  INSERT INTO account (accountId, firstname,lastname,email,pseudo,password,token, roleId)
      VALUES (6, "Karim", "Benzema","kb9@email.ch","kb9","emf123",NULL,4);
  INSERT INTO account (accountId, firstname,lastname,email,pseudo,password,token, roleId)
      VALUES (7, "Valdimir", "Meier","valdm@email.ch","valdm","emf123",NULL,4);
  INSERT INTO account (accountId, firstname,lastname,email,pseudo,password,token, roleId)
      VALUES (8, "Justin", "Koestinger","jk@email.ch","juju","emf123",NULL,4);
  INSERT INTO account (accountId, firstname,lastname,email,pseudo,password,token, roleId)
      VALUES (9, "Lucas", "Alborghetto","ghetto@email.ch","albo","emf123",NULL,4);
  INSERT INTO account (accountId, firstname,lastname,email,pseudo,password,token, roleId)
      VALUES (10, "Karim", "Lemarchand","kl@email.ch","mirak","emf123",NULL,4);
  INSERT INTO account (accountId, firstname,lastname,email,pseudo,password,token, roleId)
      VALUES (11, "Donald", "Trump","dodo@email.ch","trump","emf123",NULL,4);
  INSERT INTO account (accountId, firstname,lastname,email,pseudo,password,token, roleId)
      VALUES (12, "Raphi", "Burgunder","rb@email.ch","sfl","emf123",NULL,4);
  INSERT INTO account (accountId, firstname,lastname,email,pseudo,password,token, roleId)
      VALUES (13, "Jonathan", "Rial","jonathan@email.ch","ririuser","emf123",NULL,2);

  INSERT INTO challenge (challenge_id, c_name,nb_teams,date_inscription,date_begin,date_end,mediaXML)
      VALUES (1, "Java Challenge #1", 2,"2018-03-01 16:00:00","2018-04-01 08:00:00","2018-04-15 16:00:00","provisoire");
  INSERT INTO challenge (challenge_id, c_name,nb_teams,date_inscription,date_begin,date_end,mediaXML)
      VALUES (2, "Java Challenge #2", 4,"2018-04-18 16:00:00","2018-04-23 10:00:00","2018-05-15 18:00:00","provisoire");
  INSERT INTO challenge (challenge_id, c_name,nb_teams,date_inscription,date_begin,date_end,mediaXML)
      VALUES (3, "PHP Challenge #1", 4,"2018-05-18 10:00:00","2018-05-20 16:00:00","2018-05-30 16:00:00","provisoire");
  INSERT INTO challenge (challenge_id, c_name,nb_teams,date_inscription,date_begin,date_end,mediaXML)
      VALUES (4, "Optimisation Challenge", 8,"2018-06-04 23:00:00","2018-06-07 10:30:00","2018-06-16 16:30:00","provisoire");


  INSERT INTO team (id_team, t_name,fk_challenge,fk_leader)
      VALUES (1, "L'homme de l'est", 1, 7);
  INSERT INTO team (id_team, t_name,fk_challenge,fk_leader)
      VALUES (2, "Real Madrid", 2, 5);
  INSERT INTO team (id_team, t_name,fk_challenge,fk_leader)
     VALUES (3, "Les G-FUEL", 2, 9);
  INSERT INTO team (id_team, t_name,fk_challenge,fk_leader)
    VALUES (4, "Les Pros", 3, 11);
  INSERT INTO team (id_team, t_name,fk_challenge,fk_leader)
    VALUES (5, "Real Madrid", 4, 5);


  INSERT INTO account_team (fk_account, fk_team) VALUES (7, 1);
  INSERT INTO account_team (fk_account, fk_team) VALUES (5, 2);
  INSERT INTO account_team (fk_account, fk_team) VALUES (6, 2);
  INSERT INTO account_team (fk_account, fk_team) VALUES (8, 3);
  INSERT INTO account_team (fk_account, fk_team) VALUES (9, 3);
  INSERT INTO account_team (fk_account, fk_team) VALUES (10, 3);
  INSERT INTO account_team (fk_account, fk_team) VALUES (11, 4);
  INSERT INTO account_team (fk_account, fk_team) VALUES (12, 4);
  INSERT INTO account_team (fk_account, fk_team) VALUES (8, 4);
  INSERT INTO account_team (fk_account, fk_team) VALUES (5, 5);
  INSERT INTO account_team (fk_account, fk_team) VALUES (6, 5);

  INSERT INTO challenge_organizer (fk_challenge2, fk_organizer) VALUES (1, 2);
  INSERT INTO challenge_organizer (fk_challenge2, fk_organizer) VALUES (2, 3);
  INSERT INTO challenge_organizer (fk_challenge2, fk_organizer) VALUES (2, 2);
  INSERT INTO challenge_organizer (fk_challenge2, fk_organizer) VALUES (3, 3);
  INSERT INTO challenge_organizer (fk_challenge2, fk_organizer) VALUES (4, 2);

  INSERT INTO solution (id_solution, s_name, language, solution, version, ranking, submit_date, fka_account_team, fkt_account_team)
    VALUES (1, "Solution 1 java#1 ", "Java", "lien.vers.solution", 1.0, 6.0, "2018-03-15 08:00:00", 7, 1);
  INSERT INTO solution (id_solution, s_name, language, solution, version, ranking, submit_date, fka_account_team, fkt_account_team)
    VALUES (2, "Solution 2 java#1 ", "Java", "lien.vers.solution", 1.2, 7.5, "2018-03-18 16:00:00", 7, 1);
  INSERT INTO solution (id_solution, s_name, language, solution, version, ranking, submit_date, fka_account_team, fkt_account_team)
    VALUES (3, "Solution 1 java#2 ", "Java", "lien.vers.solution", 1.0, 8.0, "2018-04-30 08:00:00", 5, 2);
  INSERT INTO solution (id_solution, s_name, language, solution, version, ranking, submit_date, fka_account_team, fkt_account_team)
    VALUES (4, "Solution 2 java#2 ", "Java", "lien.vers.solution", 2.0, 6.0, "2018-05-03 10:30:00", 6, 2);
  INSERT INTO solution (id_solution, s_name, language, solution, version, ranking, submit_date, fka_account_team, fkt_account_team)
    VALUES (5, "Solution 1 java#2 ", "Java", "lien.vers.solution", 1.0, 7.5, "2018-05-01 16:00:00", 9, 3);




    delimiter |
    CREATE TRIGGER C3
    BEFORE INSERT ON account_team
    FOR EACH ROW

     BEGIN

    	DECLARE v_firstname, v_lastname, v_email varchar(50);
        DECLARE idChallenge INT;
        DECLARE otherIdAccount INT;
    	Select fk_challenge
    	INTO idChallenge
        FROM team
    	inner join challenge on  team.fk_challenge = challenge.challenge_id
    	where id_team = NEW.fk_team;

    	Select firstname, lastname, email
        INTO v_firstname, v_lastname, v_email
        FROM account
        where accountId = NEW.fk_account;

        Select accountId
        INTO otherIdAccount
        FROM account
        where accountId != NEW.fk_account
    		and firstname = v_firstname
    		and  lastname = v_lastname
            and email = v_email;

    	IF  EXISTS (Select * FROM challenge_organizer where fk_challenge2=idChallenge and fk_organizer=otherIdAccount)
        THEN
    		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Un organisateur ne peut pas participer à son propre concours';
        END IF;
    END |
    delimiter ;



    delimiter |
    CREATE TRIGGER C6C7
    BEFORE INSERT ON Solution
    FOR EACH ROW

     BEGIN
    	DECLARE
    		v_date_begin INT;
    	DECLARE v_date_end INT;

        SELECT date_begin, date_end
        INTO v_date_begin, v_date_end
            FROM challenge
          inner join team on challenge.challenge_id = team.fk_challenge
          inner join solution on  team.id_team = solution.fkt_account_team
          where fkt_account_team = NEW.fkt_account_team
          group by date_begin;

        IF(date_begin > NEW.submit_date) THEN
    		SET msg = 'La date de début du concours est plus récente
            que la date de soumission de la solution';
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
        END IF;

        IF(date_end < NEW.submit_date) THEN
           SET msg = 'La date de fin du concours est plus récente
          que la date de soumission de la solution';
          SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
        END IF;
    END |
    delimiter ;
END


-- C8 CR5 question

-- C9 nécéssaire ?

-- CR5 + CR6 + CR7 nécessaire ?

-- Procedure stocker pour CR5
DELIMITER |

CREATE PROCEDURE create_team  (name_team VARCHAR(100), challenge_id INT, leader_id INT)

-- team_exist = 0 if nothing
-- team_exist = 1 if exist

BEGIN

INSERT INTO team (`name`, `challenge_id`, `leader_id`) VALUES (name_team, challenge_id, leader_id);

SELECT team_id INTO @idTeam
FROM team
Where `name` = name_team and  `challenge_id`=  challenge_id and leader_id=  `leader_id`  ;


INSERT INTO account_team ( `fk_account`, `fk_team`)
VALUES (leader_id, @idTeam);

END |

DELIMITER ;


-- Procedure stocker pour CR6
CREATE PROCEDURE create_challenge AS
DELIMITER |

CREATE PROCEDURE create_challenge  (name_challenge VARCHAR(100), nb_teams_challenge INT,
	inscription_date DATETIME, begin_challenge DATETIME, end_challenge DATETIME, media_xml TEXT, id_organizer INT)

BEGIN
INSERT INTO challenge ( `name`, `nb_teams`, `inscription_date`, `begin`, `end`, `media_xml`)
VALUES (name_challenge, nb_teams_challenge, inscription_date, begin_challenge, end_challenge, media_xml);

SELECT challenge_id INTO @idChallenge
FROM challenge
WHERE `name` = name_challenge and  `nb_teams` = nb_teams_challenge
				and  `inscription_date` = inscription_date and `begin` = begin_challenge
                and `end` = end_challenge and `media_xml` = media_xml;

INSERT INTO challenge_account (`challenge_id`, `account_id`) VALUES (@idChallenge, id_organizer);

END |

DELIMITER ;
