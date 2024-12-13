import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LaunchService {
  constructor(private prisma: PrismaService) {}

  async createLaunch(data: { name: string; startTime: Date; status: string }) {
    return this.prisma.launch.create({
      data,
    });
  }

  async getAllLaunches() {
    return this.prisma.launch.findMany();
  }

  async updateLaunch(
    id: number,
    data: { status?: string; abortReason?: string },
  ) {
    return this.prisma.launch.update({
      where: { id },
      data,
    });
  }
}
