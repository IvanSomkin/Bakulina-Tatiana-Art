import { Controller, Get, Render } from '@nestjs/common';
import { AdminService } from './administrator.service';
import { join } from 'path';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('administrator')
  @Render(join(__dirname, '..', '..', 'views/administrator'))
  getAdminPage() {
    return {
      authorized: false
    }
  }
}