	DROP PROCEDURE IF EXISTS DeleteBnA;

	DELIMITER //
	CREATE PROCEDURE DeleteBnA (IN ToDeleteBName varchar(45), ToDeleteAName varchar(45))
	BEGIN
	Declare theBId int(11);
	Declare theAId int(11);
	SET theBId = (Select b.bookId from tbl_book b WHERE b.title = ToDeleteBName);
	SET theAId = (Select a.authorId from tbl_author a WHERE a.authorName = ToDeleteAName);

	DELETE from tbl_book_authors ba WHERE ba.bookId = theBId;
	DELETE from tbl_book bk WHERE bk.title = ToDeleteBName AND bk.bookId = theBId;
	
	SET SQL_SAFE_UPDATES=0;
	DELETE from tbl_author atu WHERE NOT EXISTS (SELECT 1 FROM tbl_book_authors bas WHERE atu.authorId = bas.authorID );
	SET SQL_SAFE_UPDATES=1;
	END; //
	DELIMITER ;