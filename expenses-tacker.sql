-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 23, 2025 at 07:35 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expenses-tacker`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Food & Drinks '),
(2, 'Transport'),
(3, 'Entertainment'),
(4, 'Shopping'),
(5, 'Health & Fitness');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
CREATE TABLE IF NOT EXISTS `expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` timestamp NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `user_id`, `category_id`, `amount`, `date`, `description`, `created_at`) VALUES
(1, 3, 1, 500.00, '2024-02-29 18:30:00', 'Shopping', '2025-03-23 04:50:09'),
(2, 3, 2, 1200.00, '2024-03-04 18:30:00', 'Electronics', '2025-03-23 04:50:09'),
(3, 3, 3, 800.00, '2024-03-09 18:30:00', 'Dining Out', '2025-03-23 04:50:09'),
(4, 3, 4, 400.00, '2024-03-14 18:30:00', 'Transport', '2025-03-23 04:50:09'),
(5, 3, 1, 1000.00, '2024-03-19 18:30:00', 'Grocery', '2025-03-23 04:50:09'),
(6, 4, 2, 750.00, '2024-03-01 18:30:00', 'Furniture', '2025-03-23 04:50:09'),
(7, 4, 3, 500.00, '2024-03-06 18:30:00', 'Entertainment', '2025-03-23 04:50:09'),
(8, 4, 4, 900.00, '2024-03-11 18:30:00', 'Travel', '2025-03-23 04:50:09'),
(9, 4, 1, 600.00, '2024-03-17 18:30:00', 'Books', '2025-03-23 04:50:09'),
(10, 4, 2, 1100.00, '2024-03-21 18:30:00', 'Medical', '2025-03-23 04:50:09'),
(11, 5, 3, 1300.00, '2024-03-02 18:30:00', 'Gaming', '2025-03-23 04:50:09'),
(12, 5, 4, 1400.00, '2024-03-05 18:30:00', 'Gym Membership', '2025-03-23 04:50:09'),
(13, 5, 1, 1250.00, '2024-03-10 18:30:00', 'Rent', '2025-03-23 04:50:09'),
(14, 5, 2, 950.00, '2024-03-15 18:30:00', 'Car Repair', '2025-03-23 04:50:09'),
(15, 5, 3, 1150.00, '2024-03-20 18:30:00', 'Festival Shopping', '2025-03-23 04:50:09'),
(16, 3, 1, 2000.00, '2024-02-14 18:30:00', 'February Expense', '2025-03-23 04:53:50'),
(17, 3, 2, 1900.00, '2024-03-09 18:30:00', 'March Expense', '2025-03-23 04:53:50'),
(18, 4, 3, 1800.00, '2024-02-19 18:30:00', 'February Expense', '2025-03-23 04:53:50'),
(19, 4, 4, 2050.00, '2024-03-17 18:30:00', 'March Expense', '2025-03-23 04:53:50'),
(20, 5, 1, 2500.00, '2024-02-04 18:30:00', 'February Expense', '2025-03-23 04:53:50'),
(21, 5, 2, 6050.00, '2024-03-21 18:30:00', 'March Expense', '2025-03-23 04:53:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('active','inactive','','') COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `status`, `created_at`) VALUES
(4, 'Jay', 'Jay@gmail.com', 'active', '2025-03-22 10:59:55'),
(3, 'kishan', 'kishan1@gmail.com', 'active', '2025-03-22 10:59:50'),
(5, 'Krupal', 'krupal@gmail.com', 'active', '2025-03-22 11:00:03');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
