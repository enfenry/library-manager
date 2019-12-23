    DROP PROCEDURE IF EXISTS AddPublisher;

	DELIMITER //
    CREATE DEFINER=`root`@`localhost` PROCEDURE `AddPublisher`(IN  PublisherName varchar(45), 
        PublisherAddress varchar(45), PublisherPhone varchar(45))
    BEGIN
        DECLARE newId int(11) DEFAULT 1;
        SET newId = (SELECT MAX(p.publisherId) + 1 FROM tbl_publisher p);
        INSERT INTO `tbl_publisher` (`publisherId`, `publisherName`, `publisherAddress`, `publisherPhone`) 
        VALUES (newId, PublisherName, PublisherAddress, PublisherPhone);
    END; //
	DELIMITER ;