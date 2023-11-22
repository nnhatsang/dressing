// import { ChosenItem } from "../models/ChoseItem.js";
// import { ListChosenItem } from "../models/ListChosen.js";
import { fetchDataByType, getData } from "../utils/callData.js";

const data = await getData();
const { navPills, tabPanes } = data;
// let activeTabIndex = 0;
// const categories_list = [
//   "topclothes",
//   "botclothes",
//   "shoes",
//   "handbags",
//   "necklaces",
//   "hairstyle",
//   "background",
// ];

// fetchDataByType("topclothes")
//   .then((filteredData) => {
//     // console.log("Filtered Data:", filteredData);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// const renderTab = () => {
//   const tabList = document.querySelector("#myTab");

//   navPills.forEach((item, index) => {
//     const liElement = document.createElement("li");
//     liElement.classList.add("nav-item");

//     const buttonElement = document.createElement("button");
//     buttonElement.classList.add("nav-link");
//     buttonElement.id = `${item.type}-tab`;
//     buttonElement.setAttribute("data-bs-toggle", "tab");
//     buttonElement.setAttribute("data-bs-target", `#${item.type}`);
//     buttonElement.setAttribute("type", "button");
//     buttonElement.setAttribute("role", "tab");
//     buttonElement.setAttribute("aria-controls", item.type);
//     buttonElement.setAttribute(
//       "aria-selected",
//       index === activeTabIndex ? "true" : "false"
//     );
//     buttonElement.textContent = item.showName;

//     buttonElement.addEventListener("click", () => {
//       tabList
//         .querySelector(".nav-link[aria-selected='true']")
//         .setAttribute("aria-selected", "false");
//       activeTabIndex = index;
//       buttonElement.setAttribute("aria-selected", "true");
//       renderTabContent();
//     });

//     liElement.appendChild(buttonElement);
//     tabList.appendChild(liElement);
//   });
// };
// // Initial rendering
// // renderTab();
// const renderTabContent = () => {
//   const tabContentElement = document.getElementById("default-tab-content");
//   tabContentElement.innerHTML = "";
//   navPills.forEach((item, index) => {
//     const divElement = document.createElement("div");
//     divElement.classList.add("tab-pane", "fade");
//     divElement.id = item.type;
//     divElement.setAttribute("role", "tabpanel");
//     divElement.setAttribute("aria-labelledby", `${item.type}-tab`);
//     divElement.innerHTML = `
//       <div class="row gy-5">
//         <h1>${item.showName}</h1>
//       </div>
//     `;

//     if (index === activeTabIndex) {
//       divElement.classList.add("show", "active");
//     }

//     tabContentElement.appendChild(divElement);
//   });
// };

// renderTab();
// renderTabContent();

// const createTabPanes = (tabPane) => {
//   const panesElement = document.createElement("div");

//   panesElement.innerHTML = `
//         <img
//             src="${tabPane.imgSrc_jpg}"
//             alt="${tabPane.name}"
//             onClick="handleImageClick('${tabPane.id}','${tabPane.type}')">
//     `;
//   return panesElement;
// };
// const fetchDataAndRender = async () => {
//   const categoryData = {};

//   try {
//     // Fetch data for each category and store it in the categoryData object
//     await Promise.all(
//       categories_list.map(async (category) => {
//         categoryData[category] = await fetchDataByType(category);
//       })
//     );

//     // Render images for each category in the corresponding tab
//     renderTabContentWithFetchedData();
//     console.log(renderTabContentWithFetchedData);
//   } catch (error) {
//     // console.error("An error occurred while fetching data:", error);
//     // Handle error as needed
//   }
// };
// const renderTabContentWithFetchedData = () => {
// //  const tabContentElement = document.getElementById("default-tab-content");

// //  // Clear existing content in the tab
// //  tabContentElement.innerHTML = "";

//  // Iterate over items in the navPills array and render them
//  navPills.forEach((item) => {
//    const divElement = document.createElement("div");
//    divElement.classList.add("tab-pane", "fade");
//    divElement.id = item.type;
//    divElement.setAttribute("role", "tabpanel");
//    divElement.setAttribute("aria-labelledby", `${item.type}-tab`);

//    const currentCategoryData = categoryData[item.type];

//    if (Array.isArray(currentCategoryData)) {
//      // Render content based on fetched data
//      currentCategoryData.forEach((dataItem) => {
//        const imgElement = createTabPanes(dataItem);
//        divElement.appendChild(imgElement);
//      });
//    } else {
//      // If there's no fetched data, render default content
//      divElement.innerHTML = `
//         <div class="row gy-5">
//           <h1>No data available for ${item.type}</h1>
//         </div>
//       `;
//    }

//    tabContentElement.appendChild(divElement);
//  });
// };

// // Call the function to initiate fetching and rendering
// fetchDataAndRender();

const renderNavItem = () => {
  const contentNavItem = navPills
    .map(
      (navPillsItem) => `
        <li class="nav-item">
            <a class="nav-link" id="${navPillsItem.tabName}" data-toggle="pill" href="#${navPillsItem.type}">
                ${navPillsItem.showName}
            </a>
        </li>`
    )
    .join("");
  document.getElementById("myTab").innerHTML = contentNavItem;

  navPills.forEach((navPillsItem) => {
    document
      .getElementById(navPillsItem.tabName)
      .addEventListener("click", () => showTabPanes(navPillsItem.type));
  });
};

const createTabPanes = (tabPane) => {
  const panesElement = document.createElement("div");
  panesElement.innerHTML = `<img class="p-2" src="${tabPane.imgSrc_jpg}" alt="${tabPane.name}" onClick="handleImageClick('${tabPane.id}','${tabPane.type}') ">`;
  return panesElement;
};

const showTabPanes = (tabType) => {
  const tabContent = document.getElementById("default-tab-content");
  tabContent.innerHTML = "";

  const selectTabPanes = tabPanes.filter(
    (tabPanesItem) => tabPanesItem.type === tabType
  );

  const panesRow = document.createElement("div");
  panesRow.classList.add("containerTabPanes");

  selectTabPanes.forEach((tabPane) => {
    const panesElement = createTabPanes(tabPane);
    panesRow.appendChild(panesElement);
  });

  tabContent.appendChild(panesRow);
};

window.handleImageClick = (imageId, tabType) => {
  const selectorMap = {
    topclothes: ".bikinitop",
    botclothes: ".bikinibottom",
    shoes: ".feet",
    handbags: ".handbag",
    necklaces: ".necklace",
    hairstyle: ".hairstyles",
    background: ".backgrounds",
  };

  const selector = selectorMap[tabType];
  const imageSrc = tabPanes.find((item) => item.id === imageId).imgSrc_png;

  document.querySelector(
    selector
  ).innerHTML = `<img class="${tabType}" src="${imageSrc}">`;
};

renderNavItem();
