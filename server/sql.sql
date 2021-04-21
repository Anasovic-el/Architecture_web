CREATE DATABASE drone-repair


CREATE TABLE Client(
    id_client BIGINT NOT NULL,
    Nom VARCHAR(255) NOT NULL,
    N_reparation VARCHAR(255) NOT NULL,
    modele VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_client)
);


CREATE TABLE Reparation (
    N_reparation VARCHAR(255) NOT NULL,
    Nom_cat VARCHAR(255) NOT NULL,
    eau VARCHAR(10) NOT NULL,
    description TEXT,
    PRIMARY KEY(N_reparation)
);

CREATE TABLE Technicien (
    id_tech VARCHAR(255),
    Nom VARCHAR(255) NOT NULL,
    PRIMARY KEY(id_tech)
);


CREATE TABLE ReparCat(
    id_repar_cat INT AUTO_INCREMENT NOT NULL,
    N_reparation VARCHAR(255) NOT NULL,
    Nom_cat VARCHAR(255) NOT NULL,
    eau VARCHAR(10) NOT NULL,
    modele VARCHAR(255) NOT NULL,
    description TEXT,
    Etat  VARCHAR(255) NOT NULL,
    tech_id VARCHAR(255),
    PRIMARY KEY(id_repar_cat)
);





ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'nuttertoolsty';

flush privileges;


