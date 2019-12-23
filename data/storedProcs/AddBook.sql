	DROP PROCEDURE IF EXISTS AddBook;

	DELIMITER //
	CREATE PROCEDURE AddBook (IN title varchar(45), pubId int(11))
	BEGIN
	DECLARE newId int(11) DEFAULT 1;
	SET newId = (SELECT MAX(b.bookId) + 1 FROM tbl_book b);
	INSERT INTO tbl_book (bookId, title, pubId)
	VALUES (newId, title, pubId);
	END; //
	DELIMITER ;