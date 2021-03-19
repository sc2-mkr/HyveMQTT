export default class MqttMessageModel {
  constructor(
    public topic: string = '',
    public message: string = '',
    public qos: number = 0,
    public retain: boolean = false
  ) {}
}
