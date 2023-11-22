const data = "../data/Data.json";

export const getData = async () => {
  try {
    const response = await axios({
      url: data,
      method: "GET",
    });
    console.log("response: ", response.data);
    // let newItem = new classItem();
    // let { tabName, showName, type } = response.data.navPills;
    // let ItemClass = new ChoseItem();
    // ItemClass = { ...ItemClass, tabName, showName, type };
    // console.log("itemmmmmmmmmmmm", ItemClass);
    // let {}
    // newItem = { ...newItem, response.data.navPills };

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataByType = async (type) => {
  try {
    const response = await axios.get(data);
    const filteredData = response.data.tabPanes.filter(
      (item) => item.type === type
    );
    return filteredData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

