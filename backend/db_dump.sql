-- MySQL dump 10.13  Distrib 9.1.0, for macos14 (x86_64)
--
-- Host: localhost    Database: Mass_Training_Database
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clue_bank`
--

DROP TABLE IF EXISTS `clue_bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clue_bank` (
  `clue_id` int NOT NULL AUTO_INCREMENT,
  `module_id` int DEFAULT NULL,
  `clue_text` text NOT NULL,
  PRIMARY KEY (`clue_id`),
  KEY `module_id` (`module_id`),
  CONSTRAINT `clue_bank_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clue_bank`
--

LOCK TABLES `clue_bank` WRITE;
/*!40000 ALTER TABLE `clue_bank` DISABLE KEYS */;
INSERT INTO `clue_bank` VALUES (1,1,'STINFO tip: Always verify clearance levels before sharing data.'),(2,2,'Records Management tip: Organize files by retention period.'),(3,3,'No FEAR Act: Employees are protected from discrimination.');
/*!40000 ALTER TABLE `clue_bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_progress`
--

DROP TABLE IF EXISTS `game_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_progress` (
  `game_progress_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `module_id` int DEFAULT NULL,
  `stage` int NOT NULL,
  `progress` float DEFAULT '0',
  `date_completed` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`game_progress_id`),
  KEY `user_id` (`user_id`),
  KEY `module_id` (`module_id`),
  CONSTRAINT `game_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `game_progress_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_progress`
--

LOCK TABLES `game_progress` WRITE;
/*!40000 ALTER TABLE `game_progress` DISABLE KEYS */;
INSERT INTO `game_progress` VALUES (1,1,1,3,75.5,NULL),(2,1,2,1,20,NULL),(3,2,1,2,50,NULL),(4,3,3,4,100,'2025-03-28 14:30:00'),(5,6,1,1,0,NULL),(6,6,2,1,0,NULL),(7,6,3,1,0,NULL),(13,7,1,4,100,'2025-04-01 14:00:00'),(14,7,2,2,50,NULL),(15,7,3,1,0,NULL),(16,9,2,3,100,'2025-04-03 19:30:00'),(17,9,3,2,75,NULL),(18,9,1,1,0,NULL),(19,10,1,4,100,'2025-04-01 16:00:00'),(20,10,2,3,75,NULL),(21,10,3,1,0,NULL),(22,11,2,4,100,'2025-04-02 18:15:00'),(23,11,3,2,50,NULL),(24,11,1,1,0,NULL),(25,12,3,4,100,'2025-04-03 13:30:00'),(26,12,1,3,75,NULL),(27,12,2,1,0,NULL),(28,13,1,4,100,'2025-04-04 14:00:00'),(29,13,2,4,100,'2025-04-04 15:00:00'),(30,13,3,4,100,'2025-04-04 16:00:00'),(31,14,1,2,50,NULL),(32,14,2,2,50,NULL),(33,14,3,2,50,NULL),(34,16,2,4,100,'2025-04-05 13:00:00'),(35,16,1,1,0,NULL),(36,16,3,1,0,NULL),(37,17,1,3,75,NULL),(38,17,2,3,75,NULL),(39,17,3,3,75,NULL),(40,18,1,4,100,'2025-04-06 14:30:00'),(41,18,2,2,50,NULL),(42,18,3,4,100,'2025-04-06 16:00:00'),(43,19,1,1,25,NULL),(44,19,2,1,25,NULL),(45,19,3,1,25,NULL);
/*!40000 ALTER TABLE `game_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `module_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`module_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES (1,'STINFO','Security and Information Training'),(2,'Records Management','Managing official records and compliance'),(3,'No FEAR Act','Federal Employee Rights and Responsibilities');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_question_bank`
--

DROP TABLE IF EXISTS `quiz_question_bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_question_bank` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `module_id` int DEFAULT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `module_id` (`module_id`),
  CONSTRAINT `quiz_question_bank_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_question_bank`
--

LOCK TABLES `quiz_question_bank` WRITE;
/*!40000 ALTER TABLE `quiz_question_bank` DISABLE KEYS */;
INSERT INTO `quiz_question_bank` VALUES (1,1,'What does STINFO stand for?','Security and Information Training'),(2,2,'What is the main goal of Records Management?','Ensure compliance with retention policies'),(3,3,'Which act protects federal employees from retaliation?','No FEAR Act');
/*!40000 ALTER TABLE `quiz_question_bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `records`
--

