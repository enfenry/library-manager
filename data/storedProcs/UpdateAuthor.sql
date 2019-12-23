    DROP PROCEDURE IF EXISTS UpdateAuthor;

	DELIMITER //
    CREATE PROCEDURE `UpdateAuthor`(IN authorId int(11), authorName varchar(45))
    BEGIN
        UPDATE tbl_author a
        SET a.authorName = authorName
        WHERE a.authorId = authorId;
    END; //
    DELIMITER ;