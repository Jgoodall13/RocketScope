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

  @Get('aborted') // This should only fetch aborted launches
  async getAbortedLaunches() {
    return this.launchService.getAbortedLaunches();
  }

  @Get(':id')
  async getLaunchById(@Param('id') id: string) {
    return this.launchService.getLaunchById(Number(id));
  }

  @Patch(':id/start')
  async startLaunch(@Param('id') id: string) {
    return this.launchService.updateLaunchStatus(Number(id), 'In Progress');
  }

  @Patch(':id/abort')
  async abortLaunch(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.launchService.updateLaunchStatus(
      Number(id),
      'Aborted',
      body.reason,
    );
  }
}
