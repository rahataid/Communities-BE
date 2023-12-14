import { Injectable } from '@nestjs/common';
import { PrismaService } from '@rahat/prisma';
import { Prisma } from '@prisma/client';
import { paginate } from '../utils/paginate';
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
    const existingCommunityManager =
      await this.prisma.communityManager.findUnique({
        where: {
          id: parseInt(updateManagerDto.id),
        },
      });

    if (!existingCommunityManager) {
      return;
    }
    const check = existingCommunityManager.communities.find(
      (communities) => communities === updateManagerDto.communityName,
    );

    const updatedCommunities = [
      ...existingCommunityManager.communities,
      updateManagerDto.communityName,
    ];

    const filteredCommunities = check
      ? existingCommunityManager.communities
      : updatedCommunities;
    const updatedCommunityManager = await this.prisma.communityManager.update({
      where: {
        id: parseInt(updateManagerDto.id),
      },
      data: {
        communities: filteredCommunities,
      },
    });

    return updatedCommunityManager;
  }

  remove(id: number) {
    return `This action removes a #${id} manager`;
  }
}
