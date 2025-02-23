export interface House {
  id: number,
  name: string,
  pic: string,
  desc: string,
  center_model_url: string,
  is_publish: boolean,
  update_time: number,
  create_time: number,
}

export interface HousePart {
  id: number,
  house_id: number,
  name: string,
  update_time: number,
  create_time: number,
}

export interface HouseAssemblyUnit {
  id: number,
  house_id: number,
  part_id: number,
  name: string,
  desc: string,
  model_type: number,
  default_style_id: number,
  update_time: number,
  create_time: number,
}

export interface HouseAssemblyUnitStyle {
  id: number,
  house_id: number,
  part_id: number,
  name: string,
  pic: string,
  model_url: string,
  desc: string,
  is_publish: boolean,
  update_time: number,
  create_time: number,
}