export interface Permission {
  code: string
  name: string
}
export interface PermissionItem {
  code: string
  name: string
  permission_code: string
  permission_name: string
}

export interface PermissionTree {
  code: string
  name: string
  items: Permission[]
}


export interface UserRoleGroup {
  code: string
  name: string
  desc: string
  is_reserved: boolean
  update_time: number
  create_time: number
}
export interface UserRole {
  code: string
  name: string
  desc: string
}

export interface User {
  id: number

  role_group_code?: string
  account?: string
  phone?: string
  email?: string
  wx_open_id?: string
  nickname?: string
  gender?: string
  avator?: string

  is_reserved: boolean


  status: number

  update_time: number
  create_time: number

}