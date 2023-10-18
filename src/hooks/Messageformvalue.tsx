export interface MessageFormValue {
  extra: {
    smsTemplateId: number;
    smsContent: string;
    syncType: boolean;
  };
  isAppSecret: boolean;
  label: string;
  requestItems: IRequestItems[];
  resultItems: IResultItems[];
  timeout: string;
  output: IOutPut[];
  smsTemplate: {
    value: number;
    label: string;
    key: number;
  };
  syncType: boolean;
}