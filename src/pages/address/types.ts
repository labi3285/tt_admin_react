
export interface Province {
  code: string
  name: string
  is_open: boolean
  update_time: number
  create_time: number
}


export interface City {
  code: string
  province_code: string
  name: string
  is_open: boolean
  update_time: number
  create_time: number
}

export interface Area {
  code: string
  province_code: string
  city_code: string
  name: string
  is_open: boolean
  update_time: number
  create_time: number
}