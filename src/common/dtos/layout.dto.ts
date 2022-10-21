export class LayoutDto {
  title: string
  description: string
  data?: any
}

export class CustomerLayoutDto extends LayoutDto {
  footerAddContacts?: boolean
}

export class AdminLayoutDto extends LayoutDto {
  adminName: string
}

export class AdminSettingsLayoutDto extends AdminLayoutDto {
  adminUuid: string
}