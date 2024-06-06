export interface Menu {
  code: string,
  name: string
  update_time: number,
  create_time: number,
}
export interface Permission {
  code: string,
  menu_code: string,
  menu_name: string,
  name: string
  update_time: number,
  create_time: number,
}

export interface MenuTree {
  code: string,
  name: string
  permissions: Permission[],
}


export interface UserRoleGroup {
  id: number
  name: string
  desc: string
  update_time: number
  create_time: number
}
export interface UserRole {
  id: number
  name: string
  desc: string
  update_time: number
  create_time: number
}