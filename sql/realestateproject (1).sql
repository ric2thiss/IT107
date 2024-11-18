-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2024 at 03:33 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `realestateproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `users_credential`
--

CREATE TABLE `users_credential` (
  `Id` int(11) NOT NULL,
  `idnumber` int(11) NOT NULL,
  `First_Name` varchar(50) NOT NULL,
  `Last_Name` varchar(50) NOT NULL,
  `Middle_Initial` varchar(2) NOT NULL,
  `Extension_Name` varchar(5) NOT NULL,
  `Email` varchar(256) NOT NULL,
  `Sex` varchar(7) NOT NULL,
  `Purok` varchar(256) NOT NULL,
  `Barangay` varchar(256) NOT NULL,
  `City` varchar(256) NOT NULL,
  `Province` varchar(256) NOT NULL,
  `Country` varchar(256) NOT NULL,
  `Zip_Code` int(11) NOT NULL,
  `Username` varchar(256) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `Account_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `failed_attempts` int(11) DEFAULT 0,
  `lockout_start` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_credential`
--

INSERT INTO `users_credential` (`Id`, `idnumber`, `First_Name`, `Last_Name`, `Middle_Initial`, `Extension_Name`, `Email`, `Sex`, `Purok`, `Barangay`, `City`, `Province`, `Country`, `Zip_Code`, `Username`, `Password`, `Account_Created`, `failed_attempts`, `lockout_start`) VALUES
(28, 12345, 'Ric Charles', 'Paquibot', '', '', 'hello@email.com', 'on', 'Purok', 'Ampayon', 'Malaybalay City', 'Agusan', 'Philippines', 8700, 'Admin123', '$2y$10$Nz1cHLf8Bc7WvlhRKt7ojeujl7AI1IKHcgdcF3dbza4JbUGmzMZ1O', '2024-11-18 02:22:26', 3, '2024-11-17 19:23:26'),
(29, 1234567, 'Ric Charles', 'Paquibot', '', '', 'test@email.com', 'on', 'Purok', 'Barangay', 'Malaybalay City', 'Agusan', 'Philippines', 8700, 'Admin12345', '$2y$10$xONXjR1A9hsPQBb5WCuwee8bCeYgSy9.gQYAWmPDFw/5/RQ8YNXCu', '2024-11-18 02:28:07', 6, '2024-11-17 19:30:47'),
(30, 123212, 'Trixxie Nicolee', 'Paquibot', '', '', 'ric2thiss@gmail.com', 'on', 'Purok', 'Barangay', 'Malaybalay City', 'Agusan', 'Philippines', 8700, 'Nicole123', '$2y$10$fl1OpDJuPsKIr9g1VL0ZV.ndSPyMVhEEcXG5uGAVJz1joL1hegbna', '2024-11-18 02:31:59', 3, '2024-11-17 19:32:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users_credential`
--
ALTER TABLE `users_credential`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users_credential`
--
ALTER TABLE `users_credential`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
