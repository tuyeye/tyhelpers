/**
 * 字符串配置转 react 对象（核心功能点）
 * @param propsStr 字符串配置
 * @param objectEnum js 对象枚举，可选，不填则无法解析方法型的配置
 * @param agreementChar 自定义约定字符，默认 from_object_enum，取值则是将字符后的字符串作为key从objectEnum中取对象
 * @returns object
 */
const stringToProps = (
  propsStr: string,
  objectEnum?: { [name: string]: any },
  agreementChar?: string,
) => {
  try {
    const _props = JSON.parse(propsStr);

    const props: any = {};
    const theAgreementChar = agreementChar ?? 'from_object_enum';

    //eslint-disable-next-line
    for (let i in _props) {
      const theValue = _props[i];
      const theKey = i;
      //不为空则
      if (theValue) {
        //约定 fromObjectEnum 存在，则从 objectEnum 枚举中取，否则从字符串中取
        if (
          typeof theValue === 'string' &&
          theValue.indexOf(theAgreementChar) !== -1 &&
          objectEnum
        ) {
          props[theKey] = objectEnum[theValue.split(theAgreementChar)[1]];
        } else {
          try {
            //eslint-disable-next-line
            props[theKey] = eval('(' + theValue + ')');
          } catch {
            props[theKey] = theValue;
          }
        }
      }
    }

    return props;
  } catch (e) {
    return { error: e };
  }
};

export default { stringToProps };
