
// 获取短信模板
export const getTemplateList = async () =>
  ajaxGet<any>('/api/sms/getTemplates?pageNum=1&pageSize=9999&auditStatus=2');

// 获取托管账号
export const getWechatAccountList = async () =>
  ajaxGet<any>('/gw/wechatbot/crm/config/service/detail', { pageNum: 1, pageSize: 999, type: 1 });
