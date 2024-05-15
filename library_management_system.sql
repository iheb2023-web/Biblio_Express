-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 15 mai 2024 à 23:59
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `library_management_system`
--

-- --------------------------------------------------------

--
-- Structure de la table `books`
--

CREATE TABLE `books` (
  `book_id` int(100) NOT NULL,
  `user_id` int(100) DEFAULT NULL,
  `genre` varchar(300) NOT NULL,
  `title` varchar(300) NOT NULL,
  `author` varchar(300) NOT NULL,
  `publisher` varchar(300) NOT NULL,
  `edition` int(100) NOT NULL,
  `isbn` varchar(100) NOT NULL,
  `pages` int(100) NOT NULL,
  `date_issued` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `books`
--

INSERT INTO `books` (`book_id`, `user_id`, `genre`, `title`, `author`, `publisher`, `edition`, `isbn`, `pages`, `date_issued`) VALUES
(1, 9, 'Horror', 'Zombie Day', 'Kazi Nazrul Islam', 'Nazrul Publications', 3, 'jfklsgsdlg5qw7q87w', 800, '2024-05-15'),
(3, 9, 'Adventure', 'A Song of Ice & Fire', 'George R. R. Martin', 'Game of Thrones', 8, 'has23dadh123427', 1200, '2024-05-15'),
(4, 0, 'Adventure', 'Harry Potter & The Half Blood Prince', 'J.K Rowling', 'Rowling\'s Publications', 1, '31ghf1jk24kjb3l4l1gjh', 667, '0000-00-00'),
(5, 2, 'Adventure', 'Harry Potter & The Deadly Hallows', 'J.K Rowling', 'Rowling\'s Publications', 2, 'agsh32gqkj12bkl134', 798, '2024-07-10'),
(7, 9, 'Mystery', 'The Mysterious Affair at Styles', 'Agatha Christie', 'Agatha Publications', 2, '4zgdhdv2dfh81v31sdgj', 669, '2024-05-14'),
(10, 10, 'Modern Literature', 'In Search of Lost Time', 'Marcel Proust', 'NY Publishers', 8, '2j3nsd235habh3dfkj', 4215, '2024-05-14');

-- --------------------------------------------------------

--
-- Structure de la table `books_request`
--

CREATE TABLE `books_request` (
  `request_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `genre` varchar(300) NOT NULL,
  `title` varchar(300) NOT NULL,
  `author` varchar(300) NOT NULL,
  `edition` int(10) NOT NULL,
  `isbn` varchar(100) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `books_request`
--

INSERT INTO `books_request` (`request_id`, `user_id`, `genre`, `title`, `author`, `edition`, `isbn`, `date`) VALUES
(1, 2, 'Mystery', 'Murder on the Orient Express', 'Agatha Christie', 3, '12gf3gj1jhr3jklj1ugjkb', '2018-07-10'),
(2, 5, 'Mystery', 'The Mysterious Affair at Styles', 'Agatha Christie', 3, '4zgdhdv2dfh81v31sdgj', '2018-07-10'),
(3, 4, 'Mystery', 'The Mysterious Affair at Styles', 'Agatha Christie', 3, '4zgdhdv2dfh81v31sdgj', '2018-07-10');

-- --------------------------------------------------------

--
-- Structure de la table `issue_date`
--

CREATE TABLE `issue_date` (
  `issue_id` int(10) NOT NULL,
  `book_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `issue_date`
--

INSERT INTO `issue_date` (`issue_id`, `book_id`, `user_id`, `date`) VALUES
(1, 1, 2, '2020-07-10'),
(2, 5, 2, '2021-07-10'),
(3, 3, 2, '2018-07-10'),
(4, 4, 5, '2019-07-10'),
(5, 1, 2, '2024-07-10'),
(6, 5, 5, '2024-07-10'),
(7, 1, 5, '2024-07-10'),
(8, 4, 5, '2018-07-10'),
(9, 3, 5, '2018-07-10'),
(10, 5, 5, '2018-07-10'),
(11, 3, 5, '2018-07-10'),
(12, 3, 5, '2018-07-10'),
(13, 3, 5, '2018-07-10'),
(14, 3, 5, '2018-07-10'),
(15, 3, 4, '2018-07-10'),
(16, 1, 5, '2018-07-10'),
(17, 3, 5, '2018-07-10'),
(18, 5, 2, '2018-07-10'),
(19, 3, 4, '2018-07-11'),
(20, 7, 4, '2018-07-11'),
(21, 7, 5, '2018-07-11'),
(22, 3, 4, '2018-07-11'),
(23, 7, 9, '2024-05-14'),
(24, 10, 10, '2024-05-14'),
(25, 3, 9, '2024-05-15'),
(26, 1, 9, '2024-05-15');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` int(100) NOT NULL,
  `name` varchar(300) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `email` varchar(300) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `password` varchar(300) NOT NULL,
  `address` varchar(300) NOT NULL,
  `gender` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `name`, `phone`, `email`, `is_admin`, `password`, `address`, `gender`) VALUES
(1, 'Abrar', '01711568524', 'a.zshahriar@gmail.com', 1, '1234', 'Mirpur DOHS', 'Male'),
(5, 'Shimi', '01723645289', 'shimi@gmail.com', 0, 'abcd', 'Uttara, Sector 13', 'Female'),
(8, 'Fahim Ahmed', '01726972364', 'fahim152@gmail.com', 0, 'fahimma', 'Kallayanpur', 'Male'),
(9, 'iheb deruich', '21959183', 'deruich.iheb@gmail.com', 0, '1234', 'hawaria', 'Male'),
(10, 'yassine meddeb', '21103925', 'yassine564@gmail.com', 0, '1234', 'nabeul-houaria', 'Male');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `books_request`
--
ALTER TABLE `books_request`
  ADD PRIMARY KEY (`request_id`);

--
-- Index pour la table `issue_date`
--
ALTER TABLE `issue_date`
  ADD PRIMARY KEY (`issue_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `books_request`
--
ALTER TABLE `books_request`
  MODIFY `request_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `issue_date`
--
ALTER TABLE `issue_date`
  MODIFY `issue_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
