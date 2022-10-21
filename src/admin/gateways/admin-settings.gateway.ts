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
export class AdminSettingsGateway implements
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect {
  constructor (private adminService: AdminService) { }

  @WebSocketServer() server: Server

  @SubscribeMessage('renameAdmin')
  async handleRenameAdmin(client: Socket, renameAdminDto: RenameAdminDto): Promise<void> {
    const oldNewNames = await this.adminService.renameAdmin(renameAdminDto)
    this.server.emit('renameSuccess', oldNewNames)
  }

  @SubscribeMessage('signUpAdmin')
  async handleSignUpAdmin(client: Socket, signUpAdminNameDto: SignUpAdminNameDto): Promise<void> {
    const signerSignedNames = await this.adminService.signUpAdmin(signUpAdminNameDto)
    if (signerSignedNames != undefined) {
      this.server.emit('signUpSuccess', signerSignedNames)
    } else {
      this.server.emit('signUpError')
    }
  }

  @SubscribeMessage('deleteAdmin')
  async handleDeleteAdmin(client: Socket, deleteAdminDto: DeleteAdminDto): Promise<void> {
    const deleterDeletedNames = await this.adminService.deleteAdmin(deleteAdminDto)
    if (deleterDeletedNames != undefined) {
      this.server.emit('deleteSuccess', deleterDeletedNames)
    } else {
      this.server.emit('deleteError', deleterDeletedNames)
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