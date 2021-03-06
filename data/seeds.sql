INSERT INTO `library`.`tbl_author` (`authorId`, `authorName`) VALUES ('1', 'Author1');
INSERT INTO `library`.`tbl_author` (`authorId`, `authorName`) VALUES ('2', 'Author2');
INSERT INTO `library`.`tbl_author` (`authorId`, `authorName`) VALUES ('3', 'Author3');
INSERT INTO `library`.`tbl_author` (`authorId`, `authorName`) VALUES ('4', 'Author4');
INSERT INTO `library`.`tbl_author` (`authorId`, `authorName`) VALUES ('5', 'Author5');

INSERT INTO `library`.`tbl_publisher` (`publisherId`, `publisherName`, `publisherAddress`, `publisherPhone`) VALUES ('1', 'PName1', 'PAddress1', 'PPhone1');
INSERT INTO `library`.`tbl_publisher` (`publisherId`, `publisherName`, `publisherAddress`, `publisherPhone`) VALUES ('2', 'PName2', 'PAddress2', 'PPhone2');
INSERT INTO `library`.`tbl_publisher` (`publisherId`, `publisherName`, `publisherAddress`, `publisherPhone`) VALUES ('3', 'PName3', 'PAddress3', 'PPhone3');
INSERT INTO `library`.`tbl_publisher` (`publisherId`, `publisherName`, `publisherAddress`, `publisherPhone`) VALUES ('4', 'PName4', 'PAddress4', 'PPhone4');
INSERT INTO `library`.`tbl_publisher` (`publisherId`, `publisherName`, `publisherAddress`, `publisherPhone`) VALUES ('5', 'PName5', 'PAddress5', 'PPhone5');

INSERT INTO `library`.`tbl_book` (`bookId`, `title`, `pubId`) VALUES ('1', 'Title1', '1');
INSERT INTO `library`.`tbl_book` (`bookId`, `title`, `pubId`) VALUES ('2', 'Title2', '2');
INSERT INTO `library`.`tbl_book` (`bookId`, `title`, `pubId`) VALUES ('3', 'Title3', '3');
INSERT INTO `library`.`tbl_book` (`bookId`, `title`, `pubId`) VALUES ('4', 'Title4', '4');
INSERT INTO `library`.`tbl_book` (`bookId`, `title`, `pubId`) VALUES ('5', 'Title5', '5');
INSERT INTO `library`.`tbl_book` (`bookId`, `title`, `pubId`) VALUES ('6', 'Title6', '4');
INSERT INTO `library`.`tbl_book` (`bookId`, `title`, `pubId`) VALUES ('7', 'Title7', '5');
INSERT INTO `library`.`tbl_book` (`bookId`, `title`, `pubId`) VALUES ('8', 'Title8', '4');
INSERT INTO `library`.`tbl_book` (`bookId`, `title`, `pubId`) VALUES ('9', 'Title9', '2');
INSERT INTO `library`.`tbl_book_authors` (`bookId`, `authorId`) VALUES ('1', '1');
INSERT INTO `library`.`tbl_book_authors` (`bookId`, `authorId`) VALUES ('2', '2');
INSERT INTO `library`.`tbl_book_authors` (`bookId`, `authorId`) VALUES ('3', '3');
INSERT INTO `library`.`tbl_book_authors` (`bookId`, `authorId`) VALUES ('4', '4');
INSERT INTO `library`.`tbl_book_authors` (`bookId`, `authorId`) VALUES ('5', '5');
INSERT INTO `library`.`tbl_book_authors` (`bookId`, `authorId`) VALUES ('1', '3');
INSERT INTO `library`.`tbl_book_authors` (`bookId`, `authorId`) VALUES ('6', '5');
INSERT INTO `library`.`tbl_book_authors` (`bookId`, `authorId`) VALUES ('5', '3');
INSERT INTO `library`.`tbl_book_authors` (`bookId`, `authorId`) VALUES ('7', '3');
INSERT INTO `library`.`tbl_book_authors` (`bookId`, `authorId`) VALUES ('8', '2');
INSERT INTO `library`.`tbl_book_authors` (`bookId`, `authorId`) VALUES ('8', '1');
INSERT INTO `library`.`tbl_book_authors` (`bookId`, `authorId`) VALUES ('9', '5');

