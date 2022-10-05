-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 05, 2022 at 01:59 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ycoin`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_token`
--

CREATE TABLE `access_token` (
  `id` int(11) NOT NULL,
  `token` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `access_token`
--

INSERT INTO `access_token` (`id`, `token`, `createdAt`, `updatedAt`) VALUES
(1, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImM3Mjc3N2Y1LTVjZDEtNDYzMC05OWU0LThiYTQ3MjJmYWQ1OCIsImV4cGlyZXMiOiIyMDIyLTEwLTA1VDA3OjAwOjQ2LjUyNyIsInNlc3Npb25JZCI6IjZjY2VjNzQzLWUyZjUtNDI1Zi1hYjk0LWFiOTc1YTM1ZTVkNCJ9.YxiMxQGHB6oa8N9VkPr5jkw2Q7QwothnAj3e7up9RRjebC-h6AqKGWk7FQKYrzOcM1DeI3rTMSUpnt3WjvkcZmsdHTp0K5-aj8XSY40dHvpmF8JQbVRbWK0nK6UZCoCICfjQIsMwKOaHgKfspQWql0AD7rcC8Jp1akFTAeuFV3cpzteG9GxF6QuZlcraB5NP_h_z85SEitAofYOaIkICG-WsZzWBL0whrcvy5xLuNXl4AEJ-PG11WPgOapYEbGKz-KoQxP626AAbyZ5hLB6AvSQOpYBffJcznku3_O0qJivAQ-kE21kL6U84wwmEvTdSpFZhiPq9OToNuRlTYB7-5g', '2022-10-05 11:57:47', '2022-10-05 11:57:47');

-- --------------------------------------------------------

--
-- Table structure for table `bc_sim_master_accounts`
--

CREATE TABLE `bc_sim_master_accounts` (
  `id` int(11) NOT NULL,
  `total_in_circulation` float DEFAULT NULL,
  `current_balance` float DEFAULT NULL,
  `wallet_address` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bc_sim_master_accounts`
--

INSERT INTO `bc_sim_master_accounts` (`id`, `total_in_circulation`, `current_balance`, `wallet_address`, `createdAt`, `updatedAt`) VALUES
(2, 1000, 1000, '0000x', '2022-10-04 23:27:20', '2022-10-04 23:27:20');

-- --------------------------------------------------------

--
-- Table structure for table `bc_sim_user_accounts`
--

CREATE TABLE `bc_sim_user_accounts` (
  `id` int(11) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `wallet_address` varchar(200) NOT NULL DEFAULT '0x',
  `y_balance` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bc_sim_user_accounts`
--

INSERT INTO `bc_sim_user_accounts` (`id`, `phone`, `wallet_address`, `y_balance`, `createdAt`, `updatedAt`) VALUES
(13, '78679654', '0x', 0, '2022-10-05 02:16:53', '2022-10-05 02:16:53'),
(14, '78679654', '0x', 0, '2022-10-05 02:17:15', '2022-10-05 02:17:15'),
(15, '78679654', '0x', 0, '2022-10-05 02:17:31', '2022-10-05 02:17:31'),
(16, '78679654', '0x', 0, '2022-10-05 02:19:07', '2022-10-05 02:19:07'),
(17, '78679654', '0x', 0, '2022-10-05 02:19:31', '2022-10-05 02:19:31'),
(18, '78679654', '0x', 0, '2022-10-05 02:19:53', '2022-10-05 02:19:53'),
(19, '78679654', '0x', 0, '2022-10-05 02:20:37', '2022-10-05 02:20:37'),
(20, '78679654', '0x', 0, '2022-10-05 02:21:08', '2022-10-05 02:21:08'),
(21, '78679654', '0x', 0, '2022-10-05 02:21:52', '2022-10-05 02:21:52'),
(22, '78679654', '0x', 0, '2022-10-05 02:30:42', '2022-10-05 02:30:42'),
(23, '78679654', '0x', 0, '2022-10-05 02:32:43', '2022-10-05 02:32:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `wallet_address` varchar(200) DEFAULT '0x',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone`, `wallet_address`, `createdAt`, `updatedAt`) VALUES
(14, 'clinton', '$2b$10$qDJCE3gLNM5jejHcgSZuf.ovWnF1EqCxqGHtCgP3cO2qRwj7aeXKG', 'vilakaticlinton@yahoo.com.com', '78679654', '0x', '2022-10-05 02:16:52', '2022-10-05 02:16:52'),
(15, 'clinton', '$2b$10$AJXNjjLHmJOQ6dB.RyVaM.o/PLdEMGAW19rg3/H7Th6kMBWyuI.wW', 'vilakaticlinton@yahoo.com.com', '78679654', '0x', '2022-10-05 02:17:14', '2022-10-05 02:17:14'),
(16, 'clinton', '$2b$10$A6p1tkmyCkidmpq00lDUTOh/0qymwF9INXibJlXHbNMLdbmQWjdw.', 'vilakaticlinton@yahoo.com.com', '78679654', '0x', '2022-10-05 02:17:31', '2022-10-05 02:17:31'),
(17, 'clinton', '$2b$10$Pgv0ya7RBba4jugejLj8gOAq125EUxQYQKKrPcKtGOvX0XcEkjPp.', 'vilakaticlinton@yahoo.com.com', '78679654', '0x', '2022-10-05 02:19:06', '2022-10-05 02:19:06'),
(18, 'clinton', '$2b$10$1PlZJETQdhG1Bm30PjjX2eVJXWQI6GODhj3LC8mm.YcbXBNNl3VYq', 'vilakaticlinton@yahoo.com.com', '78679654', '0x', '2022-10-05 02:19:29', '2022-10-05 02:19:29'),
(19, 'clinton', '$2b$10$k0Slzy7NGUTtFKIGhAZr2e.V1FUzNqmkJpUD8khnfJt5RtYBr7nPq', 'vilakaticlinton@yahoo.com.com', '78679654', '0x', '2022-10-05 02:19:52', '2022-10-05 02:19:52'),
(20, 'clinton', '$2b$10$fV/7bVSk8w0vpg/tT717L.Go2ak2q8lfbspFgXusuhKY5R1j0McJG', 'vilakaticlinton@yahoo.com.com', '78679654', '0x', '2022-10-05 02:20:37', '2022-10-05 02:20:37'),
(21, 'clinton', '$2b$10$uJMnVdSyAl2LuWqftpCUAeVU9W6copdBEnSh15hQu/GebTV1UsWjO', 'vilakaticlinton@yahoo.com.com', '78679654', '0x', '2022-10-05 02:21:08', '2022-10-05 02:21:08'),
(22, 'clinton', '$2b$10$97rFA2XSzEYWEqAF6aGIHeifs8zxIvx7UiGpsxtfqVgNJwdSHu5LG', 'vilakaticlinton@yahoo.com.com', '78679654', '0x', '2022-10-05 02:21:52', '2022-10-05 02:21:52'),
(23, 'clinton', '$2b$10$aouIYlhh8iFT2tbz/w3sPeK8mn8vWmS.Zc4JCEddcjQ.QBMo1gn5O', 'vilakaticlinton@yahoo.com.com', '78679654', '0x', '2022-10-05 02:30:38', '2022-10-05 02:30:38'),
(24, 'clinton', '$2b$10$BP7bl58rKt2dSCeF2BLUSuMhZQDF2Covhi/eCixDcl1FLsrkiKWyW', 'vilakaticlinton@yahoo.com.com', '78679654', '0x', '2022-10-05 02:32:42', '2022-10-05 02:32:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_token`
--
ALTER TABLE `access_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bc_sim_master_accounts`
--
ALTER TABLE `bc_sim_master_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bc_sim_user_accounts`
--
ALTER TABLE `bc_sim_user_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access_token`
--
ALTER TABLE `access_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bc_sim_master_accounts`
--
ALTER TABLE `bc_sim_master_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bc_sim_user_accounts`
--
ALTER TABLE `bc_sim_user_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
