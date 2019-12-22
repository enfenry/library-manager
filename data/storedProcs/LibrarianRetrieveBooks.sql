	DROP PROCEDURE IF EXISTS LibrarianRetrieveBooks;

	DELIMITER //
    CREATE PROCEDURE `LibrarianRetrieveBooks`(IN Id int(11))
    BEGIN
        SELECT bk.bookId,bk.title,a.authorName, bc.noOfCopies
        FROM tbl_book_copies bc
        INNER JOIN tbl_book bk ON bk.bookId= bc.bookId
        INNER JOIN tbl_book_authors ba ON ba.bookId= bc.bookId
        INNER JOIN tbl_author a ON ba.authorId= a.authorId
        WHERE bc.branchId= Id
        ORDER BY bk.title;
    END; //
	DELIMITER ;