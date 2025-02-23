export interface Order {
  id: number,
  user_id: number,
  associated_user_id?: number,

  pic?: string,
  title: string,
  order_no: string,

  amount: number,
  status: number,

  update_time: number,
  create_time: number,

}

export interface OrderItem {
  id: number,
  user_id: number,
  order_id: number,
  house_id: number,
  part_id: number,
  assembly_unit_id: number,
  assembly_unit_style_id: number,
  pic: string,
  house_name: string,
  part_name: string,
  unit_name: string,
  style_name: string,
  update_time: number,
  create_time: number,
}
