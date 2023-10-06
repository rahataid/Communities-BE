-- DropForeignKey
ALTER TABLE "tbl_communityDemographics" DROP CONSTRAINT "tbl_communityDemographics_communityId_fkey";

-- AddForeignKey
ALTER TABLE "tbl_communityDemographics" ADD CONSTRAINT "tbl_communityDemographics_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "tbl_communities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