DROP TABLE IF EXISTS `records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `records` (
  `records_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `module_id` int DEFAULT NULL,
  `completion_status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`records_id`),
  KEY `user_id` (`user_id`),
  KEY `module_id` (`module_id`),
  CONSTRAINT `records_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `records_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `records`
--

LOCK TABLES `records` WRITE;
/*!40000 ALTER TABLE `records` DISABLE KEYS */;
INSERT INTO `records` VALUES (1,1,1,1),(2,1,2,0),(3,2,1,0),(4,2,3,1),(5,3,2,1);
/*!40000 ALTER TABLE `records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `sessions_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `session_token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NOT NULL,
  PRIMARY KEY (`sessions_id`),
  UNIQUE KEY `session_token` (`session_token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `squadron` varchar(50) DEFAULT NULL,
  `flight` enum('A','B','C','N/A') NOT NULL DEFAULT 'N/A',
  `password_hash` varchar(255) NOT NULL,
  `training_manager` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'armaitykatki@gmail.com','Armaity','Katki','580th Squadron','A','$2a$10$5wHClVz7K.o0X6sCLWcjmuAsBITunwMkdp1v.1eSlnTosQyWQlcxG',0),(2,'testuser@gmail.com','Test','User','N/A','A','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',0),(3,'john.doe@example.com','John','Doe','577th Squadron','A','hashedpassword123',0),(4,'jane.smith@example.com','Jane','Smith','578th Squadron','B','hashedpassword456',0),(5,'charlie.delta@demo.com','Charlie','Delta','579th Squadron','A','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',0),(6,'newuser@email.com','NewUser','Test','Directorate','C','$2a$10$Q6NiKWys25WWp5n63xJ7V.83uDbUEQT3R00rBWliAQGUl8JMmJvke',0),(7,'fake@email.com','John','Doe','N/A','N/A','$2a$10$Qf8bM/LmyYUUHWjOUKwejOAhLPUBcz8JnP8OUHemBRsMn91TSz/ee',0),(8,'test@email.com','Test','Account','N/A','N/A','$2a$10$Bp05w5XK9Ac/w0xB2/JhL.FqjGO/PvkLIGvp3PH/vikB08tXucMiK',0),(9,'admin@email.com','Training','Manager','Directorate','N/A','$2a$10$MEorAqWGqts.8BwTFsiFau.4Rrfc3FFST/VeRmLRp8EMChVwaBN3O',1),(10,'alice.wonder@demo.com','Alice','Wonder','577th Squadron','A','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',0),(11,'bob.builder@demo.com','Bob','Builder','578th Squadron','B','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',0),(12,'carol.danvers@demo.com','Carol','Danvers','579th Squadron','C','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',0),(13,'david.lee@demo.com','David','Lee','580th Squadron','A','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',0),(14,'emma.jones@demo.com','Emma','Jones','581th Squadron','B','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',0),(15,'frank.castle@demo.com','Frank','Castle','Directorate','C','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',1),(16,'grace.hopper@demo.com','Grace','Hopper','577th Squadron','N/A','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',0),(17,'henry.ford@demo.com','Henry','Ford','N/A','N/A','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',0),(18,'irene.adler@demo.com','Irene','Adler','580th Squadron','C','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',0),(19,'jack.ryan@demo.com','Jack','Ryan','Directorate','A','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',1),(20,'zoe.quinn@demo.com','Zoe','Quinn','577th Squadron','B','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-12 11:50:52