INSERT INTO `library`.`tbl_library_branch` (`branchId`, `branchName`, `branchAddress`) VALUES ('1', 'bName1', 'BAddress1');
INSERT INTO `library`.`tbl_library_branch` (`branchId`, `branchName`, `branchAddress`) VALUES ('2', 'bName2', 'BAddress2');
INSERT INTO `library`.`tbl_library_branch` (`branchId`, `branchName`, `branchAddress`) VALUES ('3', 'bName3', 'BAddress3');
INSERT INTO `library`.`tbl_library_branch` (`branchId`, `branchName`, `branchAddress`) VALUES ('4', 'bName4', 'BAddress4');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('1', '1', '5');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('2', '1', '4');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('3', '1', '0');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('4', '1', '4');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('5', '1', '3');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('6', '1', '0');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('7', '1', '0');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('8', '1', '19');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('9', '1', '5');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('1', '2', '5');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('2', '2', '10');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('3', '2', '0');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('4', '2', '0');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('5', '2', '9');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('6', '2', '7');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('7', '2', '4');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('8', '2', '4');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('9', '2', '3');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('1', '3', '0');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('2', '3', '0');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('3', '3', '0');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('4', '3', '7');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('5', '3', '3');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('6', '3', '2');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('7', '3', '1');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('8', '3', '9');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('9', '3', '0');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('1', '4', '9');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('2', '4', '4');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('3', '4', '100');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('4', '4', '0');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('5', '4', '2');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('6', '4', '0');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('7', '4', '5');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('8', '4', '1');
INSERT INTO `library`.`tbl_book_copies` (`bookId`, `branchId`, `noOfCopies`) VALUES ('9', '4', '3');

INSERT INTO `library`.`tbl_genre`(`genre_id`,`genre_name`) VALUES('1', 'dinosaur');

INSERT INTO `library`.`tbl_genre`(`genre_id`,`genre_name`) VALUES('2', 'politics');

INSERT INTO `library`.`tbl_genre`(`genre_id`,`genre_name`) VALUES('3', 'erotica');

INSERT INTO `library`.`tbl_book_genres` (`genre_id`, `bookId`) VALUES ('1', '1');
INSERT INTO `library`.`tbl_book_genres` (`genre_id`, `bookId`) VALUES ('1', '2');
INSERT INTO `library`.`tbl_book_genres` (`genre_id`, `bookId`) VALUES ('1', '3');
INSERT INTO `library`.`tbl_book_genres` (`genre_id`, `bookId`) VALUES ('1', '4');
INSERT INTO `library`.`tbl_book_genres` (`genre_id`, `bookId`) VALUES ('2', '1');
INSERT INTO `library`.`tbl_book_genres` (`genre_id`, `bookId`) VALUES ('2', '4');
INSERT INTO `library`.`tbl_book_genres` (`genre_id`, `bookId`) VALUES ('2', '5');
INSERT INTO `library`.`tbl_book_genres` (`genre_id`, `bookId`) VALUES ('2', '6');
INSERT INTO `library`.`tbl_book_genres` (`genre_id`, `bookId`) VALUES ('2', '7');
INSERT INTO `library`.`tbl_book_genres` (`genre_id`, `bookId`) VALUES ('3', '1');
INSERT INTO `library`.`tbl_book_genres` (`genre_id`, `bookId`) VALUES ('3', '8');
INSERT INTO `library`.`tbl_book_genres` (`genre_id`, `bookId`) VALUES ('3', '9');

INSERT INTO `library`.`tbl_borrower` (`cardNo`, `name`, `address`, `phone`) VALUES ('1', 'name1', 'address1', 'phone1');
INSERT INTO `library`.`tbl_borrower` (`cardNo`, `name`, `address`, `phone`) VALUES ('2', 'name2', 'address2', 'phone2');
INSERT INTO `library`.`tbl_borrower` (`cardNo`, `name`, `address`, `phone`) VALUES ('3', 'name3', 'address3', 'phone3');
INSERT INTO `library`.`tbl_borrower` (`cardNo`, `name`, `address`, `phone`) VALUES ('4', 'name4', 'address4', 'phone4');
INSERT INTO `library`.`tbl_borrower` (`cardNo`, `name`, `address`, `phone`) VALUES ('5', 'name5', 'address5', 'phone5');

INSERT INTO `library`.`tbl_book_loans` (`bookId`, `branchId`, `cardNo`,`dateOut`,`dueDate`) VALUES ('1', '1', '1',NOW(), NOW() + INTERVAL 7 DAY);
INSERT INTO `library`.`tbl_book_loans` (`bookId`, `branchId`, `cardNo`,`dateOut`,`dueDate`) VALUES ('1', '2', '1',NOW(), NOW() + INTERVAL 7 DAY);
INSERT INTO `library`.`tbl_book_loans` (`bookId`, `branchId`, `cardNo`,`dateOut`,`dueDate`) VALUES ('1', '1', '2',NOW(), NOW() + INTERVAL 7 DAY);
INSERT INTO `library`.`tbl_book_loans` (`bookId`, `branchId`, `cardNo`,`dateOut`,`dueDate`) VALUES ('2', '1', '1',NOW(), NOW() + INTERVAL 7 DAY);
INSERT INTO `library`.`tbl_book_loans` (`bookId`, `branchId`, `cardNo`,`dateOut`,`dueDate`) VALUES ('2', '2', '2',NOW(), NOW() + INTERVAL 7 DAY);