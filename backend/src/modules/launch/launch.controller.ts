import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { LaunchService } from './launch.service';

@Controller('launches')
export class LaunchController {
  constructor(private readonly launchService: LaunchService) {}

  @Post()
  async createLaunch(
    @Body() body: { name: string; startTime: Date; status: string },
  ) {
    return this.launchService.createLaunch(body);
  }

  @Get()
  async getAllLaunches() {
    return this.launchService.getAllLaunches();
  }

  @Patch(':id')
  async updateLaunch(
    @Param('id') id: string,
    @Body() body: { status?: string; abortReason?: string },
  ) {
    return this.launchService.updateLaunch(Number(id), body);
  }
}
