import {
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { SignUpAdminNameDto } from '../dtos/sign-up-admin.dto'
import { AdminService } from '../admin.service'
import { DeleteAdminDto } from '../dtos/delete-admin.dto'
import { RenameAdminDto } from '../dtos/rename-admin.dto'

@WebSocketGateway()
export class AdminGateway implements
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect {
  constructor(private adminService: AdminService) { }

  @WebSocketServer() server: Server

  @SubscribeMessage('renameAdmin')
  async handleRenameAdmin(client: Socket, renameAdminDto: RenameAdminDto): Promise<void> {
    const old_new_names = await this.adminService.renameAdmin(renameAdminDto)
    this.server.emit('renameSuccess', old_new_names)
  }

  @SubscribeMessage('signUpAdmin')
  async handleSignUpAdmin(client: Socket, signUpAdminNameDto: SignUpAdminNameDto): Promise<void> {
    const signer_signed_names = await this.adminService.signUpAdmin(signUpAdminNameDto)
    if (signer_signed_names != undefined) {
      this.server.emit('signUpSuccess', signer_signed_names)
    } else {
      this.server.emit('signUpError')
    }
  }

  @SubscribeMessage('deleteAdmin')
  async handleDeleteAdmin(client: Socket, deleteAdminDto: DeleteAdminDto): Promise<void> {
    const deleter_deleted_names = await this.adminService.deleteAdmin(deleteAdminDto)
    if (deleter_deleted_names != undefined) {
      this.server.emit('deleteSuccess', deleter_deleted_names)
    } else {
      this.server.emit('deleteError', deleter_deleted_names)
    }
  }

  afterInit(server: Server) {
    console.log(server)
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`)
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`)
  }
}