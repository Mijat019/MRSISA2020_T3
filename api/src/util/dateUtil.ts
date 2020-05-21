import moment from "moment";

export const getStartAndEndOfDay = (date: any) => {
  const now = moment(date);
  const startOfDay = now.startOf("day").unix();
  const endOfDay = now.endOf("day").unix();
  return { startOfDay, endOfDay };
};
