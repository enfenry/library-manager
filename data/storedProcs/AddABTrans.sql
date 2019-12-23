	DROP PROCEDURE IF EXISTS AddABTrans;

	DELIMITER //
	CREATE PROCEDURE AddABTrans (IN AId int(11), BookId int(11))
	BEGIN
        INSERT INTO tbl_book_authors(bookId,authorId)
        VALUES (AId,BookId);
	END; //
	DELIMITER ;