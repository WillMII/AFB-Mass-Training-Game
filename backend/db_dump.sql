-- MySQL dump 10.13  Distrib 9.2.0, for macos14.7 (arm64)
--
-- Host: localhost    Database: Mass_Training_Database
-- ------------------------------------------------------
-- Server version	9.0.1

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_progress`
--

LOCK TABLES `game_progress` WRITE;
/*!40000 ALTER TABLE `game_progress` DISABLE KEYS */;
INSERT INTO `game_progress` VALUES (1,1,1,3,75.5,NULL),(2,1,2,1,20,NULL),(3,2,1,2,50,NULL),(4,3,3,4,100,'2025-03-28 14:30:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'armaitykatki@gmail.com','Armaity','Katki','580th Squadron','A','$2a$10$5wHClVz7K.o0X6sCLWcjmuAsBITunwMkdp1v.1eSlnTosQyWQlcxG',0),(2,'testuser@gmail.com','Test','User','N/A','A','$2a$10$HqVlfORRHEc4ku5QrF08guOkyBBxf3zlzzvllE2qXd1NI4LZB1DfO',0),(3,'john.doe@example.com','John','Doe','Alpha','A','hashedpassword123',0),(4,'jane.smith@example.com','Jane','Smith','Bravo','B','hashedpassword456',0),(6,'newuser@email.com','NewUser','Test','Directorate','C','$2a$10$Q6NiKWys25WWp5n63xJ7V.83uDbUEQT3R00rBWliAQGUl8JMmJvke',0);
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

-- Dump completed on 2025-04-01 13:36:24
