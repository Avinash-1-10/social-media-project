const useDate = (date) => {
  const d = new Date(date);
  return d.toDateString().split(" ").slice(1).join(" ")
};

export default useDate;
