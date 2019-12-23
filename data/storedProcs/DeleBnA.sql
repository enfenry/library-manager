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
	IF NOT EXISTS(SELECT 1 FROM tbl_book_authors al WHERE al.authorId = theAId)
	THEN
	DELETE FROM tbl_author atr WHERE atr.authorId = theAId;
	END if;

	END; //
	DELIMITER ;