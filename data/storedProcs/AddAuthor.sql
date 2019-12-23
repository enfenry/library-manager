	DROP PROCEDURE IF EXISTS AddAuthor;

	DELIMITER //
	CREATE PROCEDURE AddAuthor (IN Aname varchar(45), BookId int(11))
	BEGIN
	DECLARE newId int(11) DEFAULT 1;
	SET newId = (SELECT MAX(a.authorId) + 1 FROM tbl_author a);
	INSERT INTO tbl_author (authorId, authorName)
	VALUES (newId, Aname);

	INSERT INTO tbl_book_authors(bookId,authorId)
	VALUES (BookId,newId);
	END; //
	DELIMITER ;