import { ApiProperty } from '@nestjs/swagger'

export class SignUpAdminDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          enum: ['email', 'password']
        },
        value: {
          type: 'string',
        }

      }
    },
    default: [
      {
        id: 'email',
        value: "johndoe@gmail.com"
      },
      {
        id: 'password',
        value: 'testPass123'
      }
    ]
  })
  formFields: [
    {
      id: "email",
      value: string,
    },
    {
      id: "password",
      value: string,
    }
  ]
}