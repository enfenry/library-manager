    DROP PROCEDURE IF EXISTS AdminRetrieveBooks;
    
    DELIMITER //
	CREATE PROCEDURE AdminRetrieveBooks ()
	BEGIN
        SELECT bk.bookId,bk.title,bk.pubId, a.authorName
        FROM tbl_book bk
        INNER JOIN tbl_book_authors ba ON ba.bookId= bk.bookId
        INNER JOIN tbl_author a ON ba.authorId= a.authorId
        ORDER BY bk.title;
	END; //
	DELIMITER ;