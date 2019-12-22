	DROP PROCEDURE IF EXISTS BorrowerRetrieveBooks;

	DELIMITER //
    CREATE PROCEDURE `BorrowerRetrieveBooks`(IN Id int(11))
    Begin
        Select ROW_NUMBER() OVER (order by bk.title) num, bk.bookId, bk.title, a.authorName
        From tbl_book_copies bc
        INNER JOIN tbl_book bk ON bk.bookId= bc.bookId
        INNER JOIN tbl_book_authors ba on ba.bookId= bc.bookId
        INNER JOIN tbl_author a on ba.authorId= a.authorId
        where bc.branchId= Id AND bc.noOfCopies>0
        ORDER BY bk.title;
    END; //
	DELIMITER ;