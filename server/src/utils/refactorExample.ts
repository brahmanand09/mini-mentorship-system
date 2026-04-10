export const processData = (user: any, data: any[]) => {
  if (user.role !== "admin") return;

  return data
    .filter(item => item.status === "active")
    .map(item => {
      return item;
    });
};