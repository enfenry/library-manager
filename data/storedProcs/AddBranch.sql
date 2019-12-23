	DROP PROCEDURE IF EXISTS AddBranch;

	DELIMITER //
    CREATE PROCEDURE `AddBranch`(IN  BranchName varchar(45), BranchAddress varchar(45))
    BEGIN
        DECLARE newId int(11) DEFAULT 1;
        SET newId = (SELECT MAX(lb.branchId) + 1 FROM tbl_library_branch lb);
        INSERT INTO `tbl_library_branch` (`branchId`, `branchName`, `branchAddress`) VALUES (newId, BranchName, BranchAddress);
    END; //
	DELIMITER ;