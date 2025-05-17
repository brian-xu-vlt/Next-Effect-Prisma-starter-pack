import { SendMailOptions } from 'nodemailer';
import { isDeepEqual, unique } from 'remeda';

export const arrayIfNot = <T>(list: T | T[]): T[] => {
  return list && Array.isArray(list) ? list : [list];
};

export const isEqual = <T>(a: T[], b: T[]): boolean => {
  const sortedA = unique(a).sort();
  const sortedB = unique(b).sort();
  return (
    sortedA.length === sortedB.length &&
    sortedA.every((value, index) => isDeepEqual(value, sortedB[index]))
  );
};

export const addFixedBcc = (
  mailOptions: SendMailOptions,
  fixedBccAddress: string | undefined,
) => {
  if (!mailOptions.bcc && !fixedBccAddress) {
    return mailOptions;
  } else {
    const bcc = (mailOptions.bcc && arrayIfNot(mailOptions.bcc)) || [];
    return {
      ...mailOptions,
      bcc: [...bcc, ...(fixedBccAddress ? [fixedBccAddress] : [])],
    };
  }
};
