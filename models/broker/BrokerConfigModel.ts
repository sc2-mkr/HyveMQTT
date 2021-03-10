import { v4 as uuidV4 } from 'uuid'

export default class BrokerConfigModel {
  private _id: string = uuidV4()

  constructor(
    public name: string,
    public host: string,
    public port: number,
    public endpoint: string = '',
    public user: string = '',
    public password: string = '',
    public useTLS: boolean = false
  ) {}

  get id() {
    return this._id
  }
}
