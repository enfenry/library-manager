    DROP PROCEDURE IF EXISTS UpdatePublisher;

	DELIMITER //
    CREATE PROCEDURE `UpdatePublisher`(IN  PublisherId int(11), PublisherName varchar(45), 
        PublisherAddress varchar(45), PublisherPhone varchar(45))
    BEGIN
        UPDATE tbl_publisher p
        SET p.publisherName = PublisherName, p.publisherAddress = PublisherAddress, 
        p.publisherPhone = PublisherPhone
        WHERE p.publisherId = PublisherId;
    END; //
	DELIMITER ;