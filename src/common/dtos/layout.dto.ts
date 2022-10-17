export class LayoutDto {
  layout?: string
  title: string
  description: string
  data?: any
}

export class CustomerLayoutDto extends LayoutDto {
  footer_add_contacts?: boolean
}

export class AdminLayoutDto extends LayoutDto {
  admin_name?: string
  admin_uuid?: string
}