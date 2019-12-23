	DROP PROCEDURE IF EXISTS AddABTrans;

	DELIMITER //
	CREATE PROCEDURE AddABTrans (IN BookId int(11), AId int(11))
	BEGIN
	INSERT INTO tbl_book_authors(bookId,authorId)
	VALUES (BookId,AId);
	END; //
	DELIMITER ;