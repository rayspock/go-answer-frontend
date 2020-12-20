export class Helper {
  static typeof(object: any): string {
    var stringConstructor = "test".constructor;
    var arrayConstructor = [].constructor;
    var objectConstructor = ({}).constructor;
    if (object === null) {
      return "null";
    }
    if (object === undefined) {
      return "undefined";
    }
    if (object.constructor === stringConstructor) {
      return "string";
    }
    if (object.constructor === arrayConstructor) {
      return "array";
    }
    if (object.constructor === objectConstructor) {
      return "object";
    }
    return "unknown";
  }
}