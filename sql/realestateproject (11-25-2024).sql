-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2024 at 03:13 AM
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
  `idnumber` varchar(10) NOT NULL,
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
  `age` int(11) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `Account_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `failed_attempts` int(11) DEFAULT 0,
  `lockout_time` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_credential`
--

INSERT INTO `users_credential` (`Id`, `idnumber`, `First_Name`, `Last_Name`, `Middle_Initial`, `Extension_Name`, `Email`, `Sex`, `Purok`, `Barangay`, `City`, `Province`, `Country`, `Zip_Code`, `Username`, `Password`, `age`, `birthdate`, `Account_Created`, `failed_attempts`, `lockout_time`) VALUES
(38, '1234-1234', 'Trixxie Nicolee', 'Petalcorin', '', '', 'ric2thiss@gmail.com', 'Male', 'Purok', 'Barangay', 'Malaybalay City', 'Agusan', 'Philippines', 8700, 'Admin12345', '$2y$10$RkCfgx5.AnDVJKnoeOIVDONL9Fux4r09rFrOJG60ek7uTRzrHB33u', 23, '2001-02-01', '2024-11-23 16:13:46', 0, 0),
(39, '2020-1197', 'Ric Charles', 'Paquibot', '', '', 'riccharles.paquibot@csucc.edu.ph', 'Male', 'Ampayon', 'Ampayon', 'Butuan City', 'Agusan Del Norte', 'Philippines', 8600, 'Admin1234', '$2y$10$uoxR2RhONqez8PVrvuU16OTPvqUmzJvB54E50NHHrI2nhJ5U2sdVG', 26, '1998-06-25', '2024-11-24 16:07:32', 0, 0);

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
