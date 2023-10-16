import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Injectable()
export class ManagersService {
  constructor(private readonly prisma: PrismaService) {}

  create(manager: CreateManagerDto) {
    return this.prisma.communityManager.create({
      data: {
        name: manager.name,
        email: manager.email,
        phone: manager.phone.toString(),
        walletAddress: manager.walletAddress,
      },
    });
  }

  findAll(query: any) {
    const where: Prisma.CommunityManagerWhereInput = {};

    const select: Prisma.CommunityManagerSelect = {
      communities: true,
      email: true,
      id: true,
      name: true,
      phone: true,
      walletAddress: true,
    };

    const orderBy: Prisma.CommunityManagerOrderByWithRelationInput = {
      name: 'asc',
    };

    return paginate(
      this.prisma.communityManager,
      { where, select, orderBy },
      { page: query.page, perPage: query.perPage },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} manager`;
  }

  async update(updateManagerDto: UpdateManagerDto) {
    console.log(updateManagerDto);

    // return `This action updates a #${id} manager`;

    // const updateComunityManager = await this.prisma.communityManager.update({
    //   where: {
    //     id: parseInt(updateManagerDto.id),
    //   },
    //   data: {
    //     communities: updateManagerDto.communityName,
    //   },
    // });
    // console.log(updateComunityManager);
    const existingCommunityManager =
      await this.prisma.communityManager.findUnique({
        where: {
          id: parseInt(updateManagerDto.id),
        },
      });

    if (!existingCommunityManager) {
      // Handle the case where the record with the provided ID is not found.
      // You can return an error or take appropriate action.
      return;
    }

    // Retrieve the existing communities and update them with new values
    const updatedCommunities = [
      ...existingCommunityManager.communities,
      updateManagerDto.communityName,
    ];

    // Update the record with the new communities
    const updatedCommunityManager = await this.prisma.communityManager.update({
      where: {
        id: parseInt(updateManagerDto.id),
      },
      data: {
        communities: updatedCommunities,
      },
    });

    // updatedCommunityManager now contains the updated record with both old and new values

    return updatedCommunityManager;
  }

  remove(id: number) {
    return `This action removes a #${id} manager`;
  }
}
